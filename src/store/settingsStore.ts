import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createSSRSafeStorage } from './ssrStorage';
import i18n from 'i18next';

interface SettingsState {
  language: 'tr' | 'en';
  isDarkMode: boolean;
  notificationsEnabled: boolean;
  setLanguage: (lang: 'tr' | 'en') => void;
  toggleDarkMode: () => void;
  toggleNotifications: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'tr',
      isDarkMode: false,
      notificationsEnabled: true,

      setLanguage: (lang: 'tr' | 'en') => {
        // eslint-disable-next-line import/no-named-as-default-member
        i18n.changeLanguage(lang);
        set({ language: lang });
      },

      toggleDarkMode: () => {
        set((state) => ({ isDarkMode: !state.isDarkMode }));
      },

      toggleNotifications: () => {
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled }));
      },
    }),
    {
      name: 'foodchain-settings',
      storage: createSSRSafeStorage(),
      partialize: (state) => ({
        language: state.language,
        isDarkMode: state.isDarkMode,
        notificationsEnabled: state.notificationsEnabled,
      }),
      onRehydrateStorage: () => {
        return (state) => {
          // Sync i18n language with persisted setting on rehydration
          if (state?.language) {
            i18n.changeLanguage(state.language);
          }
        };
      },
    }
  )
);
