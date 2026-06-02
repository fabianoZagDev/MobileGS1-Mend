import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { HomeScreen } from '../screens/HomeScreen';
import { TrackingScreen } from '../screens/TrackingScreen';
import { MissionsScreen } from '../screens/MissionsScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { fonts } from '../theme/fonts';
import { RootTabParamList } from '../types';

const Tab = createBottomTabNavigator<RootTabParamList>();

type IoniconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<keyof RootTabParamList, { active: IoniconName; inactive: IoniconName }> = {
  Home: { active: 'grid', inactive: 'grid-outline' },
  Tracking: { active: 'planet', inactive: 'planet-outline' },
  Missions: { active: 'rocket', inactive: 'rocket-outline' },
  Favorites: { active: 'star', inactive: 'star-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
};

export function AppNavigator() {
  const { colors, isDark } = useTheme();
  const { favorites } = useFavorites();

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme : DefaultTheme).colors,
      background: colors.background,
      card: colors.tabBar,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.tabBar,
            borderTopColor: 'transparent',
            borderTopWidth: 0,
            paddingTop: 10,
            paddingBottom: 10,
            height: 66,
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.6)',
          tabBarLabelStyle: { fontSize: 10, fontFamily: fonts.bodyMedium, marginTop: 2 },
          tabBarIcon: ({ focused, color, size }) => {
            const icon = ICONS[route.name];
            return (
              <Ionicons
                name={focused ? icon.active : icon.inactive}
                size={size ?? 22}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Início' }} />
        <Tab.Screen name="Tracking" component={TrackingScreen} options={{ tabBarLabel: 'Rastrear' }} />
        <Tab.Screen name="Missions" component={MissionsScreen} options={{ tabBarLabel: 'Missões' }} />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarLabel: 'Favoritos',
            tabBarBadge: favorites.length > 0 ? favorites.length : undefined,
            tabBarBadgeStyle: { backgroundColor: '#ffffff', color: colors.primary, fontSize: 10 },
          }}
        />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Config' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
