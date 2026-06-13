/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    // Primary palette
    primary: "#2563EB", // Azul profesional
    primaryLight: "#DBEAFE", // Azul muy claro
    primaryDark: "#1E40AF", // Azul oscuro

    // Secondary palette
    secondary: "#10B981", // Verde complementario
    secondaryLight: "#D1FAE5", // Verde muy claro
    secondaryDark: "#059669", // Verde oscuro

    // Accent
    accent: "#F59E0B", // Naranja/Amber suave
    accentLight: "#FEF3C7", // Accent muy claro

    // Status colors
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",

    // Text
    text: "#111827", // Gris oscuro (no negro puro)
    textSecondary: "#6B7280", // Gris medio
    textTertiary: "#9CA3AF", // Gris claro

    // Background
    background: "#FAFAFA", // Blanco con toque gris
    backgroundElement: "#FFFFFF", // Blanco puro para cards
    backgroundSecondary: "#F3F4F6", // Gris muy suave
    backgroundSelected: "#E0E7FF", // Azul muy claro para selección

    // Borders
    border: "#E5E7EB",
    borderLight: "#F3F4F6",
  },
  dark: {
    // Primary palette
    primary: "#3B82F6", // Azul más claro para dark mode
    primaryLight: "#1E3A8A", // Azul oscuro
    primaryDark: "#60A5FA", // Azul claro

    // Secondary palette
    secondary: "#34D399", // Verde más claro
    secondaryLight: "#065F46", // Verde oscuro
    secondaryDark: "#6EE7B7", // Verde claro

    // Accent
    accent: "#FBBF24", // Naranja/Amber más claro
    accentLight: "#78350F", // Accent muy oscuro

    // Status colors
    success: "#34D399",
    error: "#F87171",
    warning: "#FBBF24",
    info: "#60A5FA",

    // Text
    text: "#F9FAFB", // Blanco con toque gris
    textSecondary: "#D1D5DB", // Gris claro
    textTertiary: "#9CA3AF", // Gris medio

    // Background
    background: "#0F172A", // Azul muy oscuro (no negro puro)
    backgroundElement: "#1E293B", // Gris oscuro para cards
    backgroundSecondary: "#1E293B", // Gris oscuro
    backgroundSelected: "#1E3A8A", // Azul oscuro para selección

    // Borders
    border: "#334155",
    borderLight: "#475569",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
