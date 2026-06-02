import AsyncStorage from '@react-native-async-storage/async-storage';
import { OrbitalObject } from '../types';

const KEY = '@mend:favorites';

export async function loadFavorites(): Promise<OrbitalObject[] | null> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function saveFavorites(data: OrbitalObject[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
}
