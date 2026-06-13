import React, { useState } from "react";
import { View } from "react-native";
import { AuthScreen } from "@/screens/auth-screen";
import { FeedScreen } from "@/screens/feed-screen";
import { ServiceDetailScreen } from "@/screens/service-detail-screen";
import { ChatScreen } from "@/screens/chat-screen";

type AppScreen = "auth" | "feed" | "service-detail" | "chat";

export default function AppFlow() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("auth");
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [chatBadgeCount, setChatBadgeCount] = useState(0);
  const [contactToastSignal, setContactToastSignal] = useState(0);

  const handleLoginSuccess = () => {
    setCurrentScreen("feed");
  };

  const handleServicePress = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setCurrentScreen("service-detail");
  };

  const handleContactPress = () => {
    setChatBadgeCount((prev) => prev + 1);
    setContactToastSignal((prev) => prev + 1);
    setCurrentScreen("chat");
  };

  const handleDirectContact = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    setChatBadgeCount((prev) => prev + 1);
    setContactToastSignal((prev) => prev + 1);
    setCurrentScreen("chat");
  };

  const handleOpenChatHistory = () => {
    setCurrentScreen("chat");
  };

  const handleOpenProfile = () => {
    setCurrentScreen("auth");
  };

  const handleBackFromDetail = () => {
    setCurrentScreen("feed");
  };

  const handleBackFromChat = () => {
    setCurrentScreen("feed");
  };

  return (
    <View style={{ flex: 1 }}>
      {currentScreen === "auth" && <AuthScreen onLoginSuccess={handleLoginSuccess} />}
      {currentScreen === "feed" && (
        <FeedScreen
          onServicePress={handleServicePress}
          onDirectContact={handleDirectContact}
          chatBadgeCount={chatBadgeCount}
          onOpenChatHistory={handleOpenChatHistory}
          onOpenProfile={handleOpenProfile}
        />
      )}
      {currentScreen === "service-detail" && selectedServiceId && (
        <ServiceDetailScreen
          serviceId={selectedServiceId}
          onBack={handleBackFromDetail}
          onContact={handleContactPress}
        />
      )}
      {currentScreen === "chat" && (
        <ChatScreen onBack={handleBackFromChat} contactToastSignal={contactToastSignal} />
      )}
    </View>
  );
}
