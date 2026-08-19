import React from 'react';
import { View, Text, ScrollView, Pressable, Switch, StyleSheet, Alert } from 'react-native';

import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../store/authStore';
import { useSettingsStore } from '../../../store/settingsStore';
import { Button } from '../../../components/ui/Button';
import { getInitials } from '../../../utils/helpers';

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
      style={[styles.settingRow, { borderBottomColor: theme.colors.border }]}
      disabled={!onPress && !right}
    >
      <Text style={{ fontSize: 20 }}>{icon}</Text>
      <Text style={[styles.settingLabel, { color: theme.colors.text }]}>{label}</Text>
      <View style={styles.settingRight}>
        {right || (onPress && <Text style={{ color: theme.colors.textTertiary, fontSize: 18 }}>›</Text>)}
      </View>
    </Pressable>
  );
};

export default function ProfileScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const { isDarkMode, toggleDarkMode, language, setLanguage, notificationsEnabled, toggleNotifications } = useSettingsStore();

  const initials = getInitials(`${user?.name || ''} ${user?.surname || ''}`);

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('profile.myProfile')}</Text>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <Text style={[styles.userName, { color: theme.colors.text }]}>
            {user?.name} {user?.surname}
          </Text>
          <Text style={[styles.userEmail, { color: theme.colors.textSecondary }]}>{user?.email}</Text>
        </View>

        {/* Settings */}
        <View style={[styles.settingsCard, { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg }]}>
          <SettingRow icon="📍" label={t('profile.myAddresses')} onPress={() => Alert.alert(t('common.info'), t('common.comingSoon'))} />
          <SettingRow
            icon="🌐"
            label={t('profile.language')}
            right={
              <Pressable
                onPress={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                style={[styles.langBtn, { backgroundColor: theme.colors.primary + '15', borderRadius: theme.borderRadius.sm }]}
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
          <SettingRow icon="ℹ️" label={t('profile.settings')} onPress={() => Alert.alert(t('common.info'), t('common.comingSoon'))} />
        </View>

        <View style={{ marginTop: 24 }}>
          <Button title={t('profile.logout')} onPress={logout} variant="danger" fullWidth />
        </View>

        <Text style={[styles.version, { color: theme.colors.textTertiary }]}>
          FoodChain v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 24 },
  avatarSection: { alignItems: 'center', marginBottom: 28 },
  avatar: { width: 80, height: 80, borderRadius: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { color: '#FFF', fontSize: 28, fontWeight: '800' },
  userName: { fontSize: 20, fontWeight: '700' },
  userEmail: { fontSize: 14, marginTop: 2 },
  settingsCard: { overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 },
  settingRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 0.5, gap: 12 },
  settingLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  settingRight: {},
  langBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  langText: { fontSize: 13, fontWeight: '700' },
  version: { textAlign: 'center', marginTop: 24, fontSize: 12 },
});
