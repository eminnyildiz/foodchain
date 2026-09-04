import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function ChangePasswordScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const changePassword = useAuthStore((s) => s.changePassword);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = t('validation.required');
    }
    if (!newPassword) {
      newErrors.newPassword = t('validation.required');
    } else if (newPassword.length < 6) {
      newErrors.newPassword = t('validation.passwordTooShort');
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = t('validation.required');
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordsDontMatch');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validate()) return;

    setLoading(true);
    const success = await changePassword(currentPassword, newPassword);
    setLoading(false);

    if (success) {
      Alert.alert(
        t('settings.passwordChanged'),
        t('settings.passwordChangedMessage'),
        [{ text: t('common.ok'), onPress: () => router.back() }],
      );
    } else {
      Alert.alert(t('common.error'), t('settings.passwordChangeError'));
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('settings.changePassword')}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
              },
            ]}
          >
            <Text style={{ fontSize: 40, textAlign: 'center', marginBottom: 8 }}>🔒</Text>
            <Text
              style={[styles.subtitle, { color: theme.colors.textSecondary }]}
            >
              {t('settings.changePassword')}
            </Text>

            <Input
              label={t('settings.currentPassword')}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              icon="🔑"
              error={errors.currentPassword}
            />

            <Input
              label={t('settings.newPassword')}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              icon="🔐"
              error={errors.newPassword}
            />

            <Input
              label={t('settings.confirmNewPassword')}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              icon="🔐"
              error={errors.confirmPassword}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title={t('common.save')}
            onPress={handleChangePassword}
            loading={loading}
            fullWidth
            size="lg"
          />
        </View>
      </KeyboardAvoidingView>
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
  scroll: { padding: 16, paddingBottom: 100 },
  card: {
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 24 },
  footer: { padding: 16, paddingBottom: 24 },
});
