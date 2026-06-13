import React, { useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Animated,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SymbolView } from "expo-symbols";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockServices, categories } from "@/mocks/data";

const NAVBAR_HEIGHT = 56;
const FLOATING_ACTION_SIZE = 62;

export interface FeedScreenProps {
  onServicePress: (serviceId: string) => void;
  onDirectContact: (serviceId: string) => void;
  chatBadgeCount: number;
  onOpenChatHistory?: () => void;
  onOpenProfile?: () => void;
}

export function FeedScreen({
  onServicePress,
  onDirectContact,
  chatBadgeCount,
  onOpenChatHistory,
  onOpenProfile,
}: FeedScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navbarTranslateY = useRef(new Animated.Value(0)).current;
  const searchAnim = useRef(new Animated.Value(0)).current;
  const lastScrollY = useRef(0);
  const isNavbarVisible = useRef(true);

  const navbarTotalHeight = NAVBAR_HEIGHT + insets.top;

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const hasSubcategories = Boolean(selectedCategory && selectedCategory.subcategories.length > 0);

  const filteredServices = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return mockServices.filter((service) => {
      if (selectedCategoryId && service.serviceTypeId !== selectedCategoryId) return false;
      if (selectedSubcategoryId && service.categoryId !== selectedSubcategoryId) return false;
      if (normalizedQuery) {
        const searchable = [
          service.title,
          service.providerName,
          service.description,
          service.city,
          ...service.tags,
        ]
          .join(" ")
          .toLowerCase();

        if (!searchable.includes(normalizedQuery)) return false;
      }
      return true;
    });
  }, [selectedCategoryId, selectedSubcategoryId, searchQuery]);

  const safeIndex =
    filteredServices.length === 0 ? 0 : Math.min(currentIndex, filteredServices.length - 1);
  const currentService = filteredServices[safeIndex];
  const hasServices = filteredServices.length > 0;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentY = e.nativeEvent.contentOffset.y;
    const diff = currentY - lastScrollY.current;

    if (diff > 8 && currentY > 20) {
      if (isNavbarVisible.current) {
        isNavbarVisible.current = false;
        Animated.timing(navbarTranslateY, {
          toValue: -navbarTotalHeight,
          duration: 220,
          useNativeDriver: true,
        }).start();
      }
    } else if (diff < -5) {
      if (!isNavbarVisible.current) {
        isNavbarVisible.current = true;
        Animated.timing(navbarTranslateY, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }).start();
      }
    }

    lastScrollY.current = currentY;
  };

  const handleContact = () => {
    if (!currentService) return;
    onDirectContact(currentService.id);
  };

  const handleResetFilters = () => {
    setSelectedCategoryId(null);
    setSelectedSubcategoryId(null);
    setCurrentIndex(0);
  };

  const handleSkip = () => {
    if (filteredServices.length === 0) return;
    if (safeIndex < filteredServices.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleToggleSearch = (open: boolean) => {
    if (open) {
      setIsSearchOpen(true);
    }

    Animated.timing(searchAnim, {
      toValue: open ? 1 : 0,
      duration: 220,
      useNativeDriver: false,
    }).start(() => {
      if (!open) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    });
  };

  const skipBackground = hasServices ? colors.backgroundElement : colors.backgroundSecondary;

  const baseRowOpacity = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const searchBarWidth = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["44%", "100%"],
  });

  const renderIcon = (
    iosName: string,
    fallback: string,
    size: number,
    color: string,
    weight: "regular" | "semibold" | "bold" = "regular",
  ) => {
    if (Platform.OS === "ios") {
      return <SymbolView name={iosName as any} size={size} tintColor={color} />;
    }

    return (
      <ThemedText style={{ color, fontSize: size, fontWeight: weight }}>{fallback}</ThemedText>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View
        style={[
          styles.navbar,
          {
            backgroundColor: colors.backgroundElement,
            paddingTop: insets.top,
            height: navbarTotalHeight,
            borderBottomColor: colors.border,
            transform: [{ translateY: navbarTranslateY }],
          },
        ]}
      >
        <View style={styles.navbarTopRow}>
          <Animated.View
            style={[styles.baseNavbarRow, { opacity: baseRowOpacity }]}
            pointerEvents={isSearchOpen ? "none" : "auto"}
          >
            <ThemedText style={[styles.navbarTitle, { color: colors.text }]}>ServyNow</ThemedText>
            <View style={styles.navbarActions}>
              <TouchableOpacity
                onPress={onOpenChatHistory}
                style={[styles.userButton, { backgroundColor: colors.backgroundSecondary }]}
              >
                {renderIcon("message.fill", "C", 18, colors.text, "semibold")}
                {chatBadgeCount > 0 && (
                  <View style={[styles.navBadge, { backgroundColor: colors.primary }]}>
                    <ThemedText style={styles.navBadgeText}>{chatBadgeCount}</ThemedText>
                  </View>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleToggleSearch(true)}
                style={[styles.userButton, { backgroundColor: colors.backgroundSecondary }]}
              >
                {renderIcon("magnifyingglass", "S", 18, colors.text, "semibold")}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onOpenProfile}
                style={[styles.userButton, { backgroundColor: colors.backgroundSecondary }]}
              >
                {renderIcon("person.fill", "U", 18, colors.text, "semibold")}
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.searchOverlay,
              {
                width: searchBarWidth,
                opacity: searchAnim,
              },
            ]}
            pointerEvents={isSearchOpen ? "auto" : "none"}
          >
            <View
              style={[
                styles.searchBar,
                {
                  backgroundColor: colors.backgroundSecondary,
                  borderColor: colors.border,
                },
              ]}
            >
              {renderIcon("magnifyingglass", "S", 16, colors.textSecondary)}
              <TextInput
                placeholder="Buscar servicios..."
                placeholderTextColor={colors.textSecondary}
                style={[styles.searchInput, { color: colors.text }]}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus={isSearchOpen}
              />
              <TouchableOpacity
                onPress={() => handleToggleSearch(false)}
                style={styles.closeSearchBtn}
              >
                {renderIcon("xmark.circle.fill", "X", 16, colors.textSecondary, "semibold")}
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Animated.View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: navbarTotalHeight }]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.filtersBlock}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
            contentContainerStyle={{ paddingHorizontal: Spacing.three, alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => {
                setSelectedCategoryId(null);
                setSelectedSubcategoryId(null);
                setCurrentIndex(0);
              }}
              style={[
                styles.categoryChip,
                {
                  backgroundColor:
                    selectedCategoryId === null ? colors.primary : colors.backgroundElement,
                },
              ]}
            >
              <ThemedText
                style={{
                  color: selectedCategoryId === null ? "#FFFFFF" : colors.text,
                  fontWeight: "600",
                  fontSize: 13,
                }}
              >
                Todos
              </ThemedText>
            </TouchableOpacity>

            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => {
                  setSelectedCategoryId(cat.id);
                  setSelectedSubcategoryId(null);
                  setCurrentIndex(0);
                }}
                style={[
                  styles.categoryChip,
                  {
                    backgroundColor:
                      selectedCategoryId === cat.id ? colors.primary : colors.backgroundElement,
                  },
                ]}
              >
                <ThemedText
                  style={{
                    color: selectedCategoryId === cat.id ? "#FFFFFF" : colors.text,
                    fontWeight: "600",
                    fontSize: 13,
                  }}
                >
                  {cat.name}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.subcategoriesSlot}>
            {hasSubcategories && selectedCategory ? (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.subcategoriesContainer}
                contentContainerStyle={{ paddingHorizontal: Spacing.three, alignItems: "center" }}
              >
                {selectedCategory.subcategories.map((subcat) => (
                  <TouchableOpacity
                    key={subcat.id}
                    onPress={() => {
                      setSelectedSubcategoryId(subcat.id);
                      setCurrentIndex(0);
                    }}
                    style={[
                      styles.subcategoryChip,
                      {
                        backgroundColor:
                          selectedSubcategoryId === subcat.id
                            ? colors.secondary
                            : colors.backgroundSecondary,
                      },
                    ]}
                  >
                    <ThemedText
                      style={{
                        color: selectedSubcategoryId === subcat.id ? "#FFFFFF" : colors.text,
                        fontWeight: selectedSubcategoryId === subcat.id ? "600" : "400",
                        fontSize: 12,
                      }}
                    >
                      {subcat.name}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <View style={styles.subcategoriesPlaceholder} />
            )}
          </View>
        </View>

        <View style={styles.cardContainer}>
          {hasServices && currentService ? (
            <Card
              variant="elevated"
              style={{ borderRadius: 20, overflow: "hidden" }}
              onPress={() => onServicePress(currentService.id)}
            >
              <Image
                source={{ uri: currentService.image }}
                style={[styles.cardImage, { backgroundColor: colors.backgroundSecondary }]}
                resizeMode="cover"
              />

              <View style={[styles.cardContent, { backgroundColor: colors.backgroundElement }]}>
                <ThemedText style={[styles.serviceTitle, { color: colors.text }]}>
                  {currentService.title}
                </ThemedText>

                <View style={styles.providerRow}>
                  <Image
                    source={{ uri: currentService.providerAvatar }}
                    style={styles.providerAvatar}
                    resizeMode="cover"
                  />
                  <View style={styles.providerInfo}>
                    <ThemedText style={{ fontWeight: "600", color: colors.text, fontSize: 14 }}>
                      {currentService.providerName}
                    </ThemedText>
                    <View style={styles.ratingRow}>
                      {renderIcon("star.fill", "*", 13, colors.accent)}
                      <ThemedText
                        style={{ color: colors.accent, fontWeight: "700", marginLeft: 4 }}
                      >
                        {currentService.rating}
                      </ThemedText>
                      <ThemedText
                        style={{
                          color: colors.textSecondary,
                          fontSize: 12,
                          marginLeft: Spacing.one,
                        }}
                      >
                        ({currentService.reviewCount} reviews)
                      </ThemedText>
                    </View>
                  </View>
                </View>

                <ThemedText
                  style={{
                    color: colors.textSecondary,
                    fontSize: 13,
                    lineHeight: 19,
                    marginVertical: Spacing.two,
                  }}
                  numberOfLines={2}
                >
                  {currentService.description}
                </ThemedText>

                <View style={styles.tagsRow}>
                  {currentService.tags.map((tag, idx) => (
                    <View key={idx} style={[styles.tag, { backgroundColor: colors.primaryLight }]}>
                      <ThemedText
                        style={{ color: colors.primary, fontSize: 12, fontWeight: "500" }}
                      >
                        {tag}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            </Card>
          ) : (
            <Card variant="outlined" style={styles.emptyCard}>
              <ThemedText style={[styles.emptyTitle, { color: colors.text }]}>
                Sin servicios disponibles
              </ThemedText>
              <ThemedText style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
                Prueba otra subcategoria o vuelve a ver todos.
              </ThemedText>
              <Button
                title="Ver todos"
                onPress={handleResetFilters}
                variant="primary"
                size="md"
                style={{ marginTop: Spacing.three }}
              />
            </Card>
          )}
        </View>
      </ScrollView>

      <View style={[styles.floatingActions, { bottom: insets.bottom + Spacing.four }]}>
        <TouchableOpacity
          onPress={handleSkip}
          disabled={!hasServices}
          style={[
            styles.floatingButton,
            {
              backgroundColor: skipBackground,
              borderColor: colors.border,
              opacity: hasServices ? 1 : 0.55,
            },
          ]}
        >
          {renderIcon(
            "xmark",
            "X",
            22,
            hasServices ? colors.textSecondary : colors.textTertiary,
            "bold",
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleContact}
          disabled={!hasServices}
          style={[
            styles.floatingButton,
            {
              backgroundColor: hasServices ? colors.primary : colors.backgroundSecondary,
              borderColor: hasServices ? colors.primaryDark : colors.border,
              opacity: hasServices ? 1 : 0.55,
            },
          ]}
        >
          {renderIcon(
            "message.fill",
            "C",
            20,
            hasServices ? "#FFFFFF" : colors.textTertiary,
            "semibold",
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  navbarContent: {
    flex: 1,
    justifyContent: "center",
  },
  navbarTopRow: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.three,
    position: "relative",
  },
  baseNavbarRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchOverlay: {
    position: "absolute",
    right: Spacing.three,
    top: "50%",
    transform: [{ translateY: -19 }],
    height: 38,
    zIndex: 2,
  },
  navbarActions: {
    flexDirection: "row",
    gap: Spacing.two,
    alignItems: "center",
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.8,
    fontStyle: "italic",
  },
  searchBar: {
    width: "100%",
    height: 38,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.two,
    gap: Spacing.one,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
    paddingHorizontal: Spacing.one,
  },
  closeSearchBtn: {
    marginLeft: Spacing.one,
    padding: 2,
  },
  userButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  navBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  navBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 10,
    textAlign: "center",
    includeFontPadding: false,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  filtersBlock: {
    marginBottom: Spacing.one,
    marginTop: Spacing.one,
  },
  categoriesContainer: {
    marginBottom: Spacing.one,
  },
  categoryChip: {
    height: 36,
    paddingHorizontal: Spacing.three,
    borderRadius: 20,
    marginHorizontal: Spacing.one,
    justifyContent: "center",
  },
  subcategoriesContainer: {
    marginTop: Spacing.half,
    marginBottom: Spacing.one,
  },
  subcategoriesSlot: {
    minHeight: 42,
    justifyContent: "center",
  },
  subcategoriesPlaceholder: {
    height: 32,
    marginTop: Spacing.half,
    marginBottom: Spacing.one,
  },
  subcategoryChip: {
    height: 32,
    paddingHorizontal: Spacing.two,
    borderRadius: 16,
    marginHorizontal: Spacing.one,
    justifyContent: "center",
  },
  cardContainer: {
    paddingHorizontal: Spacing.four,
    marginBottom: Spacing.three,
  },
  cardImage: {
    width: "100%",
    height: 300,
  },
  cardContent: {
    padding: Spacing.four,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: Spacing.three,
  },
  providerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.two,
  },
  providerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: Spacing.two,
  },
  providerInfo: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.one,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.one,
  },
  tag: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.two,
    borderRadius: 6,
  },
  emptyCard: {
    padding: Spacing.four,
    minHeight: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: Spacing.two,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
  },
  floatingActions: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.four,
  },
  floatingButton: {
    width: FLOATING_ACTION_SIZE,
    height: FLOATING_ACTION_SIZE,
    borderRadius: FLOATING_ACTION_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
  },
});
