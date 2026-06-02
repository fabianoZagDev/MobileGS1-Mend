import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useDebris } from '../hooks/useDebris';
import { StatCard } from '../components/StatCard';
import { MissionCard } from '../components/MissionCard';
import { LoadingScreen } from '../components/LoadingScreen';
import { AppHeader } from '../components/AppHeader';
import { MonthlyChart } from '../components/MonthlyChart';
import { getMendMissions } from '../services/debrisService';
import { formatNumber } from '../utils/formatters';
import { typography } from '../theme/typography';

export function HomeScreen() {
  const { colors } = useTheme();
  const { objects, stats, loading, error, refresh } = useDebris();
  const missions = getMendMissions();

  if (loading) return <LoadingScreen />;

  const elevated = objects.filter((o) => o.riskLevel === 'critical' || o.riskLevel === 'high').length;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.header }]} edges={['top']}>
      {/* Header laranja com logo + frase */}
      <AppHeader />

      <ScrollView
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />}
      >
        {/* Título da página (fora do header, sem card) */}
        <View style={styles.pageTitleRow}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Painel Orbital</Text>
          <View style={[styles.statusBadge, { backgroundColor: colors.primary + '14', borderColor: colors.primary + '55' }]}>
            <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
            <Text style={[styles.statusText, { color: colors.primary }]}>SISTEMA ONLINE</Text>
          </View>
        </View>

        {error && (
          <View style={[styles.errorBox, { backgroundColor: colors.danger + '1a', borderColor: colors.danger }]}>
            <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>
            <TouchableOpacity onPress={refresh}>
              <Text style={[styles.retryText, { color: colors.primary }]}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Stats Grid */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>SITUAÇÃO ORBITAL</Text>
        {stats && (
          <>
            <View style={styles.statsRow}>
              <StatCard icon="globe-outline" label="Detritos Rastreados" value={formatNumber(stats.totalTracked)} accent={colors.primary} />
              <StatCard icon="warning-outline" label="Risco Crítico" value={stats.criticalRisk.toString()} accent={colors.warning} />
            </View>
            <View style={styles.statsRow}>
              <StatCard icon="checkmark-done-outline" label="Removidos (2026)" value={stats.removedThisYear.toString()} accent={colors.success} />
              <StatCard icon="rocket-outline" label="Missões Ativas" value={stats.activeMissions.toString()} accent={colors.text} />
            </View>
            <View style={styles.statsRow}>
              <StatCard icon="flash-outline" label="Operações Laser" value={stats.laserOperations.toString()} accent={colors.text} />
              <StatCard icon="magnet-outline" label="Operações Captura" value={stats.captureOperations.toString()} accent={colors.text} />
            </View>
          </>
        )}

        {/* Gráfico mensal */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>DESEMPENHO MENSAL · 2026</Text>
        <MonthlyChart />

        {/* Alert */}
        <View style={[styles.alertBanner, { backgroundColor: colors.primary + '12', borderColor: colors.primary + '55' }]}>
          <Ionicons name="alert-circle-outline" size={24} color={colors.primary} />
          <View style={styles.alertInfo}>
            <Text style={[styles.alertTitle, { color: colors.primary }]}>Alta atividade orbital</Text>
            <Text style={[styles.alertDesc, { color: colors.textSecondary }]}>
              {elevated} objetos de risco elevado detectados nos próximos 7 dias
            </Text>
          </View>
        </View>

        {/* Missions */}
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>MISSÕES EM DESTAQUE</Text>
        {missions.slice(0, 3).map((m) => (
          <MissionCard key={m.id} mission={m} />
        ))}

        {/* About */}
        <View style={[styles.aboutCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Text style={[styles.aboutLabel, { color: colors.primary }]}>SOBRE O SISTEMA</Text>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            Plataforma orbital reutilizável com laser de ablação e garras de captura. Reduz o tempo
            de reentrada de detritos de 80 anos para apenas 3 anos.
          </Text>
          <View style={[styles.aboutDivider, { backgroundColor: colors.border }]} />
          <View style={styles.aboutStats}>
            <AboutStat label="Fragmentos > 10cm" value="54.000" colors={colors} />
            <AboutStat label="Velocidade média" value="28.000 km/h" colors={colors} />
            <AboutStat label="Mercado 2035" value="US$ 13,5B" colors={colors} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function AboutStat({ label, value, colors }: { label: string; value: string; colors: any }) {
  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Text style={{ ...typography.monoMedium, fontSize: 15, color: colors.text }}>{value}</Text>
      <Text style={{ ...typography.caption, color: colors.textMuted, textAlign: 'center', marginTop: 3 }}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  headerBar: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18 },
  headerTitle: { ...typography.h2 },
  pageTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6, borderWidth: 1 },
  statusDot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  statusText: { ...typography.label },
  tagline: { ...typography.bodySmall, fontStyle: 'italic', marginTop: 10, opacity: 0.9 },
  sectionTitle: { ...typography.label, marginTop: 26, marginBottom: 14 },
  statsRow: { flexDirection: 'row' },
  errorBox: { borderWidth: 1, borderRadius: 8, padding: 14, marginTop: 16 },
  errorText: { ...typography.body, marginBottom: 6 },
  retryText: { ...typography.bodyMedium },
  alertBanner: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 8, padding: 16, marginTop: 24 },
  alertInfo: { flex: 1, marginLeft: 12 },
  alertTitle: { ...typography.h4, marginBottom: 3 },
  alertDesc: { ...typography.bodySmall },
  aboutCard: { borderRadius: 10, borderWidth: 1, padding: 20, marginTop: 16 },
  aboutLabel: { ...typography.label, marginBottom: 10 },
  aboutText: { ...typography.body, lineHeight: 21 },
  aboutDivider: { height: 1, marginVertical: 18 },
  aboutStats: { flexDirection: 'row' },
});
