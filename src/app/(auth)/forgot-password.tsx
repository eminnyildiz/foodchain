import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

export default function ForgotPasswordScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (email) setSent(true);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>

        <Text style={styles.icon}>🔑</Text>
        <Text style={[styles.title, { color: theme.colors.text }]}>{t('auth.forgotPasswordTitle')}</Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          {t('auth.forgotPasswordSubtitle')}
        </Text>

        {sent ? (
          <View style={[styles.successBox, { backgroundColor: theme.colors.success + '15', borderRadius: theme.borderRadius.lg }]}>
            <Text style={{ fontSize: 40, textAlign: 'center' }}>✅</Text>
            <Text style={[styles.successText, { color: theme.colors.success }]}>
              {t('auth.resetEmailSent')}
            </Text>
          </View>
        ) : (
          <>
            <Input
              label={t('auth.email')}
              icon="📧"
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Button title={t('auth.resetPassword')} onPress={handleSend} fullWidth size="lg" />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { flex: 1, padding: 24, justifyContent: 'center' },
  backBtn: { position: 'absolute', top: 16, left: 24 },
  icon: { fontSize: 48, textAlign: 'center', marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 32, lineHeight: 20 },
  successBox: { padding: 24, alignItems: 'center' },
  successText: { fontSize: 15, fontWeight: '600', marginTop: 12, textAlign: 'center' },
});
