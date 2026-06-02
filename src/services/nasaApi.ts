import axios from 'axios';
import { NasaNeoObject } from '../types';

const NASA_API_KEY = 'DEMO_KEY';
const BASE_URL = 'https://api.nasa.gov';

const api = axios.create({ baseURL: BASE_URL, timeout: 10000 });

export interface NeoFeedResponse {
  element_count: number;
  near_earth_objects: Record<string, NasaNeoObject[]>;
}

export async function fetchNeoFeed(): Promise<NeoFeedResponse> {
  const today = new Date();
  const start = today.toISOString().split('T')[0];
  const end = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const response = await api.get<NeoFeedResponse>('/neo/rest/v1/feed', {
    params: { start_date: start, end_date: end, api_key: NASA_API_KEY },
  });
  return response.data;
}

export async function fetchApod(): Promise<{ url: string; title: string; explanation: string }> {
  const response = await api.get('/planetary/apod', {
    params: { api_key: NASA_API_KEY },
  });
  return response.data;
}

export async function fetchDonkiSolarFlares(): Promise<any[]> {
  const today = new Date();
  const start = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];
  const end = today.toISOString().split('T')[0];

  const response = await api.get('/DONKI/FLR', {
    params: { startDate: start, endDate: end, api_key: NASA_API_KEY },
  });
  return response.data;
}
