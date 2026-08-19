import { useSettingsStore } from '../src/store/settingsStore';

// Mock i18next
jest.mock('i18next', () => ({
  changeLanguage: jest.fn(),
}));

describe('settingsStore', () => {
  it('toggles dark mode', () => {
    const initialState = useSettingsStore.getState().isDarkMode;
    useSettingsStore.getState().toggleDarkMode();
    expect(useSettingsStore.getState().isDarkMode).toBe(!initialState);
  });

  it('toggles notifications', () => {
    const initialState = useSettingsStore.getState().notificationsEnabled;
    useSettingsStore.getState().toggleNotifications();
    expect(useSettingsStore.getState().notificationsEnabled).toBe(!initialState);
  });

  it('changes language', () => {
    useSettingsStore.getState().setLanguage('en');
    expect(useSettingsStore.getState().language).toBe('en');
    useSettingsStore.getState().setLanguage('tr');
    expect(useSettingsStore.getState().language).toBe('tr');
  });
});
