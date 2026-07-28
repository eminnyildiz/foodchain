import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Pressable, TextInputProps } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  icon?: string;
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  secureTextEntry: secureProp = false,
  value,
  onChangeText,
  placeholder,
  ...rest
}) => {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const [secure, setSecure] = useState(secureProp);

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: theme.colors.textSecondary }]}>{label}</Text>
      )}
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: theme.colors.surface,
            borderColor: error ? theme.colors.error : focused ? theme.colors.primary : theme.colors.border,
            borderRadius: theme.borderRadius.md,
          },
        ]}
      >
        {icon && <Text style={styles.icon}>{icon}</Text>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textTertiary}
          secureTextEntry={secure}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={[
            styles.input,
            { color: theme.colors.text },
            icon ? { paddingLeft: 0 } : null,
          ]}
          {...rest}
        />
        {secureProp && (
          <Pressable onPress={() => setSecure(!secure)} hitSlop={8}>
            <Text style={{ fontSize: 18 }}>{secure ? '👁️' : '🙈'}</Text>
          </Pressable>
        )}
      </View>
      {error && (
        <Text style={[styles.error, { color: theme.colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 14,
    height: 52,
    gap: 10,
  },
  icon: { fontSize: 18 },
  input: { flex: 1, fontSize: 15, height: '100%' },
  error: { fontSize: 12, marginTop: 4 },
});
