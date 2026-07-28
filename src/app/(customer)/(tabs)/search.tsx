import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useTheme } from '../../../hooks/useTheme';
import { SearchBar } from '../../../components/ui/SearchBar';
import { EmptyState } from '../../../components/ui/EmptyState';
import { demoRestaurants } from '../../../data/restaurants';
import { categories } from '../../../data/categories';
import { demoMenuItems } from '../../../data/menuItems';
import { formatPrice, formatDeliveryTime } from '../../../utils/formatters';

export default function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);

  const filtered = demoRestaurants.filter((r) => {
    const matchesQuery = !query || r.name.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase());
    const matchesCat = !selectedCategory || r.categories.includes(selectedCategory);
    return matchesQuery && matchesCat;
  });

  const matchingItems = query
    ? demoMenuItems.filter((m) => m.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('common.search')}</Text>
        <SearchBar
          value={query}
          onChangeText={setQuery}
          placeholder={t('home.searchPlaceholder')}
          autoFocus
        />

        {/* Category chips */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          style={styles.chips}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedCategory(selectedCategory === item.id ? null : item.id)}
              style={[
                styles.chip,
                {
                  backgroundColor: selectedCategory === item.id ? theme.colors.primary : theme.colors.surfaceVariant,
                  borderRadius: theme.borderRadius.full,
                },
              ]}
            >
              <Text style={{ fontSize: 14 }}>{item.icon}</Text>
              <Text
                style={[
                  styles.chipText,
                  { color: selectedCategory === item.id ? '#FFF' : theme.colors.text },
                ]}
              >
                {t(item.nameKey)}
              </Text>
            </Pressable>
          )}
        />

        {/* Results */}
        {filtered.length === 0 && matchingItems.length === 0 ? (
          <EmptyState icon="🔍" title={t('common.noResults')} />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
            ListHeaderComponent={
              matchingItems.length > 0 ? (
                <View style={styles.menuSection}>
                  <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                    🍽️ {t('restaurant.menu')}
                  </Text>
                  {matchingItems.slice(0, 5).map((item) => (
                    <Pressable
                      key={item.id}
                      onPress={() => router.push(`/(customer)/restaurant/${item.restaurantId}`)}
                      style={[styles.menuItem, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.md }]}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={[styles.menuName, { color: theme.colors.text }]}>{item.name}</Text>
                        <Text style={[styles.menuDesc, { color: theme.colors.textTertiary }]} numberOfLines={1}>
                          {item.description}
                        </Text>
                      </View>
                      <Text style={[styles.menuPrice, { color: theme.colors.primary }]}>
                        {formatPrice(item.price)}
                      </Text>
                    </Pressable>
                  ))}
                  <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary, marginTop: 16 }]}>
                    🏪 {t('home.nearbyRestaurants')}
                  </Text>
                </View>
              ) : null
            }
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/(customer)/restaurant/${item.id}`)}
                style={[
                  styles.restaurantRow,
                  { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg },
                ]}
              >
                <Image source={{ uri: item.image }} style={[styles.restImg, { borderRadius: theme.borderRadius.md }]} contentFit="cover" />
                <View style={styles.restInfo}>
                  <Text style={[styles.restName, { color: theme.colors.text }]} numberOfLines={1}>{item.name}</Text>
                  <View style={styles.restMeta}>
                    <Text style={{ fontSize: 12 }}>⭐ {item.rating}</Text>
                    <Text style={[{ fontSize: 12, color: theme.colors.textTertiary }]}>
                      🕐 {formatDeliveryTime(item.deliveryTime)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  chips: { marginVertical: 14, maxHeight: 40 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, gap: 6 },
  chipText: { fontSize: 13, fontWeight: '600' },
  menuSection: { marginBottom: 8 },
  sectionLabel: { fontSize: 14, fontWeight: '700', marginBottom: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 12, marginBottom: 8 },
  menuName: { fontSize: 14, fontWeight: '600' },
  menuDesc: { fontSize: 12, marginTop: 2 },
  menuPrice: { fontSize: 14, fontWeight: '700', marginLeft: 8 },
  restaurantRow: { flexDirection: 'row', padding: 12, gap: 12 },
  restImg: { width: 70, height: 70 },
  restInfo: { flex: 1, justifyContent: 'center' },
  restName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  restMeta: { flexDirection: 'row', gap: 12 },
});
