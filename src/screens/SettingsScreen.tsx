import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { AppSettings } from '../types';
import { loadSettings, saveSettings } from '../storage/settingsStorage';
import { typography } from '../theme/typography';
import { Logo } from '../components/Logo';

type IoniconName = keyof typeof Ionicons.glyphMap;

export function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useTheme();
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
    notifications: true,
    autoRefresh: true,
    refreshInterval: 30,
    units: 'metric',
  });

  useEffect(() => {
    loadSettings().then((s) => { if (s) setSettings(s); });
  }, []);

  const update = async (patch: Partial<AppSettings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    await saveSettings(next);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.header }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.title, { color: colors.onPrimary }]}>Configurações</Text>
      </View>

      <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.profileCard, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <Logo height={32} />
          <Text style={[styles.profileVersion, { color: colors.textMuted }]}>
            Orbital Debris Removal System · v1.0
          </Text>
        </View>

        <SectionTitle label="APARÊNCIA" colors={colors} />
        <SettingRow
          icon="moon-outline"
          label="Modo Escuro"
          description="Interface escura para uso noturno"
          colors={colors}
          right={
            <Switch
              value={isDark}
              onValueChange={() => { toggleTheme(); update({ darkMode: !isDark }); }}
              trackColor={{ false: colors.border, true: colors.primary + '88' }}
              thumbColor={isDark ? colors.primary : colors.textMuted}
            />
          }
        />

        <SectionTitle label="DADOS" colors={colors} />
        <SettingRow
          icon="refresh-outline"
          label="Atualização Automática"
          description="Recarregar dados periodicamente"
          colors={colors}
          right={
            <Switch
              value={settings.autoRefresh}
              onValueChange={(v) => update({ autoRefresh: v })}
              trackColor={{ false: colors.border, true: colors.primary + '88' }}
              thumbColor={settings.autoRefresh ? colors.primary : colors.textMuted}
            />
          }
        />
        <SettingRow
          icon="notifications-outline"
          label="Notificações"
          description="Alertas de risco orbital"
          colors={colors}
          right={
            <Switch
              value={settings.notifications}
              onValueChange={(v) => update({ notifications: v })}
              trackColor={{ false: colors.border, true: colors.primary + '88' }}
              thumbColor={settings.notifications ? colors.primary : colors.textMuted}
            />
          }
        />

        <SectionTitle label="UNIDADES" colors={colors} />
        <View style={[styles.unitRow, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => update({ units: 'metric' })}
            style={[styles.unitBtn, settings.units === 'metric' && { backgroundColor: colors.primary }]}
          >
            <Text style={{ ...typography.bodyMedium, color: settings.units === 'metric' ? '#fff' : colors.textSecondary }}>
              Métrico (km)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => update({ units: 'imperial' })}
            style={[styles.unitBtn, settings.units === 'imperial' && { backgroundColor: colors.primary }]}
          >
            <Text style={{ ...typography.bodyMedium, color: settings.units === 'imperial' ? '#fff' : colors.textSecondary }}>
              Imperial (mi)
            </Text>
          </TouchableOpacity>
        </View>

        <SectionTitle label="SOBRE" colors={colors} />
        <View style={[styles.aboutBox, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
          <AboutRow label="Versão" value="1.0.0" colors={colors} />
          <AboutRow label="SDK" value="Expo 52" colors={colors} />
          <AboutRow label="Fonte de dados" value="NASA NeoWs API" colors={colors} />
          <AboutRow label="Projeto" value="FIAP Global Solution 2026" colors={colors} last />
        </View>

        <View style={[styles.teamCard, { backgroundColor: colors.primary + '10', borderColor: colors.primary + '33' }]}>
          <Text style={[styles.teamTitle, { color: colors.primary }]}>EQUIPE</Text>
          <Text style={[styles.teamText, { color: colors.textSecondary }]}>
            Space Connect Challenge{'\n'}FIAP Global Solution 2026
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SectionTitle({ label, colors }: { label: string; colors: any }) {
  return <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{label}</Text>;
}

function SettingRow({
  icon,
  label,
  description,
  colors,
  right,
}: {
  icon: IoniconName;
  label: string;
  description: string;
  colors: any;
  right: React.ReactNode;
}) {
  return (
    <View style={[styles.settingRow, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
      <View style={[styles.settingIcon, { backgroundColor: colors.primary + '1a' }]}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingLabel, { color: colors.text }]}>{label}</Text>
        <Text style={[styles.settingDesc, { color: colors.textMuted }]}>{description}</Text>
      </View>
      {right}
    </View>
  );
}

function AboutRow({ label, value, colors, last }: { label: string; value: string; colors: any; last?: boolean }) {
  return (
    <View style={[styles.aboutRow, !last && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <Text style={[styles.aboutLabel, { color: colors.textMuted }]}>{label}</Text>
      <Text style={[styles.aboutValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18 },
  title: { ...typography.h2 },
  scroll: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 48 },
  profileCard: { borderWidth: 1, borderRadius: 10, padding: 20, marginBottom: 26, alignItems: 'flex-start' },
  profileVersion: { ...typography.monoSmall, fontSize: 10, marginTop: 12, letterSpacing: 0.5 },
  sectionTitle: { ...typography.label, marginBottom: 12, marginTop: 26 },
  settingRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, borderWidth: 1, padding: 15, marginBottom: 10 },
  settingIcon: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 13 },
  settingInfo: { flex: 1 },
  settingLabel: { ...typography.h4, marginBottom: 2 },
  settingDesc: { ...typography.caption },
  unitRow: { flexDirection: 'row', borderRadius: 8, borderWidth: 1, overflow: 'hidden', marginBottom: 8 },
  unitBtn: { flex: 1, padding: 14, alignItems: 'center' },
  aboutBox: { borderRadius: 8, borderWidth: 1, marginBottom: 8 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  aboutLabel: { ...typography.body },
  aboutValue: { ...typography.monoSmall, fontSize: 12 },
  teamCard: { borderWidth: 1, borderRadius: 10, padding: 20, marginTop: 16, alignItems: 'center' },
  teamTitle: { ...typography.label, marginBottom: 8 },
  teamText: { ...typography.body, textAlign: 'center', lineHeight: 22 },
});
