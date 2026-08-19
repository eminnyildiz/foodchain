import React, { useState, useMemo, useCallback } from 'react';
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
import { formatPrice } from '../../../utils/formatters';
import { useReviewStore } from '../../../store/reviewStore';
import { Restaurant, MenuItem } from '../../../types';

type SortOption = 'default' | 'rating' | 'deliveryTime' | 'deliveryFee';

/**
 * Simple fuzzy match: checks if all characters of the query appear
 * in order within the target string (case-insensitive).
 */
function fuzzyMatch(target: string, query: string): boolean {
  const lower = target.toLowerCase();
  const q = query.toLowerCase();
  let qi = 0;
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

/**
 * Calculates a relevance score for sorting fuzzy results.
 * Lower score = better match. Exact substring match gets highest priority.
 */
function fuzzyScore(target: string, query: string): number {
  const lower = target.toLowerCase();
  const q = query.toLowerCase();
  // Exact substring match — best
  if (lower.includes(q)) return 0;
  // Starts with — very good
  if (lower.startsWith(q)) return 1;
  // Character-order match — decent (score by gap count)
  let qi = 0;
  let gaps = 0;
  for (let i = 0; i < lower.length && qi < q.length; i++) {
    if (lower[i] === q[qi]) {
      qi++;
    } else if (qi > 0) {
      gaps++;
    }
  }
  return 2 + gaps;
}

export default function SearchScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const reviewStore = useReviewStore();
  const { category } = useLocalSearchParams<{ category?: string }>();

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category || null);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleQueryChange = useCallback((text: string) => {
    setQuery(text);
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => setDebouncedQuery(text), 300);
    setDebounceTimer(timer);
  }, [debounceTimer]);

  const sortOptions: { key: SortOption; label: string }[] = [
    { key: 'default', label: t('common.default') || 'Varsayılan' },
    { key: 'rating', label: '⭐ ' + (t('restaurant.rating') || 'Puan') },
    { key: 'deliveryTime', label: '🕐 ' + (t('restaurant.deliveryTime') || 'Süre') },
    { key: 'deliveryFee', label: '🚚 ' + (t('restaurant.deliveryFee') || 'Ücret') },
  ];

  const sortRestaurants = useCallback((restaurants: Restaurant[]): Restaurant[] => {
    const sorted = [...restaurants];
    switch (sortBy) {
      case 'rating': {
        return sorted.sort((a, b) => {
          const ratingA = reviewStore.getAverageRating(a.id) || a.rating;
          const ratingB = reviewStore.getAverageRating(b.id) || b.rating;
          return ratingB - ratingA;
        });
      }
      case 'deliveryTime': {
        return sorted.sort((a, b) => {
          const timeA = parseInt(a.deliveryTime) || 999;
          const timeB = parseInt(b.deliveryTime) || 999;
          return timeA - timeB;
        });
      }
      case 'deliveryFee':
        return sorted.sort((a, b) => a.deliveryFee - b.deliveryFee);
      default:
        return sorted;
    }
  }, [sortBy, reviewStore]);

  const { filteredRestaurants, matchingMenuItems } = useMemo(() => {
    const q = debouncedQuery.trim();

    let restaurants = demoRestaurants.filter((r) => {
      const matchesQuery = !q || fuzzyMatch(r.name, q) || fuzzyMatch(r.description, q);
      const matchesCat = !selectedCategory || r.categories.includes(selectedCategory);
      return matchesQuery && matchesCat;
    });

    // Sort by fuzzy relevance when query is active, then apply user sort
    if (q) {
      restaurants.sort((a, b) => {
        const scoreA = Math.min(fuzzyScore(a.name, q), fuzzyScore(a.description, q));
        const scoreB = Math.min(fuzzyScore(b.name, q), fuzzyScore(b.description, q));
        return scoreA - scoreB;
      });
    }

    restaurants = sortRestaurants(restaurants);

    const menuItems = q
      ? demoMenuItems
          .filter((m) => fuzzyMatch(m.name, q) || fuzzyMatch(m.description, q))
          .sort((a, b) => fuzzyScore(a.name, q) - fuzzyScore(b.name, q))
      : [];

    return { filteredRestaurants: restaurants, matchingMenuItems: menuItems };
  }, [debouncedQuery, selectedCategory, sortRestaurants]);

  const renderMenuItem = (item: MenuItem) => (
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
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('common.search')}</Text>
        <SearchBar
          value={query}
          onChangeText={handleQueryChange}
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
                {item.name}
              </Text>
            </Pressable>
          )}
        />

        {/* Sort options */}
        <FlatList
          data={sortOptions}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          style={styles.sortBar}
          contentContainerStyle={{ gap: 6 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSortBy(item.key)}
              style={[
                styles.sortChip,
                {
                  backgroundColor: sortBy === item.key ? theme.colors.accent : 'transparent',
                  borderColor: sortBy === item.key ? theme.colors.accent : theme.colors.border,
                  borderRadius: theme.borderRadius.full,
                },
              ]}
            >
              <Text
                style={[
                  styles.sortChipText,
                  { color: sortBy === item.key ? '#FFF' : theme.colors.textSecondary },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />

        {/* Results */}
        {filteredRestaurants.length === 0 && matchingMenuItems.length === 0 ? (
          <EmptyState icon="🔍" title={t('common.noResults')} />
        ) : (
          <FlatList
            data={filteredRestaurants}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
            ListHeaderComponent={
              matchingMenuItems.length > 0 ? (
                <View style={styles.menuSection}>
                  <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary }]}>
                    🍽️ {t('restaurant.menu')} ({matchingMenuItems.length})
                  </Text>
                  {matchingMenuItems.slice(0, 5).map(renderMenuItem)}
                  <Text style={[styles.sectionLabel, { color: theme.colors.textSecondary, marginTop: 16 }]}>
                    🏪 {t('home.nearbyRestaurants')} ({filteredRestaurants.length})
                  </Text>
                </View>
              ) : null
            }
            renderItem={({ item }) => {
              const liveRating = reviewStore.getAverageRating(item.id) || item.rating;
              const liveReviewCount = reviewStore.getReviewCount(item.id) || item.reviewCount;
              return (
                <Pressable
                  onPress={() => router.push(`/(customer)/restaurant/${item.id}`)}
                  style={[
                    styles.restaurantRow,
                    { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg },
                  ]}
                >
                  <Image source={{ uri: item.coverImage }} style={[styles.restImg, { borderRadius: theme.borderRadius.md }]} contentFit="cover" />
                  <View style={styles.restInfo}>
                    <Text style={[styles.restName, { color: theme.colors.text }]} numberOfLines={1}>{item.name}</Text>
                    <View style={styles.restMeta}>
                      <Text style={{ fontSize: 12 }}>⭐ {liveRating} ({liveReviewCount})</Text>
                      <Text style={[{ fontSize: 12, color: theme.colors.textTertiary }]}>
                        🕐 {item.deliveryTime}
                      </Text>
                      <Text style={[{ fontSize: 12, color: theme.colors.textTertiary }]}>
                        🚚 {item.deliveryFee === 0 ? (t('common.free') || 'Ücretsiz') : formatPrice(item.deliveryFee)}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }}
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
  chips: { marginTop: 14, maxHeight: 40 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, paddingVertical: 8, gap: 6 },
  chipText: { fontSize: 13, fontWeight: '600' },
  sortBar: { marginTop: 10, marginBottom: 14, maxHeight: 36 },
  sortChip: { borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6 },
  sortChipText: { fontSize: 12, fontWeight: '600' },
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
  restMeta: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
});
