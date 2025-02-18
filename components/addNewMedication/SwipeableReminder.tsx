import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
// TODO: replace by Reanimated Swipeable once it's stable and fixed left actions
// import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { formatTimeToString } from "@/utils/dateFormatter";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";

interface Props {
  reminder: { id: number; time: Date };
  index: number;
  editReminder: (itemId: number) => void;
  deleteReminder: (itemId: number) => void;
}

export default function SwipeableReminder({
  reminder,
  index,
  editReminder,
  deleteReminder,
}: Props) {
  const swipeableRef = useRef<any>(null); // used any to ignore annoying ts warnings

  const handleRightSwipe = (itemId: number) => {
    return (
      <TouchableOpacity
        style={[styles.swipeableBtn, { backgroundColor: "red" }]}
        onPress={() => {
          deleteReminder(itemId);
          swipeableRef.current?.close();
        }}
      >
        <Ionicons name="trash" size={18} color="white" />
      </TouchableOpacity>
    );
  };

  const handleLeftSwipe = (itemId: number) => {
    return (
      <TouchableOpacity
        style={[styles.swipeableBtn, { backgroundColor: "blue" }]}
        onPress={() => {
          editReminder(itemId);
          swipeableRef.current?.close();
        }}
      >
        <Ionicons name="pencil" size={18} color="white" />
      </TouchableOpacity>
    );
  };
  // TODO: replace by Reanimated Swipeable once it's stable and fixed left actions
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={() => handleRightSwipe(reminder.id)}
        renderLeftActions={() => handleLeftSwipe(reminder.id)}
        friction={2}
        activeOffsetX={[-10, 10]} // Horizontal swipe threshold
        failOffsetY={[-10, 10]} // Ignore vertical touches
      >
        <View style={styles.reminderListItem}>
          <Text style={styles.textInput}>{`Dose ${index + 1}`}</Text>
          <Text style={styles.textInput}>
            {formatTimeToString(reminder.time)}
          </Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  reminderListItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
    backgroundColor: "white",
  },
  textInput: {
    fontSize: 16,
  },
  swipeableBtn: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    maxWidth: 100,
  },
});
