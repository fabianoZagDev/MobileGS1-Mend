import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppSettings } from '../types';

const KEY = '@mend:settings';

const defaults: AppSettings = {
  darkMode: false,
  notifications: true,
  autoRefresh: true,
  refreshInterval: 30,
  units: 'metric',
};

export async function loadSettings(): Promise<AppSettings | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
  } catch {
    return defaults;
  }
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(settings));
}
