import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { DebrisCard } from '../components/DebrisCard';
import { typography } from '../theme/typography';

export function FavoritesScreen() {
  const { colors } = useTheme();
  const { favorites, removeFavorite } = useFavorites();

  const clearAll = () => {
    Alert.alert('Limpar Favoritos', 'Remover todos os objetos favoritos?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: () => favorites.forEach((f) => removeFavorite(f.id)) },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.header }]} edges={['top']}>
      <View style={[styles.header, { backgroundColor: colors.header }]}>
        <Text style={[styles.title, { color: colors.onPrimary }]}>Favoritos</Text>
        {favorites.length > 0 && (
          <TouchableOpacity onPress={clearAll} style={styles.clearBtn}>
            <Ionicons name="trash-outline" size={16} color={colors.onPrimary} />
            <Text style={[styles.clearText, { color: colors.onPrimary }]}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.body, { backgroundColor: colors.background }]}>
        {favorites.length > 0 && (
          <View style={[styles.countBadge, { backgroundColor: colors.primary + '14', borderColor: colors.primary + '33' }]}>
            <Ionicons name="star" size={15} color={colors.primary} />
            <Text style={[styles.countText, { color: colors.primary }]}>
              {favorites.length} objeto{favorites.length > 1 ? 's' : ''} salvo{favorites.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}

        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DebrisCard object={item} />}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="star-outline" size={52} color={colors.textMuted} />
              <Text style={[styles.emptyTitle, { color: colors.text }]}>Nenhum favorito ainda</Text>
              <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>
                Toque na estrela de qualquer objeto na aba Rastreamento para salvá-lo aqui.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 18 },
  title: { ...typography.h2 },
  clearBtn: { flexDirection: 'row', alignItems: 'center' },
  clearText: { ...typography.bodyMedium, marginLeft: 5 },
  countBadge: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, borderRadius: 10, borderWidth: 1, paddingVertical: 10, paddingHorizontal: 14, marginTop: 18, marginBottom: 4 },
  countText: { ...typography.bodyMedium, marginLeft: 7 },
  list: { paddingHorizontal: 20, paddingTop: 14, paddingBottom: 36 },
  empty: { alignItems: 'center', paddingTop: 80, paddingHorizontal: 32 },
  emptyTitle: { ...typography.h3, marginTop: 18, marginBottom: 8 },
  emptyDesc: { ...typography.body, textAlign: 'center', lineHeight: 22 },
});
