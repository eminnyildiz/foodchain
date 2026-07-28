import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useTheme } from '../../../hooks/useTheme';
import { useOrderStore } from '../../../store/orderStore';
import { Badge } from '../../../components/ui/Badge';
import { EmptyState } from '../../../components/ui/EmptyState';
import { formatPrice } from '../../../utils/formatters';
import { demoOrders } from '../../../data/orders';
import { Order, OrderStatus } from '../../../types';

const statusBadgeVariant: Record<OrderStatus, 'warning' | 'info' | 'primary' | 'success' | 'error'> = {
  pending: 'warning',
  confirmed: 'info',
  preparing: 'primary',
  onTheWay: 'info',
  delivered: 'success',
  cancelled: 'error',
};

export default function OrdersScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const storeOrders = useOrderStore((s) => s.orders);

  const allOrders = [...storeOrders, ...demoOrders.filter((d) => !storeOrders.find((s) => s.id === d.id))];
  const active = allOrders.filter((o) => !['delivered', 'cancelled'].includes(o.status));
  const past = allOrders.filter((o) => ['delivered', 'cancelled'].includes(o.status));

  const renderOrder = (order: Order) => (
    <Pressable
      key={order.id}
      onPress={() => {
        router.push(`/(customer)/tracking/${order.id}`);
      }}
      style={[
        styles.orderCard,
        { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg },
      ]}
    >
      <Image
        source={{ uri: order.restaurantImage || 'https://picsum.photos/seed/default/100/100' }}
        style={[styles.orderImg, { borderRadius: theme.borderRadius.md }]}
        contentFit="cover"
      />
      <View style={styles.orderInfo}>
        <Text style={[styles.orderName, { color: theme.colors.text }]}>{order.restaurantName}</Text>
        <Text style={[styles.orderMeta, { color: theme.colors.textTertiary }]}>
          {order.items.length} {t('cart.itemCount')} • {formatPrice(order.totalAmount)}
        </Text>
        <Text style={[styles.orderDate, { color: theme.colors.textTertiary }]}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Badge text={t(`orderStatus.${order.status}`)} variant={statusBadgeVariant[order.status]} />
    </Pressable>
  );

  if (allOrders.length === 0) {
    return (
      <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
        <EmptyState
          icon="📋"
          title={t('orders.noOrders')}
          subtitle={t('orders.noOrdersMessage')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={[]}
        renderItem={null}
        keyExtractor={() => 'dummy'}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <Text style={[styles.title, { color: theme.colors.text }]}>{t('orders.myOrders')}</Text>

            {active.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                  🔴 {t('orders.activeOrders')} ({active.length})
                </Text>
                {active.map(renderOrder)}
              </>
            )}

            {past.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { color: theme.colors.textSecondary, marginTop: 20 }]}>
                  {t('orders.pastOrders')}
                </Text>
                {past.map(renderOrder)}
              </>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  list: { padding: 16 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  orderCard: { flexDirection: 'row', padding: 12, marginBottom: 12, alignItems: 'center', gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  orderImg: { width: 56, height: 56 },
  orderInfo: { flex: 1 },
  orderName: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  orderMeta: { fontSize: 12, marginBottom: 2 },
  orderDate: { fontSize: 11 },
});
