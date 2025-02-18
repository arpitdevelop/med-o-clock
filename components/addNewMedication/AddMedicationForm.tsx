import { View, TextInput, StyleSheet, Text, Alert } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import FormList from "./FormList";
import Colors from "@/constants/Colors";
import { formDataType } from "@/constants/types";
import DropdownPicker from "./DropdownPicker";
import DatePicker from "./DatePicker";
import AddReminder from "./AddReminder";

interface Props {
  formData: formDataType;
  handleInputChange: (
    key: string,
    value: string | Date | { id: number; time: Date }[]
  ) => void;
}

export default function AddMedicationForm({
  formData,
  handleInputChange,
}: Props) {
  return (
    <View style={{ flex: 1, paddingBottom: 250 }}>
      {/* List of types */}
      <FormList
        type={formData.type.value}
        handleInputChange={handleInputChange}
      />

      {/* Name Input Container */}
      <View style={styles.nameInputContainer}>
        <Ionicons
          name="medkit-outline"
          size={24}
          color={Colors.PRIMARY}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Name (Dolo 650)"
          placeholderTextColor={Colors.DARK_GRAY}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>

      {/* Dose Input Container */}
      <View style={styles.nameInputContainer}>
        <Ionicons
          name="eyedrop-outline"
          size={24}
          color={Colors.PRIMARY}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Dose (2, 5ml, etc.)"
          placeholderTextColor={Colors.DARK_GRAY}
          onChangeText={(value) => handleInputChange("dose", value)}
        />
      </View>

      {/* 'When to take' picker */}
      <DropdownPicker onOptionSelect={handleInputChange} />

      {/* Date Picker */}
      <View style={styles.datePickerContainer}>
        <DatePicker
          dateFor="Start Date"
          date={formData?.startDate.value}
          onDateSelect={handleInputChange}
        />
        <DatePicker
          dateFor="End Date"
          date={formData?.endDate.value}
          onDateSelect={handleInputChange}
        />
      </View>

      {/* Comment */}
      <View style={styles.nameInputContainer}>
        <FontAwesome
          name="pencil-square-o"
          size={24}
          color={Colors.PRIMARY}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Comment"
          placeholderTextColor={Colors.DARK_GRAY}
          onChangeText={(value) => handleInputChange("comment", value)}
        />
      </View>

      {/* Separator */}
      <View style={styles.separator}>
        <Text style={styles.separatorText}>Set Reminders</Text>
      </View>

      {/* Time Reminder Picker */}
      <AddReminder
        reminders={formData.reminders.value}
        onTimeSelect={handleInputChange}
      >
        {formData.reminders.value.length > 0
          ? "Add Another Reminder"
          : "Add a Reminder"}
      </AddReminder>

      {/* <TimePicker time={formData?.time} onTimeSelect={handleInputChange} /> */}
    </View>
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

  datePickerContainer: {
    flexDirection: "row",
    gap: 5,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: Colors.DARK_GRAY,
    alignItems: "center",
    marginVertical: 20,
  },
  separatorText: {
    fontSize: 14,
    marginBottom: -8,
    backgroundColor: "white",
    paddingHorizontal: 18,
  },
});
