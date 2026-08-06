import React, { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { demoOrders } from '../../../data/orders';
import { formatPrice } from '../../../utils/formatters';
import { Order, OrderStatus } from '../../../types';

const statusBadgeVariant: Record<OrderStatus, 'warning' | 'info' | 'primary' | 'success' | 'error'> = {
  pending: 'warning',
  confirmed: 'info',
  preparing: 'primary',
  onTheWay: 'info',
  delivered: 'success',
  cancelled: 'error',
};

const nextStatus: Record<string, OrderStatus> = {
  pending: 'confirmed',
  confirmed: 'preparing',
  preparing: 'onTheWay',
  onTheWay: 'delivered',
};

export default function RestaurantOrdersScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [filter, setFilter] = useState<'active' | 'completed'>('active');

  const filtered = filter === 'active'
    ? orders.filter((o) => !['delivered', 'cancelled'].includes(o.status))
    : orders.filter((o) => ['delivered', 'cancelled'].includes(o.status));

  const handleUpdateStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId && nextStatus[o.status]) {
          return { ...o, status: nextStatus[o.status], updatedAt: new Date().toISOString() };
        }
        return o;
      })
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{t('restaurantPanel.incomingOrders')}</Text>

      {/* Filter tabs */}
      <View style={styles.filterRow}>
        {(['active', 'completed'] as const).map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[
              styles.filterBtn,
              {
                backgroundColor: filter === f ? theme.colors.primary : theme.colors.surfaceVariant,
                borderRadius: theme.borderRadius.full,
              },
            ]}
          >
            <Text style={{ color: filter === f ? '#FFF' : theme.colors.text, fontWeight: '700', fontSize: 13 }}>
              {f === 'active' ? t('orders.activeOrders') : t('orders.pastOrders')}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.orderCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
            <View style={styles.orderHeader}>
              <Text style={[styles.orderNo, { color: theme.colors.text }]}>#{item.id}</Text>
              <Badge text={t(`orderStatus.${item.status}`)} variant={statusBadgeVariant[item.status]} />
            </View>
            <Text style={[styles.orderDetail, { color: theme.colors.textSecondary }]}>
              {item.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
            </Text>
            <View style={styles.orderFooter}>
              <Text style={[styles.orderTotal, { color: theme.colors.primary }]}>{formatPrice(item.totalAmount)}</Text>
              {nextStatus[item.status] && (
                <Button
                  title={t('restaurantPanel.updateStatus')}
                  onPress={() => handleUpdateStatus(item.id)}
                  size="sm"
                />
              )}
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  title: { fontSize: 24, fontWeight: '800', padding: 16, paddingBottom: 8 },
  filterRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, paddingBottom: 12 },
  filterBtn: { paddingHorizontal: 20, paddingVertical: 10 },
  list: { padding: 16, gap: 12 },
  orderCard: { padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderNo: { fontSize: 16, fontWeight: '700' },
  orderDetail: { fontSize: 13, lineHeight: 19, marginBottom: 12 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderTotal: { fontSize: 18, fontWeight: '800' },
});
