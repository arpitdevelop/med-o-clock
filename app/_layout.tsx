import { Stack } from "expo-router";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

export default function RootLayout() {
  // Reanimated 'value' warning ignore
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in 'strict: true' mode by default
  });
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen
        name="add-new-medication"
        // options={{ presentation: "modal" }}
      />
      <Stack.Screen name="action-modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
