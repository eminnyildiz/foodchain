import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Modal } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { formatPrice } from '../../utils/formatters';

export default function CheckoutScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const cart = useCartStore();
  const user = useAuthStore((s) => s.user);
  const createOrder = useOrderStore((s) => s.createOrder);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Celebration animation values
  const celebrationScale = useSharedValue(0);
  const celebrationOpacity = useSharedValue(0);
  const celebrationRotate = useSharedValue(0);

  useEffect(() => {
    if (success) {
      // Reset then animate
      celebrationScale.value = 0;
      celebrationOpacity.value = 0;
      celebrationRotate.value = -15;

      celebrationOpacity.value = withTiming(1, { duration: 300 });
      celebrationScale.value = withSequence(
        withSpring(1.3, { damping: 4, stiffness: 200 }),
        withSpring(1, { damping: 8, stiffness: 150 }),
      );
      celebrationRotate.value = withSequence(
        withTiming(10, { duration: 150 }),
        withTiming(-10, { duration: 150 }),
        withTiming(5, { duration: 100 }),
        withTiming(0, { duration: 100 }),
      );
    }
  }, [success]);

  const celebrationStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: celebrationScale.value },
      { rotate: `${celebrationRotate.value}deg` },
    ],
    opacity: celebrationOpacity.value,
  }));

  const subtotal = cart.items.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);
  const deliveryFee = subtotal >= 150 ? 0 : subtotal >= 100 ? 5 : 10;
  const total = subtotal + deliveryFee;

  const formatCardInput = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryInput = (text: string) => {
    const cleaned = text.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    return cleaned;
  };

  const handlePlaceOrder = async () => {
    if (!cardNumber || !cardHolder || !expiry || !cvv) return;

    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));

    const address = user?.addresses?.[0] || {
      id: 'default',
      title: 'Ev',
      street: 'İstanbul, Türkiye',
      city: 'Istanbul',
      district: 'Merkez',
      postalCode: '34000',
      coordinates: { lat: 41.0082, lng: 28.9784 },
      isDefault: true,
    };

    const newOrder = createOrder({
      userId: user?.id || 'guest',
      restaurantId: cart.restaurantId || '',
      items: cart.items,
      subtotal,
      deliveryFee,
      total,
      deliveryAddress: address,
      paymentInfo: {
        method: 'credit_card',
        last4: cardNumber.slice(-4),
      },
      estimatedDeliveryTime: '30 min',
    });

    setOrderId(newOrder.id);
    cart.clearCart();
    setProcessing(false);
    setSuccess(true);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('checkout.title')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Address */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>📍 {t('checkout.deliveryAddress')}</Text>
          <Text style={[styles.addressText, { color: theme.colors.textSecondary }]}>
            {user?.addresses?.[0]?.title} - {user?.addresses?.[0]?.street || 'İstanbul, Türkiye'}
          </Text>
        </View>

        {/* Payment */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>💳 {t('checkout.paymentMethod')}</Text>
          <Input
            label={t('checkout.cardNumber')}
            value={cardNumber}
            onChangeText={(text) => setCardNumber(formatCardInput(text))}
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
          />
          <Input
            label={t('checkout.cardHolder')}
            value={cardHolder}
            onChangeText={setCardHolder}
            placeholder="AD SOYAD"
            autoCapitalize="characters"
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Input
                label={t('checkout.expiryDate')}
                value={expiry}
                onChangeText={(text) => setExpiry(formatExpiryInput(text))}
                placeholder="MM/YY"
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                label={t('checkout.cvv')}
                value={cvv}
                onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 3))}
                placeholder="123"
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>
        </View>

        {/* Summary */}
        <View style={[styles.section, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          <View style={styles.summaryRow}>
            <Text style={{ color: theme.colors.textSecondary }}>{t('cart.subtotal')}</Text>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ color: theme.colors.textSecondary }}>{t('cart.deliveryFee')}</Text>
            <Text style={{ color: theme.colors.text, fontWeight: '600' }}>
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

      <View style={styles.footer}>
        <Button
          title={t('checkout.placeOrder')}
          onPress={handlePlaceOrder}
          loading={processing}
          fullWidth
          size="lg"
        />
      </View>

      {/* Success Modal */}
      <Modal visible={success} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.xl }]}>
            <Animated.Text style={[styles.successIcon, celebrationStyle]}>🎉</Animated.Text>
            <Text style={[styles.successTitle, { color: theme.colors.text }]}>{t('checkout.orderPlaced')}</Text>
            <Text style={[styles.successMsg, { color: theme.colors.textSecondary }]}>{t('checkout.orderPlacedMessage')}</Text>
            <Button
              title={t('orders.track')}
              onPress={() => {
                setSuccess(false);
                router.replace(`/(customer)/tracking/${orderId}`);
              }}
              fullWidth
              size="lg"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 20, fontWeight: '800' },
  scroll: { padding: 16, paddingBottom: 100, gap: 16 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  addressText: { fontSize: 14, lineHeight: 20 },
  row: { flexDirection: 'row', gap: 12 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  divider: { height: 1, marginVertical: 8 },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '800' },
  footer: { padding: 16, paddingBottom: 24 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 24 },
  modalContent: { padding: 32, alignItems: 'center' },
  successIcon: { fontSize: 64, marginBottom: 16 },
  successTitle: { fontSize: 22, fontWeight: '800', marginBottom: 8 },
  successMsg: { fontSize: 14, textAlign: 'center', marginBottom: 24, lineHeight: 20 },
});
