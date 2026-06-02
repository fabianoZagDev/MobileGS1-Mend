import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useDebris } from '../hooks/useDebris';
import { StatCard } from '../components/StatCard';
import { MissionCard } from '../components/MissionCard';
import { LoadingScreen } from '../components/LoadingScreen';
import { Logo } from '../components/Logo';
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} tintColor={colors.primary} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <Logo height={30} />
          <View style={[styles.statusBadge, { backgroundColor: colors.primary + '1a', borderColor: colors.primary + '40' }]}>
            <View style={[styles.statusDot, { backgroundColor: colors.primary }]} />
            <Text style={[styles.statusText, { color: colors.primary }]}>SISTEMA ONLINE</Text>
          </View>
        </View>

        <Text style={[styles.tagline, { color: colors.textSecondary }]}>
          O espaço pertence à eternidade. O lixo, não.
        </Text>

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
  scroll: { padding: 16, paddingBottom: 32 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, borderWidth: 1 },
  statusDot: { width: 7, height: 7, borderRadius: 4, marginRight: 6 },
  statusText: { ...typography.label },
  tagline: { ...typography.bodySmall, fontStyle: 'italic', marginBottom: 8 },
  sectionTitle: { ...typography.label, marginTop: 22, marginBottom: 12 },
  statsRow: { flexDirection: 'row' },
  errorBox: { borderWidth: 1, borderRadius: 14, padding: 14, marginTop: 12 },
  errorText: { ...typography.body, marginBottom: 6 },
  retryText: { ...typography.bodyMedium },
  alertBanner: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 16, padding: 16, marginTop: 18 },
  alertInfo: { flex: 1, marginLeft: 12 },
  alertTitle: { ...typography.h4, marginBottom: 3 },
  alertDesc: { ...typography.bodySmall },
  aboutCard: { borderRadius: 20, borderWidth: 1, padding: 20, marginTop: 12 },
  aboutLabel: { ...typography.label, marginBottom: 10 },
  aboutText: { ...typography.body, lineHeight: 21 },
  aboutDivider: { height: 1, marginVertical: 18 },
  aboutStats: { flexDirection: 'row' },
});
