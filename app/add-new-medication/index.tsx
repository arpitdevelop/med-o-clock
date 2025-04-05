import {
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

import Header from "@/components/Header";
import AddMedicationForm from "@/components/addNewMedication/AddMedicationForm";
import Colors from "@/constants/Colors";
import { formDataType } from "@/constants/types";
// import { useSQLiteContext } from "expo-sqlite";

import {
  formatDateToStringFull,
  formatTimeToHHMM,
} from "@/utils/dateFormatter";

export default function AddNewMedication() {
  const router = useRouter();
  // const database = useSQLiteContext();

  // disables keyboard when scroll
  const handleScroll = () => {
    Keyboard.dismiss();
  };

  // input data state
  const [formData, setFormData] = useState<formDataType>({
    name: { value: "", isValid: true },
    type: { value: "", isValid: true },
    dose: { value: "", isValid: true },
    when: { value: "", isValid: true },
    startDate: { value: "", isValid: true },
    endDate: { value: "", isValid: true },
    comment: { value: "", isValid: true },
    reminders: { value: [], isValid: true },
  });

  // update input data state on change
  const handleInputChange = (
    key: string,
    value: string | Date | { id: number; time: Date }[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [key]: { value: value, isValid: true },
    }));
    console.log(formData);
  };

  // on pressing Submit button
  const handleSubmit = async () => {
    // converting formData in proper format for our data.
    const submitData = {
      name: formData.name.value.trim(),
      type: formData.type.value,
      dose: formData.dose.value,
      when: formData.when.value,
      startDate: new Date(formData.startDate.value),
      endDate: new Date(formData.endDate.value),
      comment: formData.comment.value,
      reminders: [...formData.reminders.value],
    };

    // Checking if the input data is valid.
    const nameIsValid: boolean = submitData.name.length > 0;
    const typeIsValid: boolean = submitData.type.length > 0;
    const doseIsValid: boolean = submitData.dose.length > 0;
    const whenIsValid: boolean = submitData.when.length > 0;
    const startDateIsValid: boolean =
      submitData.startDate.toString() !== "Invalid Date";
    const endDateIsValid: boolean =
      submitData.endDate.toString() !== "Invalid Date";
    const remindersIsValid: boolean = submitData.reminders.length > 0;

    if (
      !nameIsValid ||
      !typeIsValid ||
      !doseIsValid ||
      !whenIsValid ||
      !startDateIsValid ||
      !endDateIsValid ||
      !remindersIsValid
    ) {
      Alert.alert("Error", "Please fill all the fields correctly");
      setFormData((prev) => {
        return {
          name: { value: prev.name.value, isValid: nameIsValid },
          type: { value: prev.type.value, isValid: typeIsValid },
          dose: { value: prev.dose.value, isValid: doseIsValid },
          when: { value: prev.when.value, isValid: whenIsValid },
          startDate: { value: prev.startDate.value, isValid: startDateIsValid },
          endDate: { value: prev.endDate.value, isValid: endDateIsValid },
          comment: { value: prev.comment.value, isValid: true },
          reminders: { value: prev.reminders.value, isValid: remindersIsValid },
        };
      });
      console.log(formData);
      return;
    }

    console.log("verified");
    console.log(submitData);

    // try {
    //   await database.withTransactionAsync(async () => {
    //     const result = await database.runAsync(
    //       "INSERT INTO medications (name,dose,type,when_to,start_date,end_date,comment) VALUES (?, ?, ?, ?, ?, ?, ?)",
    //       submitData.name,
    //       submitData.dose,
    //       submitData.type,
    //       submitData.when,
    //       formatDateToStringFull(submitData.startDate),
    //       formatDateToStringFull(submitData.endDate),
    //       submitData.comment
    //     );
    //     console.log(
    //       "submitted medications in db ===> insertID: ",
    //       result.lastInsertRowId
    //     );
    //     const medicationId = result.lastInsertRowId;

    //     for (const reminder of submitData.reminders) {
    //       try {
    //         await database.runAsync(
    //           `INSERT INTO reminders (medication_id, time) VALUES (?, ?)`,
    //           medicationId,
    //           formatTimeToHHMM(reminder.time)
    //         );
    //         console.log("submitted reminder in db: ", reminder.time);
    //       } catch (reminderError) {
    //         console.error("Error inserting reminder:", reminderError);
    //         throw reminderError; // Rollback the transaction on error
    //       }
    //     }
    //   });
    // } catch (error) {
    //   console.error("Transaction failed:", error);
    // }
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
      >
        <Header
          title={"Add New Medication"}
          color={"black"}
          iconName="close"
          onPressIcon={() => router.back()}
        />
        <AddMedicationForm
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </ScrollView>
      <View style={styles.submitBtnContainer}>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "white",
    flex: 1,
  },
  submitBtnContainer: {
    flex: 1,
    position: "absolute", // Position the button absolutely
    bottom: 0, // Distance from the bottom
    width: "100%",
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 40,
    paddingHorizontal: 15,
    // maxHeight: 70,
    alignItems: "center",
    // justifyContent: "center",
  },
  submitBtn: {
    width: "100%",
    marginHorizontal: 16,
    height: 60,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.LIGHT_GREEN,
    borderRadius: 12,
    elevation: 1.5,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  submitBtnText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});
