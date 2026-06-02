import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { typography } from '../theme/typography';
import { Logo } from './Logo';

interface Props {
  message?: string;
}

export function LoadingScreen({ message = 'Conectando à NASA API' }: Props) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Logo height={48} />
      <ActivityIndicator size="small" color={colors.primary} style={styles.spinner} />
      <Text style={[styles.message, { color: colors.textMuted }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  spinner: { marginTop: 32, marginBottom: 16 },
  message: { ...typography.caption, letterSpacing: 0.5 },
});
