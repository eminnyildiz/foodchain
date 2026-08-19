import React from 'react';
import { View, Text, ScrollView, Switch, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../store/authStore';
import { useSettingsStore } from '../../../store/settingsStore';
import { Button } from '../../../components/ui/Button';
import { getInitials } from '../../../utils/helpers';

export default function RestaurantSettingsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { isDarkMode, toggleDarkMode, language, setLanguage } = useSettingsStore();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('restaurantPanel.restaurantSettings')}</Text>

        {/* Restaurant profile */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>{getInitials(user?.firstName || 'R')}</Text>
          </View>
          {/* Demo data - in production, fetch from store */}
          <Text style={[styles.restName, { color: theme.colors.text }]}>Kebapçı Mehmet Usta</Text>
          <Text style={[styles.restEmail, { color: theme.colors.textSecondary }]}>{user?.email}</Text>
        </View>

        {/* Settings */}
        <View style={[styles.card, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
            <Text style={{ fontSize: 18 }}>🌐</Text>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{t('profile.language')}</Text>
            <Button
              title={language === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}
              onPress={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              variant="ghost"
              size="sm"
            />
          </View>
          <View style={[styles.row, { borderBottomColor: theme.colors.border }]}>
            <Text style={{ fontSize: 18 }}>🌙</Text>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{t('profile.darkMode')}</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary + '60' }}
              thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
          <View style={styles.row}>
            <Text style={{ fontSize: 18 }}>ℹ️</Text>
            <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{t('profile.version')}</Text>
            <Text style={{ color: theme.colors.textTertiary }}>1.0.0</Text>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <Button title={t('profile.logout')} onPress={logout} variant="danger" fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 20 },
  card: { padding: 20, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  avatar: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  restName: { fontSize: 18, fontWeight: '700' },
  restEmail: { fontSize: 13, marginTop: 4 },
  row: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingVertical: 14, borderBottomWidth: 0.5, gap: 12 },
  rowLabel: { flex: 1, fontSize: 15 },
});
