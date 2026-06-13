import React from "react";
import { View, StyleSheet, ScrollView, Image, SafeAreaView, TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { mockServices } from "@/mocks/data";

export interface ServiceDetailScreenProps {
  serviceId: string;
  onBack: () => void;
  onContact: () => void;
}

export function ServiceDetailScreen({ serviceId, onBack, onContact }: ServiceDetailScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const service = mockServices.find((s) => s.id === serviceId) || mockServices[0];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        {/* Header with back button */}
        <View style={styles.headerOverlay}>
          <TouchableOpacity
            onPress={onBack}
            style={[styles.backButton, { backgroundColor: "rgba(255,255,255,0.9)" }]}
          >
            <ThemedText style={{ fontSize: 18 }}>←</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.favoriteButton, { backgroundColor: "rgba(255,255,255,0.9)" }]}
          >
            <ThemedText style={{ fontSize: 18 }}>♡</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Image */}
        <Image source={{ uri: service.image }} style={styles.image} />

        {/* Content */}
        <View style={[styles.content, { paddingHorizontal: Spacing.four }]}>
          {/* Title and price */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <ThemedText style={[styles.title, { color: colors.text }]}>
                {service.title}
              </ThemedText>
              <ThemedText
                style={{
                  color: colors.textSecondary,
                  fontSize: 14,
                  marginTop: Spacing.one,
                }}
              >
                {service.category} • {service.city}
              </ThemedText>
            </View>
            <View style={[styles.priceBox, { backgroundColor: colors.primary }]}>
              <ThemedText
                style={{
                  color: "#FFFFFF",
                  fontWeight: "700",
                  fontSize: 20,
                }}
              >
                ${service.price}
              </ThemedText>
              <ThemedText
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 11,
                  marginTop: Spacing.one,
                }}
              >
                Aprox.
              </ThemedText>
            </View>
          </View>

          {/* Provider Card */}
          <Card
            variant="outlined"
            style={{
              marginTop: Spacing.four,
              marginBottom: Spacing.four,
            }}
          >
            <View style={styles.providerContainer}>
              <Image source={{ uri: service.providerAvatar }} style={styles.providerImage} />
              <View style={{ flex: 1 }}>
                <ThemedText
                  style={{
                    fontWeight: "600",
                    fontSize: 16,
                    color: colors.text,
                  }}
                >
                  {service.providerName}
                </ThemedText>
                <View style={styles.ratingSection}>
                  <ThemedText
                    style={{
                      color: colors.accent,
                      fontWeight: "700",
                      fontSize: 14,
                    }}
                  >
                    ⭐ {service.rating}
                  </ThemedText>
                  <ThemedText
                    style={{
                      color: colors.textSecondary,
                      fontSize: 13,
                      marginLeft: Spacing.one,
                    }}
                  >
                    {service.reviewCount} reviews
                  </ThemedText>
                </View>
              </View>
              <TouchableOpacity
                onPress={onContact}
                style={[styles.messageButton, { backgroundColor: colors.secondary }]}
              >
                <ThemedText
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                    fontSize: 12,
                  }}
                >
                  Contactar
                </ThemedText>
              </TouchableOpacity>
            </View>
          </Card>

          {/* Description */}
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.text,
              marginBottom: Spacing.two,
            }}
          >
            Sobre este servicio
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 14,
              lineHeight: 21,
              color: colors.textSecondary,
              marginBottom: Spacing.four,
            }}
          >
            {service.description}
          </ThemedText>

          {/* Features */}
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.text,
              marginBottom: Spacing.two,
            }}
          >
            Características
          </ThemedText>
          <View style={styles.featuresGrid}>
            {[
              { icon: "✓", label: "Profesional verificado" },
              { icon: "⏱", label: "Respuesta rápida" },
              { icon: "🎯", label: "Experiencia probada" },
              { icon: "💳", label: "Pago seguro" },
            ].map((feature, idx) => (
              <View key={idx} style={styles.featureItem}>
                <ThemedText style={{ fontSize: 18, marginBottom: Spacing.one }}>
                  {feature.icon}
                </ThemedText>
                <ThemedText
                  style={{
                    fontSize: 12,
                    color: colors.textSecondary,
                    textAlign: "center",
                  }}
                >
                  {feature.label}
                </ThemedText>
              </View>
            ))}
          </View>

          {/* Reviews Preview */}
          <ThemedText
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.text,
              marginTop: Spacing.five,
              marginBottom: Spacing.two,
            }}
          >
            Reseñas recientes
          </ThemedText>
          {[
            {
              author: "Carlos M.",
              rating: 5,
              comment: "Excelente servicio, muy profesional y puntual.",
            },
            {
              author: "Ana G.",
              rating: 5,
              comment: "Superó mis expectativas. Lo recomiendo totalmente.",
            },
          ].map((review, idx) => (
            <Card key={idx} variant="outlined" style={{ marginBottom: Spacing.two }}>
              <View style={styles.reviewRow}>
                <View>
                  <ThemedText
                    style={{
                      fontWeight: "600",
                      color: colors.text,
                      fontSize: 13,
                    }}
                  >
                    {review.author}
                  </ThemedText>
                  <ThemedText
                    style={{
                      color: colors.accent,
                      fontSize: 12,
                      marginTop: Spacing.one,
                    }}
                  >
                    {"⭐".repeat(review.rating)}
                  </ThemedText>
                </View>
              </View>
              <ThemedText
                style={{
                  color: colors.textSecondary,
                  fontSize: 12,
                  marginTop: Spacing.two,
                  lineHeight: 17,
                }}
              >
                {review.comment}
              </ThemedText>
            </Card>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.backgroundElement,
            borderTopColor: colors.border,
          },
        ]}
      >
        <Button title="Contactar al proveedor" onPress={onContact} size="lg" style={{ flex: 1 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerOverlay: {
    position: "absolute",
    top: Spacing.four,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.four,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  content: {
    paddingTop: Spacing.four,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.three,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: Spacing.one,
  },
  priceBox: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 12,
  },
  providerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
  },
  providerImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.one,
  },
  messageButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: 8,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.three,
  },
  featureItem: {
    width: "48%",
    paddingVertical: Spacing.three,
    alignItems: "center",
  },
  reviewRow: {
    marginBottom: Spacing.two,
  },
  footer: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderTopWidth: 1,
  },
});
