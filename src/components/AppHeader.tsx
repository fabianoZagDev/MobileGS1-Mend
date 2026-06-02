import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { typography } from '../theme/typography';
import { Logo } from './Logo';

// Header laranja padrão: logo + frase. Usado em todas as telas.
export function AppHeader() {
  const { colors } = useTheme();
  return (
    <View style={[styles.header, { backgroundColor: colors.header }]}>
      <Logo height={30} />
      <Text style={[styles.tagline, { color: '#fff' }]}>
        O espaço pertence à eternidade. O lixo, não.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18 },
  tagline: { ...typography.bodySmall, fontStyle: 'italic', marginTop: 10, opacity: 0.9 },
});
