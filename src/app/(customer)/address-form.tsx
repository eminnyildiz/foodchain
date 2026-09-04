import React, { useState, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Address } from '../../types';

const generateId = (): string => Math.random().toString(36).substring(2, 10);

/** Default coordinates for Istanbul center */
const DEFAULT_LAT = 41.0082;
const DEFAULT_LNG = 28.9784;

export default function AddressFormScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  const { addressId } = useLocalSearchParams<{ addressId?: string }>();

  const user = useAuthStore((s) => s.user);
  const addAddress = useAuthStore((s) => s.addAddress);
  const updateAddress = useAuthStore((s) => s.updateAddress);

  const isEditing = !!addressId;
  const existingAddress = isEditing
    ? user?.addresses?.find((a) => a.id === addressId)
    : null;

  const [title, setTitle] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [lat, setLat] = useState(String(DEFAULT_LAT));
  const [lng, setLng] = useState(String(DEFAULT_LNG));
  const [isDefault, setIsDefault] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill form when editing
  useEffect(() => {
    if (existingAddress) {
      setTitle(existingAddress.title);
      setStreet(existingAddress.street);
      setCity(existingAddress.city);
      setDistrict(existingAddress.district);
      setPostalCode(existingAddress.postalCode);
      setLat(String(existingAddress.coordinates.lat));
      setLng(String(existingAddress.coordinates.lng));
      setIsDefault(existingAddress.isDefault);
    }
  }, [existingAddress?.id]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = t('validation.required');
    if (!street.trim()) newErrors.street = t('validation.required');
    if (!city.trim()) newErrors.city = t('validation.required');
    if (!district.trim()) newErrors.district = t('validation.required');

    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);
    if (isNaN(parsedLat) || parsedLat < -90 || parsedLat > 90) {
      newErrors.lat = t('addresses.invalidCoordinate');
    }
    if (isNaN(parsedLng) || parsedLng < -180 || parsedLng > 180) {
      newErrors.lng = t('addresses.invalidCoordinate');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;

    const addressData: Address = {
      id: isEditing ? addressId! : generateId(),
      title: title.trim(),
      street: street.trim(),
      city: city.trim(),
      district: district.trim(),
      postalCode: postalCode.trim(),
      coordinates: {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      isDefault,
    };

    if (isEditing) {
      updateAddress(addressId!, addressData);
    } else {
      addAddress(addressData);
    }

    router.back();
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Pressable onPress={() => router.back()}>
          <Text style={{ fontSize: 24 }}>←</Text>
        </Pressable>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          {isEditing ? t('addresses.editAddress') : t('profile.addAddress')}
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
          {/* Address Title */}
          <Input
            label={t('addresses.addressTitle')}
            placeholder={t('addresses.addressTitlePlaceholder')}
            value={title}
            onChangeText={setTitle}
            icon="🏷️"
            error={errors.title}
          />

          {/* Street */}
          <Input
            label={t('addresses.street')}
            placeholder={t('addresses.streetPlaceholder')}
            value={street}
            onChangeText={setStreet}
            icon="🏠"
            error={errors.street}
            multiline
          />

          {/* City */}
          <Input
            label={t('addresses.city')}
            placeholder={t('addresses.cityPlaceholder')}
            value={city}
            onChangeText={setCity}
            icon="🏙️"
            error={errors.city}
          />

          {/* District */}
          <Input
            label={t('addresses.district')}
            placeholder={t('addresses.districtPlaceholder')}
            value={district}
            onChangeText={setDistrict}
            icon="📍"
            error={errors.district}
          />

          {/* Postal Code */}
          <Input
            label={t('addresses.postalCode')}
            placeholder="34000"
            value={postalCode}
            onChangeText={setPostalCode}
            icon="📮"
            keyboardType="number-pad"
          />

          {/* Map / Coordinates Section */}
          <View
            style={[
              styles.mapSection,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                borderColor: theme.colors.border,
              },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              🗺️ {t('addresses.locationOnMap')}
            </Text>

            {/* Static map placeholder */}
            <View
              style={[
                styles.mapPlaceholder,
                {
                  backgroundColor: theme.colors.background,
                  borderRadius: theme.borderRadius.md,
                },
              ]}
            >
              <Text style={{ fontSize: 40 }}>📍</Text>
              <Text
                style={[styles.mapPlaceholderText, { color: theme.colors.textSecondary }]}
              >
                {t('addresses.mapPlaceholder')}
              </Text>
              <Text style={[styles.coordsDisplay, { color: theme.colors.textTertiary }]}>
                {lat}, {lng}
              </Text>
            </View>

            <View style={styles.coordRow}>
              <View style={{ flex: 1 }}>
                <Input
                  label={t('addresses.latitude')}
                  value={lat}
                  onChangeText={setLat}
                  keyboardType="decimal-pad"
                  error={errors.lat}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Input
                  label={t('addresses.longitude')}
                  value={lng}
                  onChangeText={setLng}
                  keyboardType="decimal-pad"
                  error={errors.lng}
                />
              </View>
            </View>
          </View>

          {/* Set as Default */}
          <Pressable
            onPress={() => setIsDefault(!isDefault)}
            style={[
              styles.defaultToggle,
              {
                backgroundColor: theme.colors.surface,
                borderRadius: theme.borderRadius.lg,
                borderColor: isDefault ? theme.colors.primary : theme.colors.border,
                borderWidth: isDefault ? 2 : 1,
              },
            ]}
          >
            <Text style={{ fontSize: 20 }}>{isDefault ? '✅' : '⬜'}</Text>
            <Text style={[styles.defaultToggleText, { color: theme.colors.text }]}>
              {t('addresses.setAsDefault')}
            </Text>
          </Pressable>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <Button
            title={t('common.save')}
            onPress={handleSave}
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
  mapSection: { padding: 16, borderWidth: 1, marginBottom: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  mapPlaceholder: {
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  mapPlaceholderText: { fontSize: 13, marginTop: 8 },
  coordsDisplay: { fontSize: 11, marginTop: 4 },
  coordRow: { flexDirection: 'row', gap: 12 },
  defaultToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  defaultToggleText: { fontSize: 15, fontWeight: '600' },
  footer: { padding: 16, paddingBottom: 24 },
});
