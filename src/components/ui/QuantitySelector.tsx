import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
}) => {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onDecrease}
        disabled={quantity <= min}
        style={({ pressed }) => [
          styles.btn,
          {
            backgroundColor: theme.colors.surfaceVariant,
            borderRadius: theme.borderRadius.full,
            opacity: quantity <= min ? 0.4 : pressed ? 0.7 : 1,
          },
        ]}
        hitSlop={8}
      >
        <Text style={[styles.btnText, { color: theme.colors.text }]}>−</Text>
      </Pressable>
      <Text style={[styles.count, { color: theme.colors.text }]}>{quantity}</Text>
      <Pressable
        onPress={onIncrease}
        disabled={quantity >= max}
        style={({ pressed }) => [
          styles.btn,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.full,
            opacity: quantity >= max ? 0.4 : pressed ? 0.7 : 1,
          },
        ]}
        hitSlop={8}
      >
        <Text style={[styles.btnText, { color: '#FFF' }]}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  btn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  btnText: { fontSize: 18, fontWeight: '700', lineHeight: 20 },
  count: { fontSize: 16, fontWeight: '700', minWidth: 24, textAlign: 'center' },
});
