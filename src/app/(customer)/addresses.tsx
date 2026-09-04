import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../../components/ui/Button';
import { Address } from '../../types';

export default function AddressesScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const removeAddress = useAuthStore((s) => s.removeAddress);
  const setDefaultAddress = useAuthStore((s) => s.setDefaultAddress);

  const addresses = user?.addresses ?? [];

  const handleDelete = (address: Address) => {
    if (address.isDefault && addresses.length > 1) {
      Alert.alert(
        t('common.error'),
        t('addresses.cannotDeleteDefault'),
      );
      return;
    }
    Alert.alert(
      t('common.confirm'),
      t('addresses.deleteConfirm'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('common.delete'),
          style: 'destructive',
          onPress: () => removeAddress(address.id),
        },
      ],
    );
  };

  const handleSetDefault = (addressId: string) => {
    setDefaultAddress(addressId);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {t('profile.myAddresses')}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {addresses.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>📍</Text>
            <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
              {t('addresses.noAddresses')}
            </Text>
            <Text style={[styles.emptyMsg, { color: theme.colors.textSecondary }]}>
              {t('addresses.noAddressesMessage')}
            </Text>
          </View>
        ) : (
          addresses.map((address) => (
            <View
              key={address.id}
              style={[
                styles.addressCard,
                {
                  backgroundColor: theme.colors.surface,
                  borderRadius: theme.borderRadius.lg,
                  borderColor: address.isDefault
                    ? theme.colors.primary
                    : theme.colors.border,
                  borderWidth: address.isDefault ? 2 : 1,
                },
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.titleRow}>
                  <Text style={{ fontSize: 18 }}>📍</Text>
                  <Text style={[styles.addressTitle, { color: theme.colors.text }]}>
                    {address.title}
                  </Text>
                  {address.isDefault && (
                    <View
                      style={[
                        styles.defaultBadge,
                        { backgroundColor: theme.colors.primary + '20' },
                      ]}
                    >
                      <Text
                        style={[styles.defaultBadgeText, { color: theme.colors.primary }]}
                      >
                        {t('common.default')}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <Text style={[styles.streetText, { color: theme.colors.textSecondary }]}>
                {address.street}
              </Text>
              <Text style={[styles.cityText, { color: theme.colors.textTertiary }]}>
                {address.district}, {address.city} {address.postalCode}
              </Text>

              <View style={styles.actionRow}>
                {!address.isDefault && (
                  <Pressable
                    onPress={() => handleSetDefault(address.id)}
                    style={[
                      styles.actionBtn,
                      { backgroundColor: theme.colors.primary + '10' },
                    ]}
                  >
                    <Text style={[styles.actionText, { color: theme.colors.primary }]}>
                      ✓ {t('addresses.setDefault')}
                    </Text>
                  </Pressable>
                )}
                <Pressable
                  onPress={() =>
                    router.push({
                      pathname: '/(customer)/address-form',
                      params: { addressId: address.id },
                    })
                  }
                  style={[
                    styles.actionBtn,
                    { backgroundColor: theme.colors.primary + '10' },
                  ]}
                >
                  <Text style={[styles.actionText, { color: theme.colors.primary }]}>
                    ✏️ {t('common.edit')}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => handleDelete(address)}
                  style={[
                    styles.actionBtn,
                    { backgroundColor: theme.colors.error + '10' },
                  ]}
                >
                  <Text style={[styles.actionText, { color: theme.colors.error }]}>
                    🗑 {t('common.delete')}
                  </Text>
                </Pressable>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add Address Button */}
      <View style={styles.footer}>
        <Button
          title={`+ ${t('profile.addAddress')}`}
          onPress={() => router.push('/(customer)/address-form')}
          fullWidth
          size="lg"
        />
      </View>
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
  scroll: { padding: 16, paddingBottom: 100, gap: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  emptyMsg: { fontSize: 14, textAlign: 'center' },
  addressCard: {
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: { marginBottom: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  addressTitle: { fontSize: 16, fontWeight: '700' },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultBadgeText: { fontSize: 11, fontWeight: '700' },
  streetText: { fontSize: 14, marginBottom: 4, marginLeft: 26 },
  cityText: { fontSize: 12, marginLeft: 26, marginBottom: 12 },
  actionRow: { flexDirection: 'row', gap: 8, marginLeft: 26 },
  actionBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  actionText: { fontSize: 12, fontWeight: '600' },
  footer: { padding: 16, paddingBottom: 24 },
});
