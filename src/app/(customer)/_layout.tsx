import { Stack } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';

export default function CustomerLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background },
        animation: 'slide_from_right',
      }}
    />
  );
}
