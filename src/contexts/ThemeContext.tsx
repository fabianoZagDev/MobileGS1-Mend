import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { darkColors, lightColors, ColorScheme } from '../theme/colors';
import { loadSettings, saveSettings } from '../storage/settingsStorage';

interface ThemeContextType {
  isDark: boolean;
  colors: ColorScheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadSettings().then((s) => {
      if (s) setIsDark(s.darkMode);
    });
  }, []);

  const toggleTheme = async () => {
    const next = !isDark;
    setIsDark(next);
    const settings = await loadSettings();
    await saveSettings({ ...(settings ?? defaultSettings), darkMode: next });
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors: isDark ? darkColors : lightColors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

const defaultSettings = {
  darkMode: false,
  notifications: true,
  autoRefresh: true,
  refreshInterval: 30,
  units: 'metric' as const,
};
