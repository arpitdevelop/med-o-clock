import { StyleSheet, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Colors from "@/constants/Colors";
import { formatDateToString } from "@/utils/dateFormatter";

interface Props {
  date: Date | string;
  dateFor: string;
  onDateSelect: (key: string, value: Date) => void;
}
export default function DatePicker({ date, dateFor, onDateSelect }: Props) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const dateLabel = () => {
    if (typeof date === "string") {
      return dateFor;
    } else {
      return formatDateToString(date);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.nameInputContainer, { flex: 1 }]}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons
          name="calendar-outline"
          size={24}
          color={Colors.PRIMARY}
          style={styles.inputIcon}
        />
        <Text style={[styles.textInput, !date && { color: Colors.DARK_GRAY }]}>
          {dateLabel()}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date) => {
          onDateSelect(
            dateFor === "Start Date" ? "startDate" : "endDate",
            new Date(date)
          );
          setShowDatePicker(false);
        }}
        onCancel={() => setShowDatePicker(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  nameInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginTop: 15,
    height: 70,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.LIGHT_GRAY,
    gap: 10,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
  },
  inputIcon: {
    borderRightWidth: 1,
    paddingRight: 10,
    borderRightColor: Colors.LIGHT_GRAY,
  },
  datePicker: {
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
});
