import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { MendMission } from '../types';
import { typography } from '../theme/typography';
import { getMissionMethodLabel, getMissionStatusLabel } from '../utils/formatters';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface Props {
  mission: MendMission;
}

function getStatusColor(status: string, colors: any): string {
  switch (status) {
    case 'in_progress': return colors.primary;
    case 'completed': return colors.success;
    case 'failed': return colors.danger;
    default: return colors.textMuted;
  }
}

function getMethodIcon(method: string): IoniconName {
  switch (method) {
    case 'laser': return 'flash-outline';
    case 'capture': return 'magnet-outline';
    case 'combined': return 'git-merge-outline';
    default: return 'ellipse-outline';
  }
}

export function MissionCard({ mission }: Props) {
  const { colors } = useTheme();
  const statusColor = getStatusColor(mission.status, colors);

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={styles.header}>
        <View style={[styles.iconWrap, { backgroundColor: colors.primary + '1f' }]}>
          <Ionicons name={getMethodIcon(mission.method)} size={20} color={colors.primary} />
        </View>
        <View style={styles.info}>
          <Text style={[styles.target, { color: colors.text }]} numberOfLines={1}>
            {mission.targetObject}
          </Text>
          <Text style={[styles.method, { color: colors.textSecondary }]}>
            {getMissionMethodLabel(mission.method)} · {mission.altitude} km
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusColor + '22' }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>
            {getMissionStatusLabel(mission.status)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.date, { color: colors.textMuted }]}>Início · {mission.startDate}</Text>
        <View style={styles.probRow}>
          <View style={[styles.probBar, { backgroundColor: colors.surfaceAlt }]}>
            <View
              style={[
                styles.probFill,
                { width: `${mission.successProbability}%` as any, backgroundColor: colors.success },
              ]}
            />
          </View>
          <Text style={[styles.probText, { color: colors.success }]}>
            {mission.successProbability}%
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, padding: 16, marginBottom: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  info: { flex: 1, marginRight: 8 },
  target: { ...typography.h4, marginBottom: 2 },
  method: { ...typography.bodySmall },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  statusText: { ...typography.label },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  date: { ...typography.caption },
  probRow: { flexDirection: 'row', alignItems: 'center' },
  probBar: { width: 80, height: 5, borderRadius: 3, marginRight: 8, overflow: 'hidden' },
  probFill: { height: '100%', borderRadius: 3 },
  probText: { ...typography.bodyMedium, fontSize: 12 },
});
