import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { OrbitalObject } from '../types';
import { typography } from '../theme/typography';
import { getRiskColor, getTypeLabel, formatVelocity, formatSize } from '../utils/formatters';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface Props {
  object: OrbitalObject;
  onPress?: (obj: OrbitalObject) => void;
}

export function DebrisCard({ object, onPress }: Props) {
  const { colors } = useTheme();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const fav = isFavorite(object.id);
  const riskColor = getRiskColor(object.riskLevel, colors);

  const toggleFav = () => {
    if (fav) removeFavorite(object.id);
    else addFavorite(object);
  };

  return (
    <TouchableOpacity
      onPress={() => onPress?.(object)}
      activeOpacity={0.85}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}
    >
      <View style={[styles.riskBar, { backgroundColor: riskColor }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
              {object.name}
            </Text>
            <View style={[styles.typeBadge, { backgroundColor: colors.surfaceAlt }]}>
              <Text style={[styles.typeText, { color: colors.textSecondary }]}>
                {getTypeLabel(object.type)}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={toggleFav} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons
              name={fav ? 'star' : 'star-outline'}
              size={20}
              color={fav ? colors.primary : colors.textMuted}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.stats}>
          <InfoChip icon="arrow-up-circle-outline" label="Altitude" value={`${object.altitude} km`} colors={colors} />
          <InfoChip icon="speedometer-outline" label="Velocidade" value={formatVelocity(object.velocity)} colors={colors} />
          <InfoChip icon="resize-outline" label="Tamanho" value={formatSize(object.size)} colors={colors} />
        </View>

        <View style={styles.footer}>
          <View style={[styles.riskBadge, { backgroundColor: riskColor + '22' }]}>
            <View style={[styles.riskDot, { backgroundColor: riskColor }]} />
            <Text style={[styles.riskText, { color: riskColor }]}>
              {object.riskLevel.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.meta, { color: colors.textMuted }]}>
            {object.country} · {object.launchYear}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function InfoChip({
  icon,
  label,
  value,
  colors,
}: {
  icon: IoniconName;
  label: string;
  value: string;
  colors: any;
}) {
  return (
    <View style={chipStyles.chip}>
      <Ionicons name={icon} size={15} color={colors.textMuted} />
      <Text style={[chipStyles.label, { color: colors.textMuted }]}>{label}</Text>
      <Text style={[chipStyles.value, { color: colors.textSecondary }]}>{value}</Text>
    </View>
  );
}

const chipStyles = StyleSheet.create({
  chip: { alignItems: 'center', flex: 1 },
  label: { ...typography.caption, marginTop: 3 },
  value: { ...typography.monoMedium, marginTop: 2 },
});

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  riskBar: { width: 4 },
  content: { flex: 1, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  nameRow: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 8 },
  name: { ...typography.h4, flex: 0, marginRight: 8 },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5 },
  typeText: { ...typography.monoSmall, fontSize: 10 },
  stats: { flexDirection: 'row', marginBottom: 14 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  riskBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 5 },
  riskDot: { width: 6, height: 6, borderRadius: 3, marginRight: 5 },
  riskText: { ...typography.label },
  meta: { ...typography.monoSmall },
});
