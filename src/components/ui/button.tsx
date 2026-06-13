import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export function Button({
  onPress,
  title,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  style,
  testID,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const sizeStyles = {
    sm: {
      paddingVertical: Spacing.two,
      paddingHorizontal: Spacing.three,
      borderRadius: 6,
    },
    md: {
      paddingVertical: Spacing.three,
      paddingHorizontal: Spacing.four,
      borderRadius: 8,
    },
    lg: {
      paddingVertical: Spacing.four,
      paddingHorizontal: Spacing.five,
      borderRadius: 10,
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: disabled ? colors.textTertiary : colors.primary,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: disabled ? colors.borderLight : colors.secondary,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: disabled ? colors.textTertiary : colors.primary,
    },
    ghost: {
      backgroundColor: "transparent",
      borderWidth: 0,
    },
  };

  const textColor = {
    primary: colors.text === "#111827" ? "#FFFFFF" : "#F9FAFB",
    secondary: colors.text === "#111827" ? "#FFFFFF" : "#0F172A",
    outline: disabled ? colors.textTertiary : colors.primary,
    ghost: colors.primary,
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        sizeStyles[size],
        variantStyles[variant],
        { opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      testID={testID}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textColor[variant]} size="small" />
      ) : (
        <ThemedText
          style={{
            color: textColor[variant],
            fontWeight: "600",
            fontSize: size === "sm" ? 14 : size === "md" ? 16 : 18,
          }}
        >
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
