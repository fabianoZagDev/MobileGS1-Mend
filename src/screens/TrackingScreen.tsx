import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useDebris } from '../hooks/useDebris';
import { DebrisCard } from '../components/DebrisCard';
import { LoadingScreen } from '../components/LoadingScreen';
import { typography } from '../theme/typography';

type FilterRisk = 'all' | 'critical' | 'high' | 'medium' | 'low';
type SortBy = 'risk' | 'altitude' | 'velocity' | 'size';

const RISK_FILTERS: { key: FilterRisk; label: string; dot?: 'critical' | 'high' | 'medium' | 'low' }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'critical', label: 'Crítico', dot: 'critical' },
  { key: 'high', label: 'Alto', dot: 'high' },
  { key: 'medium', label: 'Médio', dot: 'medium' },
  { key: 'low', label: 'Baixo', dot: 'low' },
];

const SORTS: { key: SortBy; label: string }[] = [
  { key: 'risk', label: 'Risco' },
  { key: 'altitude', label: 'Altitude' },
  { key: 'velocity', label: 'Velocidade' },
  { key: 'size', label: 'Tamanho' },
];

const RISK_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };

export function TrackingScreen() {
  const { colors } = useTheme();
  const { objects, loading, refresh } = useDebris();
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState<FilterRisk>('all');
  const [sortBy, setSortBy] = useState<SortBy>('risk');

  const dotColor = (level: 'critical' | 'high' | 'medium' | 'low') =>
    level === 'critical' ? colors.danger : level === 'high' ? colors.warning : level === 'medium' ? colors.accent : colors.success;

  const filtered = useMemo(() => {
    let list = [...objects];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) => o.name.toLowerCase().includes(q) || o.country.toLowerCase().includes(q) || o.type.toLowerCase().includes(q),
      );
    }
    if (riskFilter !== 'all') list = list.filter((o) => o.riskLevel === riskFilter);
    list.sort((a, b) => {
      switch (sortBy) {
        case 'risk': return RISK_ORDER[a.riskLevel] - RISK_ORDER[b.riskLevel];
        case 'altitude': return a.altitude - b.altitude;
        case 'velocity': return b.velocity - a.velocity;
        case 'size': return b.size - a.size;
        default: return 0;
      }
    });
    return list;
  }, [objects, search, riskFilter, sortBy]);

  if (loading) return <LoadingScreen message="Rastreando objetos orbitais" />;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Rastreamento</Text>
        <Text style={[styles.count, { color: colors.textMuted }]}>{filtered.length} objetos</Text>
      </View>

      <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <Ionicons name="search" size={18} color={colors.textMuted} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Buscar por nome, país, tipo..."
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterRow}>
        {RISK_FILTERS.map((f) => {
          const active = riskFilter === f.key;
          return (
            <TouchableOpacity
              key={f.key}
              onPress={() => setRiskFilter(f.key)}
              style={[
                styles.filterChip,
                { backgroundColor: active ? colors.primary : colors.surface, borderColor: active ? colors.primary : colors.border },
              ]}
            >
              {f.dot && <View style={[styles.filterDot, { backgroundColor: active ? '#fff' : dotColor(f.dot) }]} />}
              <Text style={[styles.filterText, { color: active ? '#fff' : colors.textSecondary }]}>{f.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.sortRow}>
        <Text style={[styles.sortLabel, { color: colors.textMuted }]}>Ordenar</Text>
        {SORTS.map((s) => {
          const active = sortBy === s.key;
          return (
            <TouchableOpacity
              key={s.key}
              onPress={() => setSortBy(s.key)}
              style={[styles.sortChip, active && { backgroundColor: colors.primary + '22' }]}
            >
              <Text style={[styles.sortText, { color: active ? colors.primary : colors.textMuted }]}>{s.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DebrisCard object={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="telescope-outline" size={44} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>Nenhum objeto encontrado</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 14 },
  title: { ...typography.h2 },
  count: { ...typography.bodySmall, marginBottom: 3 },
  searchBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 14, marginHorizontal: 16, paddingHorizontal: 14, paddingVertical: 11, marginBottom: 12 },
  searchInput: { flex: 1, ...typography.body, marginLeft: 8 },
  filterRow: { flexDirection: 'row', paddingHorizontal: 12, marginBottom: 10, flexWrap: 'wrap' },
  filterChip: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 20, paddingHorizontal: 13, paddingVertical: 6, margin: 4 },
  filterDot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  filterText: { ...typography.bodySmall, fontFamily: typography.bodyMedium.fontFamily },
  sortRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 },
  sortLabel: { ...typography.caption, marginRight: 8, textTransform: 'uppercase', letterSpacing: 1 },
  sortChip: { paddingHorizontal: 11, paddingVertical: 5, borderRadius: 8, marginRight: 4 },
  sortText: { ...typography.bodySmall, fontFamily: typography.bodyMedium.fontFamily },
  list: { paddingHorizontal: 16, paddingBottom: 32 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyText: { ...typography.body, marginTop: 14 },
});
