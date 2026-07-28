import { create } from 'zustand';
import i18n from 'i18next';

interface SettingsState {
  language: 'tr' | 'en';
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  setLanguage: (lang: 'tr' | 'en') => void;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  language: 'tr',
  isDarkMode: false,
  notificationsEnabled: true,

  setLanguage: (lang: 'tr' | 'en') => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },

  toggleDarkMode: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
  },

  toggleNotifications: () => {
    set((state) => ({ notificationsEnabled: !state.notificationsEnabled }));
  },
}));
