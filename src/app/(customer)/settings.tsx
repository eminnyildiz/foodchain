import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { useSettingsStore } from '../../store/settingsStore';
import { Button } from '../../components/ui/Button';

const SettingRow = ({
  icon,
  label,
  right,
  onPress,
}: {
  icon: string;
  label: string;
  right?: React.ReactNode;
  onPress?: () => void;
}) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { borderBottomColor: theme.colors.border }]}
      disabled={!onPress && !right}
    >
      <Text style={{ fontSize: 20 }}>{icon}</Text>
      <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{label}</Text>
      <View style={styles.rowRight}>
        {right || (onPress && <Text style={{ color: theme.colors.textTertiary, fontSize: 18 }}>›</Text>)}
      </View>
    </Pressable>
  );
};

export default function CustomerSettingsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const logout = useAuthStore((s) => s.logout);
  const {
    isDarkMode,
    toggleDarkMode,
    language,
    setLanguage,
    notificationsEnabled,
    toggleNotifications,
  } = useSettingsStore();

  const handleDeleteAccount = () => {
    Alert.alert(
      t('profile.deleteAccount'),
      t('common.confirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => {
            // Demo: just logout
            logout();
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('profile.settings')}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Account Section */}
        <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>
          {t('settings.account')}
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg },
          ]}
        >
          <SettingRow
            icon="📍"
            label={t('profile.myAddresses')}
            onPress={() => router.push('/(customer)/addresses')}
          />
          <SettingRow
            icon="🔒"
            label={t('settings.changePassword')}
            onPress={() => router.push('/(customer)/change-password')}
          />
          <SettingRow
            icon="✏️"
            label={t('profile.editProfile')}
            onPress={() => Alert.alert(t('common.info'), t('common.comingSoon'))}
          />
        </View>

        {/* Preferences Section */}
        <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>
          {t('settings.preferences')}
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg },
          ]}
        >
          <SettingRow
            icon="🌐"
            label={t('profile.language')}
            right={
              <Pressable
                onPress={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                style={[
                  styles.langBtn,
                  { backgroundColor: theme.colors.primary + '15', borderRadius: 6 },
                ]}
              >
                <Text style={[styles.langText, { color: theme.colors.primary }]}>
                  {language === 'tr' ? '🇹🇷 TR' : '🇬🇧 EN'}
                </Text>
              </Pressable>
            }
          />
          <SettingRow
            icon="🌙"
            label={t('profile.darkMode')}
            right={
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary + '60' }}
                thumbColor={isDarkMode ? theme.colors.primary : '#f4f3f4'}
              />
            }
          />
          <SettingRow
            icon="🔔"
            label={t('profile.notifications')}
            right={
              <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary + '60' }}
                thumbColor={notificationsEnabled ? theme.colors.primary : '#f4f3f4'}
              />
            }
          />
        </View>

        {/* About Section */}
        <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>
          {t('settings.about')}
        </Text>
        <View
          style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg },
          ]}
        >
          <SettingRow
            icon="ℹ️"
            label={t('profile.version')}
            right={<Text style={{ color: theme.colors.textTertiary }}>1.0.0</Text>}
          />
        </View>

        {/* Danger Zone */}
        <View style={{ marginTop: 24, gap: 12 }}>
          <Button
            title={t('profile.deleteAccount')}
            onPress={handleDeleteAccount}
            variant="danger"
            fullWidth
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: { fontSize: 20, fontWeight: '800' },
  scroll: { padding: 16, paddingBottom: 40 },
  sectionHeader: { fontSize: 13, fontWeight: '700', marginBottom: 8, marginTop: 16, textTransform: 'uppercase', letterSpacing: 0.5 },
  card: {
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  rowRight: {},
  langBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  langText: { fontSize: 13, fontWeight: '700' },
});
