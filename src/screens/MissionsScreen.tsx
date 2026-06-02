import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { MissionCard } from '../components/MissionCard';
import { getMendMissions } from '../services/debrisService';
import { typography } from '../theme/typography';

type FilterStatus = 'all' | 'in_progress' | 'planned' | 'completed';

export function MissionsScreen() {
  const { colors } = useTheme();
  const missions = getMendMissions();
  const [filter, setFilter] = useState<FilterStatus>('all');

  const STATUS_FILTERS: { key: FilterStatus; label: string; color?: string }[] = [
    { key: 'all', label: 'Todas' },
    { key: 'in_progress', label: 'Ativas', color: colors.primary },
    { key: 'planned', label: 'Planejadas', color: colors.accent },
    { key: 'completed', label: 'Concluídas', color: colors.success },
  ];

  const filtered = filter === 'all' ? missions : missions.filter((m) => m.status === filter);

  const stats = {
    total: missions.length,
    active: missions.filter((m) => m.status === 'in_progress').length,
    completed: missions.filter((m) => m.status === 'completed').length,
    planned: missions.filter((m) => m.status === 'planned').length,
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Missões</Text>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>Operações de remoção orbital</Text>
      </View>

      <View style={[styles.statsBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <MiniStat label="Total" value={stats.total.toString()} colors={colors} />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <MiniStat label="Ativas" value={stats.active.toString()} colors={colors} accent={colors.primary} />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <MiniStat label="Concluídas" value={stats.completed.toString()} colors={colors} accent={colors.success} />
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <MiniStat label="Planejadas" value={stats.planned.toString()} colors={colors} accent={colors.accent} />
      </View>

      <View style={styles.filterRow}>
        {STATUS_FILTERS.map((f) => {
          const active = filter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFilter(f.key)}
              style={[styles.filterChip, { backgroundColor: active ? colors.primary : colors.surface, borderColor: active ? colors.primary : colors.border }]}
            >
              {f.color && <View style={[styles.filterDot, { backgroundColor: active ? '#fff' : f.color }]} />}
              <Text style={[styles.filterText, { color: active ? '#fff' : colors.textSecondary }]}>{f.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MissionCard mission={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="rocket-outline" size={44} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Nenhuma missão encontrada</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

function MiniStat({ label, value, colors, accent }: { label: string; value: string; colors: any; accent?: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{ ...typography.h3, color: accent ?? colors.text }}>{value}</Text>
      <Text style={{ ...typography.caption, color: colors.textMuted, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 14 },
  title: { ...typography.h2 },
  subtitle: { ...typography.bodySmall, marginTop: 2 },
  statsBar: { flexDirection: 'row', marginHorizontal: 16, borderRadius: 16, borderWidth: 1, paddingVertical: 16, marginBottom: 14 },
  divider: { width: 1, marginVertical: 4 },
  filterRow: { flexDirection: 'row', paddingHorizontal: 12, marginBottom: 12, flexWrap: 'wrap' },
  filterChip: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, margin: 4 },
  filterDot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  filterText: { ...typography.bodySmall, fontFamily: typography.bodyMedium.fontFamily },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { ...typography.body, marginTop: 14 },
});
