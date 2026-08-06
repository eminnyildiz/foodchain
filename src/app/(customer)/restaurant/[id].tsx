import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert, Dimensions, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import AppMap, { MapMarkerProps } from '../../../components/Map';
import { useTheme } from '../../../hooks/useTheme';
import { useCartStore } from '../../../store/cartStore';
import { demoRestaurants } from '../../../data/restaurants';
import { getMenuItemsByRestaurant, getMenuCategories } from '../../../data/menuItems';
import { formatPrice, formatDeliveryTime } from '../../../utils/formatters';
import { Badge } from '../../../components/ui/Badge';
import { MenuItem } from '../../../types';

const { width } = Dimensions.get('window');

export default function RestaurantDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const cart = useCartStore();

  const restaurant = demoRestaurants.find((r) => r.id === id);
  const menuItems = getMenuItemsByRestaurant(id || '');
  const categories = getMenuCategories(id || '');
  const [activeCategory, setActiveCategory] = useState(categories[0] || '');

  if (!restaurant) return null;

  const filteredItems = activeCategory
    ? menuItems.filter((m) => m.category === activeCategory)
    : menuItems;

  const handleAddToCart = (item: MenuItem) => {
    if (cart.restaurantId && cart.restaurantId !== restaurant.id && cart.items.length > 0) {
      Alert.alert(
        t('cart.differentRestaurant'),
        t('cart.differentRestaurantMessage'),
        [
          { text: t('common.cancel'), style: 'cancel' },
          {
            text: t('common.confirm'),
            style: 'destructive',
            onPress: () => {
              cart.clearCart();
              cart.addItem(item, { id: restaurant.id, name: restaurant.name });
            },
          },
        ]
      );
    } else {
      cart.addItem(item, { id: restaurant.id, name: restaurant.name });
    }
  };

  const cartItemCount = cart.items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View>
          <Image source={{ uri: restaurant.coverImage }} style={styles.coverImage} contentFit="cover" />
          <Pressable
            onPress={() => router.back()}
            style={[styles.backBtn, { backgroundColor: theme.colors.surface }]}
          >
            <Text style={{ fontSize: 20 }}>←</Text>
          </Pressable>
        </View>

        {/* Restaurant Info */}
        <View style={[styles.infoCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.xl }]}>
          <Text style={[styles.name, { color: theme.colors.text }]}>{restaurant.name}</Text>
          <Text style={[styles.desc, { color: theme.colors.textSecondary }]}>{restaurant.description}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⭐</Text>
              <Text style={[styles.metaValue, { color: theme.colors.text }]}>{restaurant.rating}</Text>
              <Text style={[styles.metaLabel, { color: theme.colors.textTertiary }]}>({restaurant.reviewCount})</Text>
            </View>
            <View style={[styles.metaDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>🕐</Text>
              <Text style={[styles.metaValue, { color: theme.colors.text }]}>
                {formatDeliveryTime(restaurant.deliveryTime)}
              </Text>
            </View>
            <View style={[styles.metaDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>🚚</Text>
              <Text style={[styles.metaValue, { color: theme.colors.text }]}>
                {restaurant.deliveryFee === 0 ? t('common.free') || 'Ücretsiz' : formatPrice(restaurant.deliveryFee)}
              </Text>
            </View>
          </View>

          <Badge
            text={restaurant.isOpen ? (t('restaurant.open') || 'Açık') : (t('restaurant.closed') || 'Kapalı')}
            variant={restaurant.isOpen ? 'success' : 'error'}
          />
          
          {/* Restaurant Location Map */}
          <View style={styles.mapContainer}>
            <AppMap
              markers={[
                {
                  latitude: restaurant.latitude || 41.0082,
                  longitude: restaurant.longitude || 28.9784,
                  title: restaurant.name,
                  description: restaurant.address,
                },
              ]}
            />
          </View>
        </View>

        {/* Menu Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
        >
          {categories.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: activeCategory === cat ? theme.colors.primary : theme.colors.surfaceVariant,
                  borderRadius: theme.borderRadius.full,
                },
              ]}
            >
              <Text style={{ color: activeCategory === cat ? '#FFF' : theme.colors.text, fontWeight: '600', fontSize: 13 }}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View style={styles.menuList}>
          {filteredItems.map((item) => {
            const inCart = cart.items.find((c) => c.menuItem.id === item.id);
            return (
              <View
                key={item.id}
                style={[styles.menuCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}
              >
                {item.image && (
                  <Image source={{ uri: item.image }} style={[styles.menuImage, { borderRadius: theme.borderRadius.md }]} contentFit="cover" />
                )}
                <View style={styles.menuInfo}>
                  <Text style={[styles.menuName, { color: theme.colors.text }]}>{item.name}</Text>
                  <Text style={[styles.menuDesc, { color: theme.colors.textTertiary }]} numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View style={styles.menuBottom}>
                    <Text style={[styles.menuPrice, { color: theme.colors.primary }]}>{formatPrice(item.price)}</Text>
                    <Pressable
                      onPress={() => handleAddToCart(item)}
                      style={[styles.addBtn, { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.md }]}
                    >
                      <Text style={styles.addBtnText}>{inCart ? `${inCart.quantity}x ✓` : '+'}</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ height: cartItemCount > 0 ? 80 : 20 }} />
      </ScrollView>

      {/* Cart Bar */}
      {cartItemCount > 0 && (
        <Pressable
          onPress={() => router.push('/(customer)/cart')}
          style={[styles.cartBar, { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.lg }]}
        >
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
          </View>
          <Text style={styles.cartBarText}>{t('cart.myCart')}</Text>
          <Text style={styles.cartBarPrice}>{formatPrice(cartTotal)}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  coverImage: { width, height: 200 },
  backBtn: { position: 'absolute', top: 50, left: 16, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 4 },
  infoCard: { marginTop: -24, marginHorizontal: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  name: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  desc: { fontSize: 13, lineHeight: 19, marginBottom: 16 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  metaItem: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4 },
  metaIcon: { fontSize: 14 },
  metaValue: { fontSize: 14, fontWeight: '700' },
  metaLabel: { fontSize: 12 },
  metaDivider: { width: 1, height: 24 },
  checkoutTotalValue: { fontSize: 16, fontWeight: '800' },
  mapContainer: { height: 150, borderRadius: 12, overflow: 'hidden', marginTop: 16, position: 'relative' },
  map: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 },
  categoryScroll: { marginTop: 20, maxHeight: 40 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8 },
  menuList: { padding: 16, gap: 12 },
  menuCard: { flexDirection: 'row', padding: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  menuImage: { width: 80, height: 80 },
  menuInfo: { flex: 1 },
  menuName: { fontSize: 15, fontWeight: '700', marginBottom: 4 },
  menuDesc: { fontSize: 12, lineHeight: 17, marginBottom: 8 },
  menuBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  menuPrice: { fontSize: 16, fontWeight: '800' },
  addBtn: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  addBtnText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  cartBar: { position: 'absolute', bottom: 20, left: 16, right: 16, flexDirection: 'row', alignItems: 'center', padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 8 },
  cartBadge: { backgroundColor: '#FFFFFF30', width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  cartBadgeText: { color: '#FFF', fontWeight: '800', fontSize: 13 },
  cartBarText: { flex: 1, color: '#FFF', fontSize: 16, fontWeight: '700' },
  cartBarPrice: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});
