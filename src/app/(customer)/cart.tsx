import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useTheme } from '../../hooks/useTheme';
import { useCartStore } from '../../store/cartStore';
import { QuantitySelector } from '../../components/ui/QuantitySelector';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { formatPrice } from '../../utils/formatters';

export default function CartScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { items, updateQuantity, removeItem, clearCart, restaurantName } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);
  const deliveryFee = subtotal >= 150 ? 0 : subtotal >= 100 ? 5 : 10;
  const total = subtotal + deliveryFee;

  if (items.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
        <View style={styles.headerRow}>
          <Pressable onPress={() => router.back()}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>
          <Text style={[styles.title, { color: theme.colors.text }]}>{t('cart.myCart')}</Text>
          <View style={{ width: 24 }} />
        </View>
        <EmptyState icon="🛒" title={t('cart.empty')} subtitle={t('cart.emptyMessage')} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('cart.myCart')}</Text>
        <Pressable onPress={clearCart}>
          <Text style={{ color: theme.colors.error, fontSize: 13, fontWeight: '600' }}>{t('cart.clearCart')}</Text>
        </Pressable>
      </View>

      {/* Restaurant name */}
      <Text style={[styles.restName, { color: theme.colors.textSecondary }]}>🏪 {restaurantName}</Text>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Items */}
        {items.map((cartItem) => (
          <View
            key={cartItem.menuItem.id}
            style={[styles.itemCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}
          >
            {cartItem.menuItem.image && (
              <Image source={{ uri: cartItem.menuItem.image }} style={[styles.itemImg, { borderRadius: theme.borderRadius.md }]} contentFit="cover" />
            )}
            <View style={styles.itemInfo}>
              <View style={styles.itemTop}>
                <Text style={[styles.itemName, { color: theme.colors.text }]} numberOfLines={1}>
                  {cartItem.menuItem.name}
                </Text>
                <Pressable onPress={() => removeItem(cartItem.menuItem.id)} hitSlop={8}>
                  <Text style={{ color: theme.colors.error, fontSize: 16 }}>✕</Text>
                </Pressable>
              </View>
              <Text style={[styles.itemPrice, { color: theme.colors.primary }]}>
                {formatPrice(cartItem.menuItem.price * cartItem.quantity)}
              </Text>
              <QuantitySelector
                quantity={cartItem.quantity}
                onIncrease={() => updateQuantity(cartItem.menuItem.id, cartItem.quantity + 1)}
                onDecrease={() => {
                  if (cartItem.quantity <= 1) {
                    removeItem(cartItem.menuItem.id);
                  } else {
                    updateQuantity(cartItem.menuItem.id, cartItem.quantity - 1);
                  }
                }}
              />
            </View>
          </View>
        ))}

        {/* Summary */}
        <View style={[styles.summary, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>{t('cart.subtotal')}</Text>
            <Text style={[styles.summaryValue, { color: theme.colors.text }]}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryLabel, { color: theme.colors.textSecondary }]}>{t('cart.deliveryFee')}</Text>
            <Text style={[styles.summaryValue, { color: deliveryFee === 0 ? theme.colors.success : theme.colors.text }]}>
              {deliveryFee === 0 ? t('common.free') : formatPrice(deliveryFee)}
            </Text>
          </View>
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.summaryRow}>
            <Text style={[styles.totalLabel, { color: theme.colors.text }]}>{t('cart.total')}</Text>
            <Text style={[styles.totalValue, { color: theme.colors.primary }]}>{formatPrice(total)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutBar}>
        <Button
          title={`${t('cart.checkout')} • ${formatPrice(total)}`}
          onPress={() => router.push('/(customer)/checkout')}
          fullWidth
          size="lg"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 20, fontWeight: '800' },
  restName: { paddingHorizontal: 16, fontSize: 13, marginBottom: 12 },
  scroll: { paddingHorizontal: 16, paddingBottom: 100 },
  itemCard: { flexDirection: 'row', padding: 12, marginBottom: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3, elevation: 1 },
  itemImg: { width: 70, height: 70 },
  itemInfo: { flex: 1, gap: 6 },
  itemTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  itemName: { fontSize: 14, fontWeight: '700', flex: 1, marginRight: 8 },
  itemPrice: { fontSize: 15, fontWeight: '800' },
  summary: { padding: 16, marginTop: 8 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14 },
  summaryValue: { fontSize: 14, fontWeight: '600' },
  divider: { height: 1, marginVertical: 8 },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '800' },
  checkoutBar: { padding: 16, paddingBottom: 24 },
});
