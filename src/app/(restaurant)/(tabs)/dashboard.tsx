import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../store/authStore';
import { demoOrders } from '../../../data/orders';
import { formatPrice } from '../../../utils/formatters';
import { Card } from '../../../components/ui/Card';

export default function DashboardScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);

  const todayOrders = demoOrders.filter((o) => o.status !== 'cancelled');
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrders = demoOrders.filter((o) => !['delivered', 'cancelled'].includes(o.status));

  const StatCard = ({ icon, label, value, color }: { icon: string; label: string; value: string; color: string }) => (
    <View style={[styles.statCard, { backgroundColor: color + '12', borderRadius: theme.borderRadius.lg }]}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>{label}</Text>
    </View>
  );

  // Weekly mock data
  const weekDays = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
  const weekData = [12, 18, 15, 22, 28, 35, 20];
  const maxVal = Math.max(...weekData);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.greeting, { color: theme.colors.text }]}>
          {t('home.greeting')}, {user?.name || 'Restoran'} 👋
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {t('restaurantPanel.dashboard')}
        </Text>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <StatCard icon="📦" label={t('restaurantPanel.todayOrders')} value={`${todayOrders.length}`} color={theme.colors.primary} />
          <StatCard icon="💰" label={t('restaurantPanel.todayRevenue')} value={formatPrice(todayRevenue)} color={theme.colors.success} />
          <StatCard icon="🔴" label={t('restaurantPanel.activeOrders')} value={`${activeOrders.length}`} color={theme.colors.warning} />
          <StatCard icon="📊" label={t('restaurantPanel.totalRevenue')} value={formatPrice(todayRevenue * 7)} color={theme.colors.info} />
        </View>

        {/* Weekly Chart */}
        <Card variant="elevated" style={{ marginTop: 16 }}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
            📈 {t('restaurantPanel.weeklyStats')}
          </Text>
          <View style={styles.chart}>
            {weekDays.map((day, i) => (
              <View key={day} style={styles.chartCol}>
                <Text style={[styles.chartValue, { color: theme.colors.textTertiary }]}>{weekData[i]}</Text>
                <View
                  style={[
                    styles.chartBar,
                    {
                      height: (weekData[i] / maxVal) * 100,
                      backgroundColor: theme.colors.primary,
                      borderRadius: theme.borderRadius.sm,
                    },
                  ]}
                />
                <Text style={[styles.chartDay, { color: theme.colors.textSecondary }]}>{day}</Text>
              </View>
            ))}
          </View>
        </Card>

        {/* Recent orders */}
        <Card variant="elevated" style={{ marginTop: 16 }}>
          <Text style={[styles.chartTitle, { color: theme.colors.text }]}>
            🕐 {t('restaurantPanel.incomingOrders')}
          </Text>
          {demoOrders.slice(0, 3).map((order) => (
            <View key={order.id} style={[styles.orderRow, { borderBottomColor: theme.colors.border }]}>
              <View>
                <Text style={[styles.orderName, { color: theme.colors.text }]}>#{order.id}</Text>
                <Text style={[styles.orderItems, { color: theme.colors.textTertiary }]}>
                  {order.items.length} {t('cart.itemCount')}
                </Text>
              </View>
              <Text style={[styles.orderAmount, { color: theme.colors.primary }]}>{formatPrice(order.totalAmount)}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 24 },
  greeting: { fontSize: 24, fontWeight: '800' },
  subtitle: { fontSize: 14, marginTop: 4, marginBottom: 20 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: { width: '47%', padding: 16, alignItems: 'center' },
  statIcon: { fontSize: 28, marginBottom: 8 },
  statValue: { fontSize: 22, fontWeight: '800', marginBottom: 4 },
  statLabel: { fontSize: 12, textAlign: 'center' },
  chartTitle: { fontSize: 16, fontWeight: '700', marginBottom: 16 },
  chart: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 140, paddingTop: 20 },
  chartCol: { alignItems: 'center', flex: 1 },
  chartValue: { fontSize: 10, marginBottom: 4 },
  chartBar: { width: 20, minHeight: 4 },
  chartDay: { fontSize: 11, marginTop: 6 },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 0.5 },
  orderName: { fontSize: 14, fontWeight: '600' },
  orderItems: { fontSize: 12, marginTop: 2 },
  orderAmount: { fontSize: 15, fontWeight: '700' },
});
