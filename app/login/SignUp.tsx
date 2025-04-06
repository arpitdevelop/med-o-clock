import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

import { auth } from "./../../config/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { setLocalStorage } from "@/service/storage";

export default function SignUp() {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onCreateAccount = () => {
    if (!email || !pass || !userName) {
      Alert.alert("Invalid Email or Password!");
    }
    createUserWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: userName,
        });
        await setLocalStorage("userDetail", user);
        router.push("/(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        if (errorCode == "auth/email-already-in-use") {
          Alert.alert("User already exists!");
        }
        if (errorCode == "auth/weak-password") {
          Alert.alert("Password should be at least 6 characters long!");
        }
        // ..
      });
  };

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
          onChangeText={(value) => setUserName(value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize={"none"}
          selectionColor={Colors.PRIMARY}
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize={"none"}
          selectionColor={Colors.PRIMARY}
          onChangeText={(value) => setPass(value)}
        />
      </View>

      <View style={{ marginTop: 50, gap: 14 }}>
        <TouchableOpacity style={styles.signInBtn} onPress={onCreateAccount}>
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
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
  },
  signUpBtnTxt: {
    fontSize: 16,
    color: Colors.PRIMARY,
    fontWeight: "bold",
  },
});
