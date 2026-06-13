import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { TextInputField } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { categories } from "@/mocks/data";

export interface ProviderRegisterProps {
  onComplete: () => void;
  onBack: () => void;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  displayName: string;
  contactName: string;
  city: string;
  phone: string;
  whatsapp: string;
  website: string;
  instagram: string;
  linkedin: string;
  certifications: string;
  serviceTypeId: string | null;
  categoryId: string | null;
  providerTypes: { mayorista: boolean; minorista: boolean };
  description: string;
  experience: string;
}

type Step = 1 | 2 | 3 | 4 | 5;

export function ProviderRegisterMultiStep({ onComplete, onBack }: ProviderRegisterProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    displayName: "",
    contactName: "",
    city: "",
    phone: "",
    whatsapp: "",
    website: "",
    instagram: "",
    linkedin: "",
    certifications: "",
    serviceTypeId: null,
    categoryId: null,
    providerTypes: { mayorista: false, minorista: false },
    description: "",
    experience: "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleProviderTypeToggle = (type: "mayorista" | "minorista") => {
    setFormData((prev) => ({
      ...prev,
      providerTypes: {
        ...prev.providerTypes,
        [type]: !prev.providerTypes[type],
      },
    }));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.password) newErrors.password = "Contraseña requerida";
    else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Nombre completo requerido";
    if (!formData.displayName) newErrors.displayName = "Nombre de negocio requerido";
    if (!formData.contactName) newErrors.contactName = "Contacto principal requerido";
    if (!formData.city) newErrors.city = "Ciudad requerida";
    if (!formData.phone) newErrors.phone = "Teléfono requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.serviceTypeId) newErrors.serviceTypeId = "Selecciona un tipo de servicio";
    if (!formData.categoryId) newErrors.categoryId = "Selecciona una categoría";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.description) newErrors.description = "Descripción requerida";
    if (!formData.providerTypes.mayorista && !formData.providerTypes.minorista)
      newErrors.providerTypes = "Selecciona al menos un tipo de proveedor";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = false;
    switch (currentStep) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
      case 4:
        isValid = validateStep4();
        break;
    }
    if (isValid && currentStep < 5) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onComplete();
    }, 1000);
  };

  const selectedCategory = categories.find((c) => c.id === formData.serviceTypeId);

  const getCategoryColor = (categoryId: string | null): string => {
    const colorMap: Record<string, string> = {
      "1": "#DBEAFE", // Hogar - azul claro
      "2": "#FEE2E2", // Eventos - rojo claro
      "3": "#DCF472", // Educación - verde claro
      "4": "#F3E8FF", // Belleza - púrpura claro
      "5": "#FED7AA", // Bienestar - naranja claro
      "6": "#E0E7FF", // Tecnología - índigo claro
    };
    return colorMap[categoryId || "1"] || "#F3F4F6";
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View
            style={[
              styles.progressBar,
              {
                width: `${(currentStep / 5) * 100}%`,
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ThemedText style={{ fontSize: 24 }}>←</ThemedText>
          </TouchableOpacity>
          <ThemedText style={[styles.title, { color: colors.text }]}>
            Regístrate como proveedor
          </ThemedText>
        </View>

        {/* Step Indicator */}
        <ThemedText style={[styles.stepIndicator, { color: colors.textSecondary }]}>
          Paso {currentStep} de 5
        </ThemedText>

        {/* Step 1: Email & Password */}
        {currentStep === 1 && (
          <View style={styles.stepContent}>
            <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
              Crea tu cuenta
            </ThemedText>

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

            <TextInputField
              label="Confirmar contraseña"
              placeholder="••••••••"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(val) => handleInputChange("confirmPassword", val)}
              error={errors.confirmPassword}
            />
          </View>
        )}

        {/* Step 2: Personal Data */}
        {currentStep === 2 && (
          <View style={styles.stepContent}>
            <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
              Información personal
            </ThemedText>

            <TextInputField
              label="Nombre completo"
              placeholder="Tu nombre"
              value={formData.fullName}
              onChangeText={(val) => handleInputChange("fullName", val)}
              error={errors.fullName}
            />

            <TextInputField
              label="Nombre del negocio"
              placeholder="Cómo te verán los clientes"
              value={formData.displayName}
              onChangeText={(val) => handleInputChange("displayName", val)}
              error={errors.displayName}
            />

            <TextInputField
              label="Contacto principal"
              placeholder="Persona responsable de contacto"
              value={formData.contactName}
              onChangeText={(val) => handleInputChange("contactName", val)}
              error={errors.contactName}
            />

            <TextInputField
              label="Ciudad"
              placeholder="Tu ubicación principal"
              value={formData.city}
              onChangeText={(val) => handleInputChange("city", val)}
              error={errors.city}
            />

            <TextInputField
              label="Teléfono"
              placeholder="+1 (555) 123-4567"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={(val) => handleInputChange("phone", val)}
              error={errors.phone}
            />

            <TextInputField
              label="WhatsApp (opcional)"
              placeholder="+1 (555) 123-4567"
              keyboardType="phone-pad"
              value={formData.whatsapp}
              onChangeText={(val) => handleInputChange("whatsapp", val)}
            />

            <ThemedText
              style={{
                fontSize: 13,
                color: colors.textSecondary,
                marginTop: Spacing.three,
                marginBottom: Spacing.two,
              }}
            >
              Redes y sitio web (opcionales)
            </ThemedText>

            <TextInputField
              label="Sitio web"
              placeholder="https://miempresa.com"
              keyboardType="url"
              autoCapitalize="none"
              value={formData.website}
              onChangeText={(val) => handleInputChange("website", val)}
            />

            <TextInputField
              label="Instagram"
              placeholder="@usuario"
              autoCapitalize="none"
              value={formData.instagram}
              onChangeText={(val) => handleInputChange("instagram", val)}
            />

            <TextInputField
              label="LinkedIn"
              placeholder="linkedin.com/in/usuario"
              autoCapitalize="none"
              value={formData.linkedin}
              onChangeText={(val) => handleInputChange("linkedin", val)}
            />

            <TextInputField
              label="Certificaciones"
              placeholder="Ej: ISO 9001, Microsoft Certified"
              value={formData.certifications}
              onChangeText={(val) => handleInputChange("certifications", val)}
            />
          </View>
        )}

        {/* Step 3: Category Selection */}
        {currentStep === 3 && (
          <View style={styles.stepContent}>
            <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
              Tipo de servicio
            </ThemedText>

            <ThemedText
              style={{
                fontSize: 13,
                color: colors.textSecondary,
                marginBottom: Spacing.three,
              }}
            >
              Selecciona primero el tipo general
            </ThemedText>

            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => {
                  handleInputChange("serviceTypeId", cat.id);
                  handleInputChange("categoryId", "");
                }}
                style={[
                  styles.categoryOption,
                  {
                    backgroundColor:
                      formData.serviceTypeId === cat.id
                        ? colors.primaryLight
                        : colors.backgroundElement,
                    borderColor: formData.serviceTypeId === cat.id ? colors.primary : colors.border,
                  },
                ]}
              >
                <ThemedText
                  style={{
                    fontWeight: formData.serviceTypeId === cat.id ? "600" : "400",
                    color: colors.text,
                    flex: 1,
                  }}
                >
                  {cat.name}
                </ThemedText>
              </TouchableOpacity>
            ))}

            {selectedCategory && (
              <>
                <ThemedText
                  style={{
                    fontSize: 13,
                    color: colors.textSecondary,
                    marginTop: Spacing.four,
                    marginBottom: Spacing.two,
                  }}
                >
                  Ahora selecciona tu especialidad
                </ThemedText>

                {selectedCategory.subcategories.map((subcat) => (
                  <TouchableOpacity
                    key={subcat.id}
                    onPress={() => handleInputChange("categoryId", subcat.id)}
                    style={[
                      styles.subcategoryOption,
                      {
                        backgroundColor:
                          formData.categoryId === subcat.id
                            ? colors.secondary
                            : colors.backgroundSecondary,
                        borderColor:
                          formData.categoryId === subcat.id ? colors.secondary : colors.border,
                      },
                    ]}
                  >
                    <ThemedText
                      style={{
                        fontWeight: formData.categoryId === subcat.id ? "600" : "400",
                        color: formData.categoryId === subcat.id ? "#FFFFFF" : colors.text,
                      }}
                    >
                      {subcat.name}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {errors.categoryId && (
              <ThemedText
                style={{
                  color: colors.error,
                  fontSize: 12,
                  marginTop: Spacing.two,
                }}
              >
                {errors.categoryId}
              </ThemedText>
            )}
          </View>
        )}

        {/* Step 4: Provider Type & Description */}
        {currentStep === 4 && (
          <View style={styles.stepContent}>
            <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
              Tipo de proveedor
            </ThemedText>

            <ThemedText
              style={{
                fontSize: 13,
                color: colors.textSecondary,
                marginBottom: Spacing.three,
              }}
            >
              ¿Qué tipos de cliente atiendes?
            </ThemedText>

            <View style={styles.typeButtons}>
              <TouchableOpacity
                onPress={() => handleProviderTypeToggle("mayorista")}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor: formData.providerTypes.mayorista
                      ? colors.primary
                      : colors.backgroundSecondary,
                  },
                ]}
              >
                <ThemedText
                  style={{
                    color: formData.providerTypes.mayorista ? "#FFFFFF" : colors.text,
                    fontWeight: "600",
                  }}
                >
                  Mayorista
                </ThemedText>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleProviderTypeToggle("minorista")}
                style={[
                  styles.typeButton,
                  {
                    backgroundColor: formData.providerTypes.minorista
                      ? colors.secondary
                      : colors.backgroundSecondary,
                  },
                ]}
              >
                <ThemedText
                  style={{
                    color: formData.providerTypes.minorista ? "#FFFFFF" : colors.text,
                    fontWeight: "600",
                  }}
                >
                  Minorista
                </ThemedText>
              </TouchableOpacity>
            </View>

            {errors.providerTypes && (
              <ThemedText
                style={{
                  color: colors.error,
                  fontSize: 12,
                  marginBottom: Spacing.three,
                }}
              >
                {errors.providerTypes}
              </ThemedText>
            )}

            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.text,
                marginTop: Spacing.four,
                marginBottom: Spacing.two,
              }}
            >
              Describe tu servicio
            </ThemedText>

            <TextInputField
              placeholder="¿Qué ofreces? ¿Cuál es tu experiencia? ¿Algo especial?"
              value={formData.description}
              onChangeText={(val) => handleInputChange("description", val)}
              error={errors.description}
              containerStyle={{
                marginBottom: Spacing.three,
              }}
            />

            <ThemedText
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: colors.text,
                marginBottom: Spacing.two,
              }}
            >
              Años de experiencia (opcional)
            </ThemedText>

            <TextInputField
              placeholder="Ej: 5 años"
              keyboardType="number-pad"
              value={formData.experience}
              onChangeText={(val) => handleInputChange("experience", val)}
            />
          </View>
        )}

        {/* Step 5: Review */}
        {currentStep === 5 && (
          <View style={styles.stepContent}>
            <ThemedText style={[styles.stepTitle, { color: colors.text }]}>
              Tu perfil de proveedor
            </ThemedText>

            {/* Profile Card */}
            <Card variant="elevated" style={{ marginBottom: Spacing.four }}>
              {/* Avatar Section */}
              <View
                style={[
                  styles.avatarSection,
                  { backgroundColor: getCategoryColor(formData.serviceTypeId) },
                ]}
              >
                <ThemedText style={{ fontSize: 64 }}>
                  {selectedCategory?.name?.slice(0, 1).toUpperCase() || "P"}
                </ThemedText>
                <ThemedText style={{ fontSize: 24, marginTop: Spacing.two }}>
                  {selectedCategory?.subcategories
                    .find((s) => s.id === formData.categoryId)
                    ?.name?.slice(0, 1)
                    .toUpperCase() || "S"}
                </ThemedText>
              </View>

              {/* Business Info */}
              <View style={{ padding: Spacing.four }}>
                <ThemedText style={[styles.profileName, { color: colors.text }]}>
                  {formData.displayName}
                </ThemedText>
                <ThemedText style={{ color: colors.textSecondary, fontSize: 14 }}>
                  {formData.fullName}
                </ThemedText>
                <ThemedText
                  style={{ color: colors.textSecondary, fontSize: 13, marginTop: Spacing.one }}
                >
                  Contacto: {formData.contactName}
                </ThemedText>

                {/* Category & Type Badges */}
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: Spacing.two,
                    marginTop: Spacing.three,
                    marginBottom: Spacing.three,
                  }}
                >
                  <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
                    <ThemedText style={{ fontSize: 12, color: colors.primary }}>
                      {selectedCategory?.name}
                    </ThemedText>
                  </View>
                  <View style={[styles.badge, { backgroundColor: colors.secondaryLight }]}>
                    <ThemedText style={{ fontSize: 12, color: colors.secondary }}>
                      {
                        selectedCategory?.subcategories.find((s) => s.id === formData.categoryId)
                          ?.name
                      }
                    </ThemedText>
                  </View>
                </View>

                {/* Location & Contact */}
                <View style={{ marginBottom: Spacing.three }}>
                  <View style={styles.infoRow}>
                    <ThemedText style={{ color: colors.textSecondary }}>Ubicación</ThemedText>
                    <ThemedText style={{ color: colors.text, marginLeft: Spacing.two }}>
                      {formData.city}
                    </ThemedText>
                  </View>
                  <View style={styles.infoRow}>
                    <ThemedText style={{ color: colors.textSecondary }}>Teléfono</ThemedText>
                    <ThemedText style={{ color: colors.text, marginLeft: Spacing.two }}>
                      {formData.phone}
                    </ThemedText>
                  </View>
                  {!!formData.whatsapp && (
                    <View style={styles.infoRow}>
                      <ThemedText style={{ color: colors.textSecondary }}>WhatsApp</ThemedText>
                      <ThemedText style={{ color: colors.text, marginLeft: Spacing.two }}>
                        {formData.whatsapp}
                      </ThemedText>
                    </View>
                  )}
                </View>

                {/* Descripción */}
                <View style={{ marginBottom: Spacing.three }}>
                  <ThemedText
                    style={{ fontWeight: "600", color: colors.text, marginBottom: Spacing.one }}
                  >
                    Sobre mi servicio
                  </ThemedText>
                  <ThemedText style={{ color: colors.textSecondary, lineHeight: 20 }}>
                    {formData.description}
                  </ThemedText>
                </View>

                {/* Experience */}
                {formData.experience && (
                  <View style={{ marginBottom: Spacing.three }}>
                    <ThemedText
                      style={{ fontWeight: "600", color: colors.text, marginBottom: Spacing.one }}
                    >
                      Experiencia
                    </ThemedText>
                    <ThemedText style={{ color: colors.textSecondary }}>
                      {formData.experience} años
                    </ThemedText>
                  </View>
                )}

                {/* Provider Types */}
                <View style={{ marginBottom: Spacing.three }}>
                  <ThemedText
                    style={{ fontWeight: "600", color: colors.text, marginBottom: Spacing.two }}
                  >
                    Atiendo a
                  </ThemedText>
                  <View style={{ flexDirection: "row", gap: Spacing.two }}>
                    {formData.providerTypes.mayorista && (
                      <View style={[styles.typeTag, { backgroundColor: colors.primary }]}>
                        <ThemedText style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>
                          Mayorista
                        </ThemedText>
                      </View>
                    )}
                    {formData.providerTypes.minorista && (
                      <View style={[styles.typeTag, { backgroundColor: colors.secondary }]}>
                        <ThemedText style={{ color: "#FFFFFF", fontSize: 12, fontWeight: "600" }}>
                          Minorista
                        </ThemedText>
                      </View>
                    )}
                  </View>
                </View>

                {/* Contact Links */}
                {(formData.website || formData.instagram || formData.linkedin) && (
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderTopColor: colors.border,
                      paddingTop: Spacing.three,
                    }}
                  >
                    <ThemedText
                      style={{ fontWeight: "600", color: colors.text, marginBottom: Spacing.two }}
                    >
                      Conecta conmigo
                    </ThemedText>
                    {formData.website && (
                      <ThemedText
                        style={{ color: colors.primary, fontSize: 12, marginBottom: Spacing.one }}
                      >
                        Sitio web: {formData.website}
                      </ThemedText>
                    )}
                    {formData.instagram && (
                      <ThemedText
                        style={{ color: colors.primary, fontSize: 12, marginBottom: Spacing.one }}
                      >
                        Instagram: @{formData.instagram.replace("@", "")}
                      </ThemedText>
                    )}
                    {formData.linkedin && (
                      <ThemedText
                        style={{ color: colors.primary, fontSize: 12, marginBottom: Spacing.one }}
                      >
                        LinkedIn: {formData.linkedin}
                      </ThemedText>
                    )}
                  </View>
                )}

                {/* Certifications */}
                {formData.certifications && (
                  <View style={{ marginTop: Spacing.three }}>
                    <ThemedText
                      style={{ fontWeight: "600", color: colors.text, marginBottom: Spacing.one }}
                    >
                      Certificaciones
                    </ThemedText>
                    <ThemedText style={{ color: colors.textSecondary, fontSize: 12 }}>
                      {formData.certifications}
                    </ThemedText>
                  </View>
                )}
              </View>
            </Card>

            <ThemedText
              style={{
                fontSize: 12,
                color: colors.textSecondary,
                marginBottom: Spacing.four,
                lineHeight: 18,
              }}
            >
              Al continuar aceptas nuestros Términos de servicio y Política de privacidad. Podrás
              editar esta información en tu perfil después.
            </ThemedText>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actionsContainer}>
          {currentStep > 1 && (
            <Button
              title="Atrás"
              onPress={() => setCurrentStep((currentStep - 1) as Step)}
              variant="outline"
              size="lg"
              style={{ flex: 1 }}
            />
          )}
          {currentStep < 5 && (
            <>
              {currentStep > 1 && <View style={{ width: Spacing.two }} />}
              <Button
                title="Siguiente"
                onPress={handleNext}
                variant="primary"
                size="lg"
                style={{ flex: 1 }}
              />
            </>
          )}
          {currentStep === 5 && (
            <Button
              title="Completar registro"
              onPress={handleSubmit}
              loading={loading}
              variant="primary"
              size="lg"
              style={{ flex: 1 }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.four,
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#E5E7EB",
    borderRadius: 2,
    marginBottom: Spacing.four,
    marginHorizontal: -Spacing.four,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.three,
  },
  backButton: {
    marginRight: Spacing.three,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  stepIndicator: {
    fontSize: 12,
    marginBottom: Spacing.four,
  },
  stepContent: {
    flex: 1,
    marginBottom: Spacing.five,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: Spacing.four,
  },
  categoryOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: 10,
    marginBottom: Spacing.two,
    borderWidth: 1.5,
  },
  subcategoryOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 8,
    marginBottom: Spacing.one,
    borderWidth: 1.5,
    marginLeft: Spacing.three,
  },
  typeButtons: {
    flexDirection: "row",
    gap: Spacing.two,
    marginBottom: Spacing.four,
  },
  typeButton: {
    flex: 1,
    paddingVertical: Spacing.three,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewItem: {
    marginBottom: Spacing.three,
    paddingBottom: Spacing.three,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  avatarSection: {
    paddingVertical: Spacing.five,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: Spacing.one,
  },
  badge: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.one,
  },
  typeTag: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: 6,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: Spacing.two,
    marginTop: Spacing.four,
  },
});
