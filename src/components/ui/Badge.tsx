import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface BadgeProps {
  text: string;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'primary';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({ text, variant = 'primary', size = 'sm' }) => {
  const theme = useTheme();

  const colorMap: Record<string, { bg: string; text: string }> = {
    success: { bg: theme.colors.success + '20', text: theme.colors.success },
    warning: { bg: theme.colors.warning + '20', text: theme.colors.warning },
    error: { bg: theme.colors.error + '20', text: theme.colors.error },
    info: { bg: theme.colors.info + '20', text: theme.colors.info },
    primary: { bg: theme.colors.primary + '20', text: theme.colors.primary },
  };

  const c = colorMap[variant];

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: c.bg,
          paddingVertical: size === 'sm' ? 3 : 5,
          paddingHorizontal: size === 'sm' ? 8 : 12,
          borderRadius: theme.borderRadius.full,
        },
      ]}
    >
      <Text style={[styles.text, { color: c.text, fontSize: size === 'sm' ? 11 : 13 }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start' },
  text: { fontWeight: '700' },
});
