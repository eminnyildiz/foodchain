import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import tr from './tr.json';
import en from './en.json';

const getDeviceLanguage = (): string => {
  try {
    if (typeof window === 'undefined') return 'tr';
    return getLocales()[0]?.languageCode ?? 'tr';
  } catch {
    return 'tr';
  }
};

const deviceLanguage = getDeviceLanguage();

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng: deviceLanguage === 'tr' ? 'tr' : 'en',
  fallbackLng: 'tr',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v4',
});

export default i18n;
