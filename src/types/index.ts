export interface OrbitalObject {
  id: string;
  name: string;
  size: number; // cm
  altitude: number; // km
  velocity: number; // km/h
  type: 'debris' | 'satellite' | 'fragment' | 'rocket_body';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  country: string;
  launchYear: number;
  isFavorite?: boolean;
}

export interface NasaNeoObject {
  id: string;
  name: string;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    relative_velocity: {
      kilometers_per_hour: string;
    };
    miss_distance: {
      kilometers: string;
    };
  }>;
  absolute_magnitude_h: number;
}

export interface DashboardStats {
  totalTracked: number;
  criticalRisk: number;
  removedThisYear: number;
  activeMissions: number;
  laserOperations: number;
  captureOperations: number;
}

export interface MendMission {
  id: string;
  targetObject: string;
  method: 'laser' | 'capture' | 'combined';
  status: 'planned' | 'in_progress' | 'completed' | 'failed';
  startDate: string;
  endDate?: string;
  altitude: number;
  successProbability: number;
}

export interface AppSettings {
  darkMode: boolean;
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  units: 'metric' | 'imperial';
}

export type RootTabParamList = {
  Home: undefined;
  Tracking: undefined;
  Missions: undefined;
  Favorites: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Main: undefined;
  ObjectDetail: { object: OrbitalObject };
  MissionDetail: { mission: MendMission };
};
