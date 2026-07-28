import { useSettingsStore } from '../store/settingsStore';
import {
  Colors,
  LightTheme,
  DarkTheme,
  Typography,
  Spacing,
  BorderRadius,
  Shadows,
} from '../constants/theme';

export const useTheme = () => {
  const isDarkMode = useSettingsStore((s) => s.isDarkMode);
  const themeColors = isDarkMode ? DarkTheme : LightTheme;

  return {
    colors: {
      ...Colors,
      ...themeColors,
    },
    typography: Typography,
    spacing: Spacing,
    borderRadius: BorderRadius,
    shadows: Shadows,
  };
};
