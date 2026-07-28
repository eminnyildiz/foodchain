import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';
import { useOrderStore } from '../../../store/orderStore';

export default function CustomerTabsLayout() {
  const theme = useTheme();
  const { t } = useTranslation();
  const orders = useOrderStore((s) => s.orders);
  const activeCount = orders.filter(
    (o) => !['delivered', 'cancelled'].includes(o.status)
  ).length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.border,
          borderTopWidth: 0.5,
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home.greeting'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🏠</Text>,
          tabBarLabel: t('home.greeting'),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: t('common.search'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🔍</Text>,
          tabBarLabel: t('common.search'),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: t('orders.myOrders'),
          tabBarIcon: ({ color }) => (
            <View>
              <Text style={{ fontSize: 22, color }}>📋</Text>
              {activeCount > 0 && (
                <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
                  <Text style={styles.badgeText}>{activeCount}</Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: t('orders.myOrders'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile.myProfile'),
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>👤</Text>,
          tabBarLabel: t('profile.myProfile'),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
});
