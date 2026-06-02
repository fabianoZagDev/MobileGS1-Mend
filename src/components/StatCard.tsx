import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { typography } from '../theme/typography';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface Props {
  label: string;
  value: string;
  icon: IoniconName;
  accent?: string;
  subtitle?: string;
}

export function StatCard({ label, value, icon, accent, subtitle }: Props) {
  const { colors } = useTheme();
  const tint = accent ?? colors.primary;

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={styles.iconRow}>
        <View style={[styles.accentBar, { backgroundColor: tint }]} />
        <Ionicons name={icon} size={20} color={tint} />
      </View>
      <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>
      {subtitle ? (
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>{subtitle}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    padding: 16,
    minWidth: 100,
    margin: 5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  accentBar: {
    width: 3,
    height: 18,
    borderRadius: 2,
    marginRight: 9,
  },
  value: { ...typography.monoLarge, marginBottom: 3 },
  label: { ...typography.caption },
  subtitle: { ...typography.caption, marginTop: 4 },
});
