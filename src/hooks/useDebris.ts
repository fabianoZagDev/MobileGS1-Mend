import { useState, useEffect, useCallback } from 'react';
import { OrbitalObject, DashboardStats } from '../types';
import { getOrbitalObjects, getDashboardStats } from '../services/debrisService';

export function useDebris() {
  const [objects, setObjects] = useState<OrbitalObject[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrbitalObjects();
      setObjects(data);
      setStats(getDashboardStats(data));
    } catch (e) {
      setError('Falha ao carregar dados orbitais. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { objects, stats, loading, error, refresh: load };
}
