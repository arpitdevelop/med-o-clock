import { Stack } from "expo-router";
// import { SQLiteProvider, SQLiteDatabase } from "expo-sqlite";
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

  // const createDBIfNeeded = async (db: SQLiteDatabase) => {
  //   console.log("Creating db...");
  //   try {
  //     await db.execAsync(
  //       `CREATE TABLE IF NOT EXISTS medications (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         name TEXT NOT NULL,
  //         dose TEXT NOT NULL,
  //         type TEXT NOT NULL,
  //         when_to TEXT NOT NULL,
  //         start_date TEXT NOT NULL,
  //         end_date TEXT NOT NULL,
  //         comment TEXT
  //         );`
  //     );
  //     console.log("Created medications db");
  //   } catch (error) {
  //     console.log("Error Found ======>");
  //     console.log(error);
  //   }
  //   try {
  //     await db.execAsync(
  //       `CREATE TABLE IF NOT EXISTS reminders (
  //         id INTEGER PRIMARY KEY AUTOINCREMENT,
  //         medication_id INTEGER NOT NULL,
  //         time TEXT NOT NULL,
  //         FOREIGN KEY (medication_id) REFERENCES medications(id) ON DELETE CASCADE
  //         );`
  //     );
  //     console.log("Created reminders db");
  //   } catch (error) {
  //     console.log("Error Found ======>");
  //     console.log(error);
  //   }
  // };

  // <SQLiteProvider databaseName="medications.db" onInit={createDBIfNeeded}></SQLiteProvider>
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-new-medication"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
