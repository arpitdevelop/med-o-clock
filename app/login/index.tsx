import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import LoginImg from "../../assets/images/login.png";
import Colors from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View>
      <View style={styles.imgContainer}>
        <Image source={LoginImg} style={styles.image} />
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Never Miss The Meds Again!</Text>
        <Text style={styles.tagline}>
          Stay on Top of Your Health with Timely Reminders Because Every Dose
          Matters!
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => router.push("/login/SignIn")}
        >
          <Text style={styles.btnTxt}>Get Started!</Text>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>
          Note: By clicking Get Started, you are agreeing to the app's terms &
          conditions!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 60,
  },
  image: {
    width: 210,
    height: 450,
    borderRadius: 23,
  },
  headingContainer: {
    alignItems: "center",
    padding: 25,
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.PRIMARY,
    gap: 16,
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tagline: {
    fontSize: 17,
    color: "#fff",
    textAlign: "center",
  },
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 99,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 10,
    color: "#fff",
  },
});
