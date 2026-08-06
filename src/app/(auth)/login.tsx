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

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { login, isLoading } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError(t('validation.required'));
      return;
    }
    const success = await login(email, password);
    if (!success) {
      setError(t('common.error'));
    }
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoSection}>
            <Text style={styles.logoEmoji}>🍔</Text>
            <Text style={[styles.logoText, { color: theme.colors.primary }]}>FoodChain</Text>
            <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
              {t('auth.loginSubtitle')}
            </Text>
          </View>

          {/* Welcome */}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {t('auth.loginTitle')}
          </Text>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label={t('auth.email')}
              icon="📧"
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input
              label={t('auth.password')}
              icon="🔒"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••"
              secureTextEntry
            />

            {error ? (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text>
            ) : null}

            <Pressable onPress={() => router.push('/(auth)/forgot-password')}>
              <Text style={[styles.forgotText, { color: theme.colors.primary }]}>
                {t('auth.forgotPassword')}
              </Text>
            </Pressable>

            <Button
              title={t('auth.login')}
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              size="lg"
            />
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
            <Text style={[styles.dividerText, { color: theme.colors.textTertiary }]}>
              {t('auth.or')}
            </Text>
            <View style={[styles.dividerLine, { backgroundColor: theme.colors.border }]} />
          </View>

          {/* Google */}
          <Button
            title="Google"
            onPress={() => handleLogin()}
            variant="secondary"
            icon={<Text style={{ fontSize: 20 }}>🔵</Text>}
            fullWidth
          />

          {/* Register link */}
          <View style={styles.bottomLink}>
            <Text style={{ color: theme.colors.textSecondary }}>{t('auth.dontHaveAccount')} </Text>
            <Pressable onPress={() => router.push('/(auth)/register')}>
              <Text style={{ color: theme.colors.primary, fontWeight: '700' }}>
                {t('auth.register')}
              </Text>
            </Pressable>
          </View>

          {/* Demo hint */}
          <View style={[styles.demoBox, { backgroundColor: theme.colors.surfaceVariant, borderRadius: theme.borderRadius.md }]}>
            <Text style={[styles.demoTitle, { color: theme.colors.textSecondary }]}>{t('auth.demoAccounts')}</Text>
            <Text style={[styles.demoText, { color: theme.colors.textTertiary }]}>
              🛒 customer@test.com / 123456{'\n'}
              🏪 restaurant@test.com / 123456
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  scroll: { flexGrow: 1, padding: 24, justifyContent: 'center' },
  logoSection: { alignItems: 'center', marginBottom: 32 },
  logoEmoji: { fontSize: 56 },
  logoText: { fontSize: 34, fontWeight: '900', marginTop: 8 },
  subtitle: { fontSize: 14, marginTop: 4, textAlign: 'center' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 24 },
  form: { gap: 0 },
  errorText: { fontSize: 13, marginBottom: 8, textAlign: 'center' },
  forgotText: { fontSize: 13, fontWeight: '600', textAlign: 'right', marginBottom: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1 },
  dividerText: { marginHorizontal: 12, fontSize: 13 },
  bottomLink: { flexDirection: 'row', justifyContent: 'center', marginTop: 24 },
  demoBox: { padding: 16, marginTop: 24 },
  demoTitle: { fontSize: 12, fontWeight: '700', marginBottom: 4 },
  demoText: { fontSize: 12, lineHeight: 20 },
});
