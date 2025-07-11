import { initDatabase } from "@/database/database";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);

  // Reanimated 'value' warning ignore
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in 'strict: true' mode by default
  });

  useEffect(() => {
    console.log("init layout");
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      // Initialize database
      await initDatabase();
      setLoading(false);
    } catch (error) {
      console.error("Error initializing app:", error);
      Alert.alert("Error", "Failed to initialize the app. Please restart.");
      throw error;
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading App...</Text>
      </View>
    );
  }

  return (
    <SQLiteProvider databaseName="medicinesDB">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="login" /> */}
        <Stack.Screen
          name="add-new-medication"
          // options={{ presentation: "modal" }}
        />
        <Stack.Screen name="action-modal" options={{ presentation: "modal" }} />
      </Stack>
    </SQLiteProvider>
  );
}
