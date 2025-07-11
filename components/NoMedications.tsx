import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function NoMedications() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/medicine.png")}
        style={styles.image}
      />
      <Text style={styles.mainText}>No Medications</Text>
      <Text style={styles.subText}>You have no medications for today!</Text>
      {/* <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/add-new-medication")}
      >
        <Text style={styles.buttonText}>+ Add New Medication</Text>
      </TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    width: width - 24,
    gap: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  mainText: {
    fontSize: 24,
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
