// FoodChain Theme Configuration
// Comprehensive design system with light/dark mode support

export const Colors = {
  primary: '#FF6B35',
  primaryLight: '#FF8F65',
  primaryDark: '#E55A25',
  secondary: '#2D3436',
  secondaryLight: '#636E72',
  accent: '#00B894',
  accentLight: '#55EFC4',
  accentDark: '#00A381',
  error: '#E74C3C',
  errorLight: '#FDEDEC',
  warning: '#F39C12',
  warningLight: '#FEF5E7',
  info: '#3498DB',
  infoLight: '#EBF5FB',
  success: '#00B894',
  successLight: '#E8F8F5',
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  star: '#F1C40F',
  divider: '#E0E0E0',
  disabled: '#BDC3C7',
  placeholder: '#95A5A6',
} as const;

export const LightTheme = {
  background: '#FFFFFF',
  surface: '#F8F9FA',
  surfaceVariant: '#F1F3F5',
  card: '#FFFFFF',
  cardElevated: '#FFFFFF',
  text: '#2D3436',
  textSecondary: '#636E72',
  textTertiary: '#95A5A6',
  textInverse: '#FFFFFF',
  border: '#E9ECEF',
  borderLight: '#F1F3F5',
  inputBackground: '#F8F9FA',
  inputBorder: '#DEE2E6',
  tabBar: '#FFFFFF',
  tabBarInactive: '#95A5A6',
  statusBar: 'dark' as const,
  headerBackground: '#FFFFFF',
  shimmerBase: '#E9ECEF',
  shimmerHighlight: '#F8F9FA',
  skeleton: '#E9ECEF',
} as const;

export const DarkTheme = {
  background: '#1A1A2E',
  surface: '#16213E',
  surfaceVariant: '#0F3460',
  card: '#16213E',
  cardElevated: '#1E2A4A',
  text: '#ECEDEE',
  textSecondary: '#A0A4A8',
  textTertiary: '#6C7680',
  textInverse: '#1A1A2E',
  border: '#2A2A4A',
  borderLight: '#232345',
  inputBackground: '#16213E',
  inputBorder: '#2A2A4A',
  tabBar: '#16213E',
  tabBarInactive: '#6C7680',
  statusBar: 'light' as const,
  headerBackground: '#1A1A2E',
  shimmerBase: '#2A2A4A',
  shimmerHighlight: '#16213E',
  skeleton: '#2A2A4A',
} as const;

export const Typography = {
  sizes: {
    xs: 10,
    sm: 12,
    body: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
    title: 34,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semiBold: '600' as const,
    bold: '700' as const,
    extraBold: '800' as const,
  },
  lineHeights: {
    xs: 14,
    sm: 16,
    body: 20,
    md: 22,
    lg: 26,
    xl: 30,
    xxl: 36,
    title: 42,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
  },
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  xxxxl: 40,
  section: 48,
} as const;

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHover: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  button: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomTab: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  modal: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
} as const;

export const IconSizes = {
  xs: 14,
  sm: 18,
  md: 22,
  lg: 26,
  xl: 32,
  xxl: 40,
} as const;

export const HitSlop = {
  small: { top: 8, right: 8, bottom: 8, left: 8 },
  medium: { top: 12, right: 12, bottom: 12, left: 12 },
  large: { top: 16, right: 16, bottom: 16, left: 16 },
} as const;

export const AnimationDurations = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export type ThemeType = 'light' | 'dark';

export interface Theme {
  colors: typeof Colors;
  theme: typeof LightTheme | typeof DarkTheme;
  typography: typeof Typography;
  spacing: typeof Spacing;
  borderRadius: typeof BorderRadius;
  shadows: typeof Shadows;
  iconSizes: typeof IconSizes;
  hitSlop: typeof HitSlop;
  animationDurations: typeof AnimationDurations;
}

export const getTheme = (mode: ThemeType): Theme => ({
  colors: Colors,
  theme: mode === 'dark' ? DarkTheme : LightTheme,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  iconSizes: IconSizes,
  hitSlop: HitSlop,
  animationDurations: AnimationDurations,
});
