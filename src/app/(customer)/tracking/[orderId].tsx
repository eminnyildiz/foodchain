import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { useOrderStore } from '../../../store/orderStore';
import { demoOrders } from '../../../data/orders';
import { formatPrice } from '../../../utils/formatters';
import { OrderStatus } from '../../../types';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const steps: { status: OrderStatus; icon: string; labelKey: string }[] = [
  { status: 'confirmed', icon: '✅', labelKey: 'orderStatus.confirmed' },
  { status: 'preparing', icon: '👨‍🍳', labelKey: 'orderStatus.preparing' },
  { status: 'onTheWay', icon: '🚴', labelKey: 'orderStatus.onTheWay' },
  { status: 'delivered', icon: '📦', labelKey: 'orderStatus.delivered' },
];

const statusOrder: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'onTheWay', 'delivered'];

export default function TrackingScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const storeOrders = useOrderStore((s) => s.orders);
  const updateStatus = useOrderStore((s) => s.updateOrderStatus);

  const order = storeOrders.find((o) => o.id === orderId) || demoOrders.find((o) => o.id === orderId);
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status || 'pending');

  // Simulate order progression
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!order || currentStatus === 'delivered' || currentStatus === 'cancelled') return;

    const progressionTimes: Record<string, number> = {
      pending: 5000,
      confirmed: 10000,
      preparing: 15000,
      onTheWay: 12000,
    };

    const delay = progressionTimes[currentStatus] || 10000;
    const timer = setTimeout(() => {
      const currentIdx = statusOrder.indexOf(currentStatus);
      if (currentIdx < statusOrder.length - 1) {
        const nextStatus = statusOrder[currentIdx + 1];
        setCurrentStatus(nextStatus);
        if (order && storeOrders.find((o) => o.id === orderId)) {
          updateStatus(orderId!, nextStatus);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [currentStatus]);

  if (!order) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
        <Text style={{ padding: 24, color: theme.colors.text }}>Order not found</Text>
      </SafeAreaView>
    );
  }

  const currentIdx = statusOrder.indexOf(currentStatus);
  const estimatedMin = currentStatus === 'delivered' ? 0 : Math.max(5, (order.estimatedDeliveryTime || 30) - currentIdx * 8);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('tracking.liveTracking')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Google Maps */}
        <View style={[styles.mapContainer, { borderRadius: theme.borderRadius.lg, overflow: 'hidden' }]}>
          <MapView
            style={styles.map}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
            initialRegion={{
              latitude: order.deliveryAddress.latitude || 41.0082,
              longitude: order.deliveryAddress.longitude || 28.9784,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            {/* Restaurant marker */}
            <Marker
              coordinate={{
                latitude: (order.deliveryAddress.latitude || 41.0082) + 0.005,
                longitude: (order.deliveryAddress.longitude || 28.9784) - 0.003,
              }}
              title={order.restaurantName}
              description={t('restaurant.restaurantInfo')}
            >
              <View style={styles.markerContainer}>
                <Text style={{ fontSize: 22 }}>🏪</Text>
              </View>
            </Marker>
            {/* Delivery address marker */}
            <Marker
              coordinate={{
                latitude: order.deliveryAddress.latitude || 41.0082,
                longitude: order.deliveryAddress.longitude || 28.9784,
              }}
              title={order.deliveryAddress.title}
              description={order.deliveryAddress.address}
            >
              <View style={styles.markerContainer}>
                <Text style={{ fontSize: 22 }}>📍</Text>
              </View>
            </Marker>
            {/* Courier marker (only when on the way) */}
            {currentStatus === 'onTheWay' && (
              <Marker
                coordinate={{
                  latitude: (order.deliveryAddress.latitude || 41.0082) + 0.002,
                  longitude: (order.deliveryAddress.longitude || 28.9784) - 0.001,
                }}
                title={t('tracking.courierOnTheWay')}
              >
                <View style={styles.markerContainer}>
                  <Text style={{ fontSize: 22 }}>🚴</Text>
                </View>
              </Marker>
            )}
          </MapView>
          {/* Status overlay on map */}
          <View style={styles.mapOverlay}>
            <Text style={[styles.mapOverlayText, { color: '#fff' }]}>
              {currentStatus === 'delivered' ? t('tracking.orderDelivered') : currentStatus === 'onTheWay' ? t('tracking.courierOnTheWay') : t('tracking.preparingOrder')}
            </Text>
          </View>
          {currentStatus !== 'delivered' && (
            <View style={[styles.etaBadge, { backgroundColor: theme.colors.primary, borderRadius: theme.borderRadius.full }]}>
              <Text style={styles.etaText}>~{estimatedMin} {t('tracking.minutes')}</Text>
            </View>
          )}
        </View>

        {/* Status Steps */}
        <View style={[styles.stepsCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          {steps.map((step, idx) => {
            const stepIdx = statusOrder.indexOf(step.status);
            const isActive = currentIdx >= stepIdx;
            const isCurrent = currentStatus === step.status;

            return (
              <View key={step.status} style={styles.stepRow}>
                <View style={styles.stepIndicator}>
                  <View
                    style={[
                      styles.stepDot,
                      {
                        backgroundColor: isActive ? theme.colors.primary : theme.colors.border,
                        borderWidth: isCurrent ? 3 : 0,
                        borderColor: theme.colors.primary + '40',
                        width: isCurrent ? 36 : 28,
                        height: isCurrent ? 36 : 28,
                        borderRadius: isCurrent ? 18 : 14,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: isCurrent ? 16 : 14 }}>{step.icon}</Text>
                  </View>
                  {idx < steps.length - 1 && (
                    <View
                      style={[
                        styles.stepLine,
                        { backgroundColor: isActive && currentIdx > stepIdx ? theme.colors.primary : theme.colors.border },
                      ]}
                    />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text
                    style={[
                      styles.stepLabel,
                      {
                        color: isActive ? theme.colors.text : theme.colors.textTertiary,
                        fontWeight: isCurrent ? '800' : '500',
                      },
                    ]}
                  >
                    {t(step.labelKey)}
                  </Text>
                  {isCurrent && (
                    <Text style={[styles.stepActive, { color: theme.colors.primary }]}>
                      {currentStatus === 'delivered' ? '🎉' : '⏳'}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Order details */}
        <View style={[styles.detailCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          <Text style={[styles.detailTitle, { color: theme.colors.text }]}>🏪 {order.restaurantName}</Text>
          {order.items.map((item, i) => (
            <View key={i} style={styles.detailRow}>
              <Text style={[styles.detailItem, { color: theme.colors.textSecondary }]}>
                {item.quantity}x {item.menuItem.name}
              </Text>
              <Text style={[styles.detailPrice, { color: theme.colors.text }]}>
                {formatPrice(item.menuItem.price * item.quantity)}
              </Text>
            </View>
          ))}
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <View style={styles.detailRow}>
            <Text style={[styles.totalLabel, { color: theme.colors.text }]}>{t('cart.total')}</Text>
            <Text style={[styles.totalValue, { color: theme.colors.primary }]}>{formatPrice(order.totalAmount)}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  title: { fontSize: 20, fontWeight: '800' },
  scroll: { padding: 16, gap: 16 },
  mapContainer: { height: 220, position: 'relative' },
  map: { ...StyleSheet.absoluteFill as any },
  mapOverlay: { position: 'absolute', top: 12, left: 12, backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  mapOverlayText: { fontSize: 13, fontWeight: '700' },
  markerContainer: { alignItems: 'center', justifyContent: 'center' },
  etaBadge: { position: 'absolute', bottom: 12, right: 12, paddingHorizontal: 16, paddingVertical: 8 },
  etaText: { color: '#FFF', fontWeight: '800', fontSize: 14 },
  stepsCard: { padding: 20 },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', minHeight: 56 },
  stepIndicator: { alignItems: 'center', width: 40 },
  stepDot: { alignItems: 'center', justifyContent: 'center' },
  stepLine: { width: 3, flex: 1, minHeight: 20, marginVertical: 4 },
  stepContent: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 12, paddingTop: 4, gap: 8 },
  stepLabel: { fontSize: 15 },
  stepActive: { fontSize: 14 },
  detailCard: { padding: 16 },
  detailTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  detailItem: { fontSize: 14 },
  detailPrice: { fontSize: 14, fontWeight: '600' },
  divider: { height: 1, marginVertical: 10 },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '800' },
});
