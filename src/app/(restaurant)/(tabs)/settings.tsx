import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../../hooks/useTheme';
import { useAuthStore } from '../../../store/authStore';
import { useSettingsStore } from '../../../store/settingsStore';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
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
      style={[styles.row, { borderBottomColor: theme.colors.border }]}
      disabled={!onPress && !right}
    >
      <Text style={{ fontSize: 18 }}>{icon}</Text>
      <Text style={[styles.rowLabel, { color: theme.colors.text }]}>{label}</Text>
      <View style={styles.rowRight}>
        {right ||
          (onPress && (
            <Text style={{ color: theme.colors.textTertiary, fontSize: 18 }}>›</Text>
          ))}
      </View>
    </Pressable>
  );
};

export default function RestaurantSettingsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const changePassword = useAuthStore((s) => s.changePassword);
  const {
    isDarkMode,
    toggleDarkMode,
    language,
    setLanguage,
    notificationsEnabled,
    toggleNotifications,
  } = useSettingsStore();

  // Change password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  const handleChangePassword = async () => {
    const errs: Record<string, string> = {};
    if (!currentPassword) errs.currentPassword = t('validation.required');
    if (!newPassword) errs.newPassword = t('validation.required');
    else if (newPassword.length < 6) errs.newPassword = t('validation.passwordTooShort');
    if (!confirmPassword) errs.confirmPassword = t('validation.required');
    else if (newPassword !== confirmPassword) errs.confirmPassword = t('validation.passwordsDontMatch');
    setPasswordErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setPasswordLoading(true);
    const success = await changePassword(currentPassword, newPassword);
    setPasswordLoading(false);

    if (success) {
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordErrors({});
      Alert.alert(t('settings.passwordChanged'), t('settings.passwordChangedMessage'));
    } else {
      Alert.alert(t('common.error'), t('settings.passwordChangeError'));
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('restaurantPanel.restaurantSettings')}
        </Text>

        {/* Restaurant profile */}
        <View
          style={[
            styles.card,
            { backgroundColor: theme.colors.surface, borderRadius: theme.borderRadius.lg },
          ]}
        >
          <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.avatarText}>{getInitials(user?.firstName || 'R')}</Text>
          </View>
          <Text style={[styles.restName, { color: theme.colors.text }]}>
            Kebapçı Mehmet Usta
          </Text>
          <Text style={[styles.restEmail, { color: theme.colors.textSecondary }]}>
            {user?.email}
          </Text>
        </View>

        {/* Account */}
        <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>
          {t('settings.account')}
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.lg,
              padding: 0,
            },
          ]}
        >
          <SettingRow
            icon="🔒"
            label={t('settings.changePassword')}
            onPress={() => setShowPasswordModal(true)}
          />
        </View>

        {/* Preferences */}
        <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>
          {t('settings.preferences')}
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.lg,
              padding: 0,
            },
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
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary + '60',
                }}
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
                trackColor={{
                  false: theme.colors.border,
                  true: theme.colors.primary + '60',
                }}
                thumbColor={notificationsEnabled ? theme.colors.primary : '#f4f3f4'}
              />
            }
          />
        </View>

        {/* About */}
        <Text style={[styles.sectionHeader, { color: theme.colors.textSecondary }]}>
          {t('settings.about')}
        </Text>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderRadius: theme.borderRadius.lg,
              padding: 0,
            },
          ]}
        >
          <SettingRow
            icon="ℹ️"
            label={t('profile.version')}
            right={<Text style={{ color: theme.colors.textTertiary }}>1.0.0</Text>}
          />
        </View>

        <View style={{ marginTop: 24 }}>
          <Button title={t('profile.logout')} onPress={logout} variant="danger" fullWidth />
        </View>
      </ScrollView>

      {/* Change Password Modal */}
      <Modal visible={showPasswordModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.xl,
              },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
              🔒 {t('settings.changePassword')}
            </Text>

            <Input
              label={t('settings.currentPassword')}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              error={passwordErrors.currentPassword}
            />
            <Input
              label={t('settings.newPassword')}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              error={passwordErrors.newPassword}
            />
            <Input
              label={t('settings.confirmNewPassword')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              error={passwordErrors.confirmPassword}
            />

            <View style={styles.modalActions}>
              <Button
                title={t('common.cancel')}
                onPress={() => {
                  setShowPasswordModal(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                  setPasswordErrors({});
                }}
                variant="ghost"
                size="lg"
              />
              <Button
                title={t('common.save')}
                onPress={handleChangePassword}
                loading={passwordLoading}
                size="lg"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  scroll: { padding: 16, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 20 },
  card: {
    padding: 20,
    marginBottom: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  restName: { fontSize: 18, fontWeight: '700' },
  restEmail: { fontSize: 13, marginTop: 4 },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    gap: 12,
  },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: '500' },
  rowRight: {},
  langBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  langText: { fontSize: 13, fontWeight: '700' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: { padding: 24 },
  modalTitle: { fontSize: 18, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 8,
  },
});
