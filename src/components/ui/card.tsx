import React from "react";
import { View, StyleSheet, ViewStyle, Image, ImageSourcePropType } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";

interface CardProps {
  style?: ViewStyle;
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: "default" | "elevated" | "outlined";
  imageSource?: ImageSourcePropType;
  imageHeight?: number;
  title?: string;
  subtitle?: string;
}

export function Card({
  style,
  children,
  variant = "default",
  imageSource,
  imageHeight = 200,
  title,
  subtitle,
}: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];

  const variantStyles = {
    default: {
      backgroundColor: colors.backgroundElement,
      borderWidth: 0,
      shadowColor: colorScheme === "dark" ? "#000000" : "#000000",
      shadowOpacity: colorScheme === "dark" ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: colorScheme === "dark" ? 4 : 2,
    },
    elevated: {
      backgroundColor: colors.backgroundElement,
      borderWidth: 0,
      shadowColor: colors.primary,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
    outlined: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.border,
      shadowOpacity: 0,
      elevation: 0,
    },
  };

  return (
    <View style={[styles.card, variantStyles[variant], style]}>
      {imageSource && (
        <Image source={imageSource} style={[styles.image, { height: imageHeight }]} />
      )}
      <View style={styles.content}>
        {title && <ThemedText style={[styles.title, { color: colors.text }]}>{title}</ThemedText>}
        {subtitle && (
          <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </ThemedText>
        )}
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: Spacing.three,
  },
  image: {
    width: "100%",
  },
  content: {
    padding: Spacing.three,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.one,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
  },
});
