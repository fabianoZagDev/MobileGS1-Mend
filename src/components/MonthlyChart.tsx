import React, { useState } from 'react';
import { View, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import Svg, { Polyline, Circle, Line, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../contexts/ThemeContext';
import { typography } from '../theme/typography';

// Dados fictícios — desempenho operacional MEND (2026)
const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'];
const MISSIONS = [4, 6, 5, 8, 7, 10];
const DEBRIS = [9, 14, 12, 18, 16, 23];

const CARD_PADDING = 18;
const CHART_H = 150;
const PAD_TOP = 12;
const PAD_BOTTOM = 22;
const PAD_X = 8; // respiro lateral p/ rótulos e dots não vazarem
const PLOT_H = CHART_H - PAD_TOP - PAD_BOTTOM;

function buildPoints(values: number[], max: number, width: number) {
  const stepX = (width - PAD_X * 2) / (values.length - 1);
  return values.map((v, i) => {
    const x = PAD_X + stepX * i;
    const y = PAD_TOP + PLOT_H * (1 - v / max);
    return { x, y };
  });
}

export function MonthlyChart() {
  const { colors, isDark } = useTheme();
  // largura medida do conteúdo interno do card (já sem padding/borda)
  const [chartW, setChartW] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w && w !== chartW) setChartW(w);
  };

  const max = Math.ceil(Math.max(...MISSIONS, ...DEBRIS) / 5) * 5;
  const colorDebris = colors.primary;
  const colorMissions = isDark ? colors.text : '#1a1a2e';

  const missionPts = chartW > 0 ? buildPoints(MISSIONS, max, chartW) : [];
  const debrisPts = chartW > 0 ? buildPoints(DEBRIS, max, chartW) : [];

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={styles.legendRow}>
        <Legend color={colorDebris} label="Detritos removidos" />
        <Legend color={colorMissions} label="Missões realizadas" />
      </View>

      {/* este View ocupa exatamente a largura interna disponível */}
      <View style={styles.plot} onLayout={onLayout}>
        {chartW > 0 && (
          <Svg width={chartW} height={CHART_H}>
            {/* linhas de grade horizontais */}
            {[0, 0.5, 1].map((g, i) => {
              const y = PAD_TOP + PLOT_H * g;
              return (
                <Line
                  key={i}
                  x1={PAD_X}
                  y1={y}
                  x2={chartW - PAD_X}
                  y2={y}
                  stroke={colors.border}
                  strokeWidth={1}
                  strokeDasharray="3 4"
                />
              );
            })}

            {/* série detritos */}
            <Polyline
              points={debrisPts.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={colorDebris}
              strokeWidth={2.5}
            />
            {debrisPts.map((p, i) => (
              <Circle key={`d${i}`} cx={p.x} cy={p.y} r={3} fill={colorDebris} />
            ))}

            {/* série missões */}
            <Polyline
              points={missionPts.map((p) => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={colorMissions}
              strokeWidth={2.5}
            />
            {missionPts.map((p, i) => (
              <Circle key={`m${i}`} cx={p.x} cy={p.y} r={3} fill={colorMissions} />
            ))}

            {/* rótulos dos meses */}
            {missionPts.map((p, i) => (
              <SvgText
                key={`l${i}`}
                x={p.x}
                y={CHART_H - 6}
                fill={colors.textMuted}
                fontSize={9}
                fontFamily={typography.mono.fontFamily}
                textAnchor="middle"
              >
                {MONTHS[i]}
              </SvgText>
            ))}
          </Svg>
        )}
      </View>
    </View>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  const { colors } = useTheme();
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={[styles.legendText, { color: colors.textSecondary }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 10, borderWidth: 1, padding: CARD_PADDING, overflow: 'hidden' },
  plot: { width: '100%', height: CHART_H },
  legendRow: { flexDirection: 'row', marginBottom: 14, flexWrap: 'wrap' },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 18, marginBottom: 4 },
  legendDot: { width: 9, height: 9, borderRadius: 5, marginRight: 6 },
  legendText: { ...typography.caption },
});
