import { OrbitalObject, DashboardStats, MendMission } from '../types';
import { NasaNeoObject, fetchNeoFeed } from './nasaApi';

const OBJECT_TYPES: OrbitalObject['type'][] = ['debris', 'satellite', 'fragment', 'rocket_body'];
const COUNTRIES = ['USA', 'RUS', 'CHN', 'ESA', 'JPN', 'IND', 'UK', 'FRA'];
const RISK_LEVELS: OrbitalObject['riskLevel'][] = ['low', 'medium', 'high', 'critical'];

function neoToOrbital(neo: NasaNeoObject, date: string): OrbitalObject {
  const approachData = neo.close_approach_data[0];
  const velocity = approachData
    ? parseFloat(approachData.relative_velocity.kilometers_per_hour)
    : Math.random() * 25000 + 5000;
  const missDistance = approachData
    ? parseFloat(approachData.miss_distance.kilometers)
    : Math.random() * 50000000;

  const altitude = Math.min(2000, Math.max(200, (missDistance / 1000000) * 100 + 300));
  const sizeMid =
    ((neo.estimated_diameter.kilometers.estimated_diameter_min +
      neo.estimated_diameter.kilometers.estimated_diameter_max) /
      2) *
    100000;

  const riskIndex = neo.is_potentially_hazardous_asteroid ? 3 : Math.floor(Math.random() * 3);

  return {
    id: neo.id,
    name: neo.name.replace(/[()]/g, '').trim(),
    size: Math.round(sizeMid),
    altitude: Math.round(altitude),
    velocity: Math.round(velocity),
    type: OBJECT_TYPES[Math.floor(Math.random() * OBJECT_TYPES.length)],
    riskLevel: RISK_LEVELS[riskIndex],
    country: COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)],
    launchYear: Math.floor(Math.random() * 40) + 1980,
    isFavorite: false,
  };
}

export async function getOrbitalObjects(): Promise<OrbitalObject[]> {
  const feed = await fetchNeoFeed();
  const objects: OrbitalObject[] = [];
  for (const [date, neos] of Object.entries(feed.near_earth_objects)) {
    for (const neo of neos) {
      objects.push(neoToOrbital(neo, date));
    }
  }
  return objects.slice(0, 60);
}

export function getDashboardStats(objects: OrbitalObject[]): DashboardStats {
  return {
    totalTracked: 130_000_000 + objects.length * 1000,
    criticalRisk: objects.filter((o) => o.riskLevel === 'critical').length,
    removedThisYear: 847,
    activeMissions: 3,
    laserOperations: 524,
    captureOperations: 323,
  };
}

export function getMendMissions(): MendMission[] {
  return [
    {
      id: 'm1',
      targetObject: 'Cosmos-2251 Fragment #A',
      method: 'laser',
      status: 'in_progress',
      startDate: '2026-04-15',
      altitude: 800,
      successProbability: 94,
    },
    {
      id: 'm2',
      targetObject: 'SL-16 R/B #2346',
      method: 'capture',
      status: 'planned',
      startDate: '2026-06-10',
      altitude: 650,
      successProbability: 87,
    },
    {
      id: 'm3',
      targetObject: 'Fengyun-1C Fragment #1247',
      method: 'combined',
      status: 'completed',
      startDate: '2026-02-01',
      endDate: '2026-03-22',
      altitude: 850,
      successProbability: 98,
    },
    {
      id: 'm4',
      targetObject: 'Iridium-33 Fragment #B',
      method: 'laser',
      status: 'planned',
      startDate: '2026-07-20',
      altitude: 780,
      successProbability: 91,
    },
    {
      id: 'm5',
      targetObject: 'NOAA-16 R/B',
      method: 'capture',
      status: 'completed',
      startDate: '2025-11-10',
      endDate: '2026-01-08',
      altitude: 840,
      successProbability: 96,
    },
  ];
}
