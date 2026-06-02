import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { OrbitalObject } from '../types';
import { loadFavorites, saveFavorites } from '../storage/favoritesStorage';

interface FavoritesContextType {
  favorites: OrbitalObject[];
  addFavorite: (obj: OrbitalObject) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
});

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<OrbitalObject[]>([]);

  useEffect(() => {
    loadFavorites().then((data) => {
      if (data) setFavorites(data);
    });
  }, []);

  const addFavorite = async (obj: OrbitalObject) => {
    const updated = [...favorites, { ...obj, isFavorite: true }];
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const removeFavorite = async (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    await saveFavorites(updated);
  };

  const isFavorite = (id: string) => favorites.some((f) => f.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
