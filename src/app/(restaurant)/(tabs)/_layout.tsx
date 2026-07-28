import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../hooks/useTheme';

export default function RestaurantTabsLayout() {
  const theme = useTheme();
  const { t } = useTranslation();

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
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textTertiary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>📊</Text>,
          tabBarLabel: t('restaurantPanel.dashboard'),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>📋</Text>,
          tabBarLabel: t('restaurantPanel.incomingOrders'),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>🍽️</Text>,
          tabBarLabel: t('restaurantPanel.menuManagement'),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 22, color }}>⚙️</Text>,
          tabBarLabel: t('restaurantPanel.restaurantSettings'),
        }}
      />
    </Tabs>
  );
}
