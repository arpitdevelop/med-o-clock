import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function NoMedications() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/medicine.png")}
        style={styles.image}
      />
      <Text style={styles.mainText}>No Medications</Text>
      <Text style={styles.subText}>
        You have 0 medications setup, please setup a new one!
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-new-medication")}
      >
        <Text style={styles.buttonText}>+ Add New Medication</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  mainText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subText: {
    color: Colors.DARK_GRAY,
    fontSize: 16,
    textAlign: "center",
  },
  addButton: {
    margin: 15,
    width: "80%",
    alignItems: "center",
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
