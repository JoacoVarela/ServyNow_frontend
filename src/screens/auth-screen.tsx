import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { TextInputField } from "@/components/ui/input";
import { ProviderRegisterMultiStep } from "@/screens/provider-register-multistep";

export interface AuthScreenProps {
  onLoginSuccess: () => void;
}

export function AuthScreen({ onLoginSuccess }: AuthScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [mode, setMode] = useState<"login" | "register" | "provider-register">("login");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "client",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) newErrors.email = "Email es requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido";

    if (!formData.password) newErrors.password = "Contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";

    if (mode === "register") {
      if (!formData.name) newErrors.name = "Nombre es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (mode === "register" && formData.role === "provider") {
      setMode("provider-register");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    // Simular delay de API
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess();
    }, 1000);
  };

  if (mode === "provider-register") {
    return (
      <ProviderRegisterMultiStep onComplete={onLoginSuccess} onBack={() => setMode("register")} />
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
        bounces={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.logo, { backgroundColor: colors.primary }]}>
            <ThemedText
              style={{
                fontSize: 32,
                fontWeight: "700",
                color: "#FFFFFF",
              }}
            >
              SN
            </ThemedText>
          </View>
          <ThemedText style={[styles.appName, { color: colors.text }]}>ServyNow</ThemedText>
          <ThemedText style={[styles.tagline, { color: colors.textSecondary }]}>
            Tu marketplace de servicios
          </ThemedText>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <TouchableOpacity
              onPress={() => {
                setMode("login");
                setErrors({});
              }}
              style={[
                styles.tab,
                {
                  borderBottomColor: mode === "login" ? colors.primary : "transparent",
                },
              ]}
            >
              <ThemedText
                style={{
                  fontWeight: mode === "login" ? "600" : "400",
                  color: mode === "login" ? colors.primary : colors.textSecondary,
                  fontSize: 16,
                }}
              >
                Iniciar sesión
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMode("register");
                setErrors({});
              }}
              style={[
                styles.tab,
                {
                  borderBottomColor: mode === "register" ? colors.primary : "transparent",
                },
              ]}
            >
              <ThemedText
                style={{
                  fontWeight: mode === "register" ? "600" : "400",
                  color: mode === "register" ? colors.primary : colors.textSecondary,
                  fontSize: 16,
                }}
              >
                Registrarse
              </ThemedText>
            </TouchableOpacity>
          </View>

          {/* Inputs */}
          {mode === "register" && (
            <TextInputField
              label="Nombre completo"
              placeholder="Tu nombre"
              value={formData.name}
              onChangeText={(val) => handleInputChange("name", val)}
              error={errors.name}
            />
          )}

          <TextInputField
            label="Correo electrónico"
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(val) => handleInputChange("email", val)}
            error={errors.email}
          />

          <TextInputField
            label="Contraseña"
            placeholder="••••••••"
            secureTextEntry
            value={formData.password}
            onChangeText={(val) => handleInputChange("password", val)}
            error={errors.password}
          />

          {/* Role selection for register */}
          {mode === "register" && (
            <View style={styles.roleContainer}>
              <ThemedText
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  color: colors.text,
                  marginBottom: Spacing.two,
                }}
              >
                ¿Qué eres?
              </ThemedText>
              <View style={styles.roleButtons}>
                <TouchableOpacity
                  onPress={() => setFormData((prev) => ({ ...prev, role: "client" }))}
                  style={[
                    styles.roleButton,
                    {
                      backgroundColor:
                        formData.role === "client" ? colors.primary : colors.backgroundSecondary,
                    },
                  ]}
                >
                  <ThemedText
                    style={{
                      color: formData.role === "client" ? "#FFFFFF" : colors.text,
                      fontWeight: "600",
                    }}
                  >
                    Cliente
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFormData((prev) => ({ ...prev, role: "provider" }))}
                  style={[
                    styles.roleButton,
                    {
                      backgroundColor:
                        formData.role === "provider"
                          ? colors.secondary
                          : colors.backgroundSecondary,
                    },
                  ]}
                >
                  <ThemedText
                    style={{
                      color: formData.role === "provider" ? "#FFFFFF" : colors.text,
                      fontWeight: "600",
                    }}
                  >
                    Proveedor
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Submit Button */}
          <Button
            title={
              mode === "login"
                ? "Iniciar sesión"
                : formData.role === "provider"
                  ? "Continuar como proveedor"
                  : "Crear cuenta"
            }
            onPress={handleSubmit}
            loading={loading}
            size="lg"
            style={{ marginTop: Spacing.four }}
          />

          {/* Forgot password link */}
          {mode === "login" && (
            <TouchableOpacity style={{ marginTop: Spacing.three }}>
              <ThemedText
                style={{
                  textAlign: "center",
                  color: colors.primary,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                ¿Olvidaste tu contraseña?
              </ThemedText>
            </TouchableOpacity>
          )}
        </View>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <ThemedText
            style={{
              fontSize: 12,
              color: colors.textTertiary,
              textAlign: "center",
              lineHeight: 18,
            }}
          >
            Al continuar aceptas nuestros{" "}
            <ThemedText style={{ fontWeight: "600", color: colors.primary }}>
              Términos de servicio
            </ThemedText>{" "}
            y{" "}
            <ThemedText style={{ fontWeight: "600", color: colors.primary }}>
              Política de privacidad
            </ThemedText>
          </ThemedText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    marginTop: Spacing.six,
    marginBottom: Spacing.five,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.three,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: Spacing.one,
  },
  tagline: {
    fontSize: 14,
    fontWeight: "400",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: Spacing.five,
  },
  tab: {
    flex: 1,
    paddingBottom: Spacing.three,
    borderBottomWidth: 2,
    alignItems: "center",
  },
  roleContainer: {
    marginBottom: Spacing.four,
  },
  roleButtons: {
    flexDirection: "row",
    gap: Spacing.two,
  },
  roleButton: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  termsContainer: {
    marginVertical: Spacing.four,
  },
});
