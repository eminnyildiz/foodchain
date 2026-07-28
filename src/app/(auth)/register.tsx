import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { UserRole } from '../../types';

export default function RegisterScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { register, isLoading } = useAuthStore();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name) e.name = t('validation.required');
    if (!email) e.email = t('validation.required');
    if (!password) e.password = t('validation.required');
    if (password.length > 0 && password.length < 6) e.password = t('validation.passwordTooShort');
    if (password !== confirmPassword) e.confirmPassword = t('validation.passwordsDontMatch');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    const success = await register({ email, password, name, surname, phone });
    if (success) {
      // Role is set as customer by default in store - update if restaurant
      if (role === 'restaurant') {
        useAuthStore.getState().updateProfile({ role: 'restaurant' });
      }
    }
  };

  const RoleCard = ({ r, icon, label }: { r: UserRole; icon: string; label: string }) => (
    <Pressable
      onPress={() => setRole(r)}
      style={[
        styles.roleCard,
        {
          backgroundColor: role === r ? theme.colors.primary + '15' : theme.colors.surface,
          borderColor: role === r ? theme.colors.primary : theme.colors.border,
          borderRadius: theme.borderRadius.lg,
        },
      ]}
    >
      <Text style={styles.roleIcon}>{icon}</Text>
      <Text style={[styles.roleLabel, { color: role === r ? theme.colors.primary : theme.colors.text }]}>
        {label}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <Text style={{ fontSize: 24 }}>←</Text>
          </Pressable>

          <Text style={[styles.title, { color: theme.colors.text }]}>{t('auth.registerTitle')}</Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {t('auth.registerSubtitle')}
          </Text>

          {/* Role Selector */}
          <View style={styles.roleRow}>
            <RoleCard r="customer" icon="🛒" label={t('auth.customer')} />
            <RoleCard r="restaurant" icon="🏪" label={t('auth.restaurantOwner')} />
          </View>

          {/* Form */}
          <View style={styles.nameRow}>
            <View style={styles.nameField}>
              <Input label={t('auth.name')} value={name} onChangeText={setName} error={errors.name} />
            </View>
            <View style={styles.nameField}>
              <Input label={t('auth.surname')} value={surname} onChangeText={setSurname} />
            </View>
          </View>

          <Input
            label={t('auth.email')}
            icon="📧"
            value={email}
            onChangeText={setEmail}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />
          <Input
            label={t('auth.phone')}
            icon="📱"
            value={phone}
            onChangeText={setPhone}
            placeholder="0555 123 4567"
            keyboardType="phone-pad"
          />
          <Input
            label={t('auth.password')}
            icon="🔒"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />
          <Input
            label={t('auth.confirmPassword')}
            icon="🔒"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
          />

          <Button
            title={t('auth.register')}
            onPress={handleRegister}
            loading={isLoading}
            fullWidth
            size="lg"
          />

          <View style={styles.bottomLink}>
            <Text style={{ color: theme.colors.textSecondary }}>{t('auth.alreadyHaveAccount')} </Text>
            <Pressable onPress={() => router.back()}>
              <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>{t('auth.login')}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, padding: 24 },
  backBtn: { marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 24 },
  roleRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  roleCard: { flex: 1, alignItems: 'center', padding: 16, borderWidth: 2 },
  roleIcon: { fontSize: 32, marginBottom: 8 },
  roleLabel: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
  nameRow: { flexDirection: 'row', gap: 12 },
  nameField: { flex: 1 },
  bottomLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
});
