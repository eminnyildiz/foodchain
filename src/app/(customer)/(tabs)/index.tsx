import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../store/authStore';
import { useCartStore } from '../../../store/cartStore';
import { demoRestaurants } from '../../../data/restaurants';
import { categories } from '../../../data/categories';
import { formatPrice, formatDeliveryTime } from '../../../utils/formatters';
import { getGreeting } from '../../../utils/helpers';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const cartCount = useCartStore((s) => s.getItemCount());

  const featured = demoRestaurants.slice(0, 5);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>
                {t(getGreeting())}, {user?.firstName || 'User'} 👋
              </Text>
              <Text style={styles.address}>
                📍 {user?.addresses?.[0]?.street || 'İstanbul, Türkiye'}
              </Text>
            </View>
            {cartCount > 0 && (
              <Pressable
                onPress={() => router.push('/(customer)/cart')}
                style={[styles.cartBtn, { backgroundColor: '#FFFFFF30' }]}
              >
                <Text style={{ fontSize: 20 }}>🛒</Text>
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              </Pressable>
            )}
          </View>
          {/* Search bar placeholder */}
          <Pressable
            onPress={() => router.push('/(customer)/(tabs)/search')}
            style={[styles.searchBtn, { backgroundColor: '#FFFFFF25', borderRadius: theme.borderRadius.full }]}
          >
            <Text style={{ fontSize: 14 }}>🔍</Text>
            <Text style={styles.searchText}>{t('home.searchPlaceholder')}</Text>
          </Pressable>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('home.categories')}
          </Text>
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 16 }}
            renderItem={({ item }) => (
              <Pressable
                style={styles.categoryItem}
                onPress={() => router.push(`/(customer)/(tabs)/search?category=${item.id}`)}
              >
                <View style={[styles.categoryCircle, { backgroundColor: theme.colors.surfaceVariant }]}>
                  <Text style={styles.categoryEmoji}>{item.icon}</Text>
                </View>
                <Text style={[styles.categoryName, { color: theme.colors.textSecondary }]}>
                  {item.name}
                </Text>
              </Pressable>
            )}
          />
        </View>

        {/* Featured */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            ⭐ {t('home.featured')}
          </Text>
          <FlatList
            data={featured}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 14 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => router.push(`/(customer)/restaurant/${item.id}`)}
                style={[
                  styles.featuredCard,
                  {
                    backgroundColor: theme.colors.surface,
                    borderRadius: theme.borderRadius.lg,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    elevation: 3,
                  },
                ]}
              >
                <Image
                  source={{ uri: item.coverImage }}
                  style={[styles.featuredImage, { borderTopLeftRadius: theme.borderRadius.lg, borderTopRightRadius: theme.borderRadius.lg }]}
                  contentFit="cover"
                />
                {item.deliveryFee === 0 && (
                  <View style={[styles.freeDeliveryBadge, { backgroundColor: theme.colors.accent }]}>
                    <Text style={styles.freeDeliveryText}>{t('home.freeDelivery')}</Text>
                  </View>
                )}
                <View style={styles.featuredInfo}>
                  <Text style={[styles.featuredName, { color: theme.colors.text }]} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <View style={styles.featuredMeta}>
                    <Text style={styles.ratingText}>⭐ {item.rating}</Text>
                    <Text style={[styles.metaText, { color: theme.colors.textTertiary }]}>
                      🕐 {item.deliveryTime}
                    </Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* Nearby Restaurants */}
        <View style={[styles.section, { paddingHorizontal: 16 }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text, paddingHorizontal: 0 }]}>
            📍 {t('home.nearbyRestaurants')}
          </Text>
          {demoRestaurants.map((restaurant) => (
            <Pressable
              key={restaurant.id}
              onPress={() => router.push(`/(customer)/restaurant/${restaurant.id}`)}
              style={({ pressed }) => [
                styles.restaurantRow,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.lg,
                  opacity: pressed ? 0.9 : 1,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  elevation: 2,
                },
              ]}
            >
              <Image
                source={{ uri: restaurant.coverImage }}
                style={[styles.restaurantImage, { borderRadius: theme.borderRadius.md }]}
                contentFit="cover"
              />
              <View style={styles.restaurantInfo}>
                <Text style={[styles.restaurantName, { color: theme.colors.text }]} numberOfLines={1}>
                  {restaurant.name}
                </Text>
                <Text style={[styles.restaurantDesc, { color: theme.colors.textTertiary }]} numberOfLines={1}>
                  {restaurant.description}
                </Text>
                <View style={styles.restaurantMeta}>
                  <Text style={styles.ratingText}>⭐ {restaurant.rating}</Text>
                  <Text style={[styles.metaDot, { color: theme.colors.textTertiary }]}>•</Text>
                  <Text style={[styles.metaText, { color: theme.colors.textTertiary }]}>
                    🕐 {restaurant.deliveryTime}
                  </Text>
                  <Text style={[styles.metaDot, { color: theme.colors.textTertiary }]}>•</Text>
                  <Text style={[styles.metaText, { color: theme.colors.textTertiary }]}>
                    {restaurant.deliveryFee === 0 ? '🆓' : `${formatPrice(restaurant.deliveryFee)}`}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 24, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  greeting: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  address: { color: '#FFFFFFCC', fontSize: 13, marginTop: 4 },
  cartBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  cartBadge: { position: 'absolute', top: -2, right: -2, backgroundColor: '#E74C3C', width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  cartBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  searchBtn: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 44, gap: 10 },
  searchText: { color: '#FFFFFF99', fontSize: 14 },
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '800', marginBottom: 14, paddingHorizontal: 16 },
  categoryItem: { alignItems: 'center', width: 68 },
  categoryCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  categoryEmoji: { fontSize: 26 },
  categoryName: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
  featuredCard: { width: width * 0.6, overflow: 'hidden' },
  featuredImage: { width: '100%', height: 120 },
  freeDeliveryBadge: { position: 'absolute', top: 8, left: 8, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  freeDeliveryText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  featuredInfo: { padding: 12 },
  featuredName: { fontSize: 15, fontWeight: '700', marginBottom: 6 },
  featuredMeta: { flexDirection: 'row', gap: 12 },
  ratingText: { fontSize: 12, fontWeight: '600' },
  metaText: { fontSize: 12 },
  restaurantRow: { flexDirection: 'row', padding: 12, marginBottom: 12, gap: 12 },
  restaurantImage: { width: 80, height: 80 },
  restaurantInfo: { flex: 1, justifyContent: 'center' },
  restaurantName: { fontSize: 15, fontWeight: '700', marginBottom: 3 },
  restaurantDesc: { fontSize: 12, marginBottom: 6 },
  restaurantMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaDot: { fontSize: 8 },
});
