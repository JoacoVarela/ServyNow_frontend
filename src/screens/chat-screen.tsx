import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors, Spacing } from "@/constants/theme";
import { ThemedText } from "@/components/themed-text";
import { mockChatMessages, mockProvider } from "@/mocks/data";

export interface ChatScreenProps {
  onBack: () => void;
  contactToastSignal?: number;
}

export function ChatScreen({ onBack, contactToastSignal = 0 }: ChatScreenProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [messages, setMessages] = useState(mockChatMessages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (!contactToastSignal) return;
    const message = "Te has contactado correctamente";
    if (Platform.OS === "android") {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }
    Alert.alert("Contacto", message);
  }, [contactToastSignal]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: String(messages.length + 1),
      senderId: "client1",
      senderName: "Tú",
      senderAvatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      content: newMessage,
      timestamp: new Date(),
      type: "text" as const,
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: colors.backgroundElement,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ThemedText style={{ fontSize: 24 }}>←</ThemedText>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image source={{ uri: mockProvider.avatar }} style={styles.headerAvatar} />
          <View>
            <ThemedText style={{ fontWeight: "600", fontSize: 16 }}>{mockProvider.name}</ThemedText>
            <ThemedText style={{ fontSize: 12, color: colors.textSecondary }}>
              Tiempo de respuesta: {mockProvider.responseTime}
            </ThemedText>
          </View>
        </View>
        <TouchableOpacity style={{ padding: Spacing.two }}>
          <ThemedText style={{ fontSize: 18 }}>⋮</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        contentContainerStyle={[styles.messagesContainer, { paddingHorizontal: Spacing.three }]}
        bounces={false}
      >
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageRow,
              msg.senderId === "client1" ? styles.clientMessage : styles.providerMessage,
            ]}
          >
            {msg.senderId !== "client1" && (
              <Image source={{ uri: msg.senderAvatar }} style={styles.messageAvatar} />
            )}
            <View
              style={[
                styles.messageBubble,
                {
                  backgroundColor:
                    msg.senderId === "client1" ? colors.primary : colors.backgroundSecondary,
                },
              ]}
            >
              <ThemedText
                style={{
                  color: msg.senderId === "client1" ? "#FFFFFF" : colors.text,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {msg.content}
              </ThemedText>
              <ThemedText
                style={{
                  color: msg.senderId === "client1" ? "rgba(255,255,255,0.7)" : colors.textTertiary,
                  fontSize: 11,
                  marginTop: Spacing.one,
                  fontWeight: "400",
                }}
              >
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </ThemedText>
            </View>
            {msg.senderId === "client1" && (
              <Image source={{ uri: msg.senderAvatar }} style={styles.messageAvatar} />
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : Spacing.four}
      >
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: colors.backgroundElement,
              borderTopColor: colors.border,
            },
          ]}
        >
          <TouchableOpacity style={{ padding: Spacing.two }}>
            <ThemedText style={{ fontSize: 20 }}>📎</ThemedText>
          </TouchableOpacity>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.backgroundSecondary,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor={colors.textTertiary}
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxHeight={100}
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
            style={[
              styles.sendButton,
              {
                backgroundColor: newMessage.trim() ? colors.primary : colors.textTertiary,
              },
            ]}
          >
            <ThemedText style={{ fontSize: 18, color: "#FFFFFF" }}>➤</ThemedText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: Spacing.two,
    marginRight: Spacing.two,
  },
  headerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: Spacing.two,
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: Spacing.four,
    justifyContent: "flex-end",
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: Spacing.two,
    gap: Spacing.two,
  },
  clientMessage: {
    justifyContent: "flex-end",
  },
  providerMessage: {
    justifyContent: "flex-start",
  },
  messageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.two,
    gap: Spacing.two,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    maxHeight: 100,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
