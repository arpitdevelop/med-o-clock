import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>New To This?</Text>
      <Text style={[styles.heading, { color: Colors.PRIMARY }]}>
        Start With Med-O-Clock!❤️
      </Text>
      <Text style={[styles.heading, { color: Colors.DARK_GRAY }]}>
        Let's Register ...
      </Text>

      <View style={styles.inputContainer}>
        <Text>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          selectionColor={Colors.PRIMARY}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          selectionColor={Colors.PRIMARY}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          selectionColor={Colors.PRIMARY}
        />
      </View>

      <View style={{ marginTop: 50, gap: 14 }}>
        <TouchableOpacity
          style={styles.signInBtn}
          // onPress={() => router.push("/login/signIn")}
        >
          <Text style={styles.signInBtnTxt}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpBtn}
          onPress={() => router.push("/login/SignIn")}
        >
          <Text style={styles.signUpBtnTxt}>Already Have An Account?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 12,
  },
  inputContainer: {
    marginTop: 18,
  },
  input: {
    padding: 14,
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.DARK_GRAY,
  },
  signInBtn: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  signInBtnTxt: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  signUpBtn: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 99,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  signUpBtnTxt: {
    fontSize: 16,
    color: Colors.PRIMARY,
    fontWeight: "bold",
  },
});
