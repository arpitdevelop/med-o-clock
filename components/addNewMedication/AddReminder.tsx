import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Colors from "@/constants/Colors";
import SwipeableReminder from "./SwipeableReminder";

interface Props {
  children: string;
  reminders: { id: number; time: Date }[];
  onTimeSelect: (key: string, value: { id: number; time: Date }[]) => void;
}

export default function AddReminder({
  children,
  reminders,
  onTimeSelect,
}: Props) {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [editReminderId, setEditReminderId] = useState<number | null>(null);

  const editReminder = (itemId: number) => {
    setEditReminderId(itemId);
  };

  const deleteReminder = (itemId: number) => {
    if (reminders) {
      const newReminders = reminders?.filter(
        (reminder) => reminder.id !== itemId
      );
      onTimeSelect("reminders", [...newReminders]);
    }
  };

  return (
    <>
      {reminders?.map((item, index) => (
        <SwipeableReminder
          key={item.id}
          reminder={item}
          index={index}
          editReminder={editReminder}
          deleteReminder={deleteReminder}
        />
      ))}

      <TouchableOpacity
        style={styles.reminderBtn}
        onPress={() => setShowTimePicker(true)}
      >
        <Text style={styles.reminderBtnText}>{children}</Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showTimePicker}
        mode="time"
        onConfirm={(time) => {
          const randomId = Math.random() * 20;
          onTimeSelect(
            "reminders",
            reminders
              ? [
                  ...reminders,
                  {
                    id: randomId,
                    time: new Date(time),
                  },
                ]
              : [{ id: randomId, time: new Date(time) }]
          );
          setShowTimePicker(false);
        }}
        onCancel={() => setShowTimePicker(false)}
      />
      <DateTimePickerModal
        isVisible={editReminderId !== null}
        mode="time"
        onConfirm={(time) => {
          const newReminders = reminders.map((reminder) =>
            reminder.id === editReminderId
              ? { ...reminder, time: new Date(time) }
              : reminder
          );
          onTimeSelect("reminders", [...newReminders]);
          setEditReminderId(null);
        }}
        onCancel={() => {
          setEditReminderId(null);
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  reminderBtn: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: Colors.PRIMARY,
    backgroundColor: "white",
    marginTop: 22,
    borderRadius: 12,
    height: 50,
    elevation: 1.5,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  textInput: {
    fontSize: 16,
  },
  reminderBtnText: {
    fontSize: 16,
    color: "black",
  },
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
  swipeableBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    maxWidth: 100,
  },
});
