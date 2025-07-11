import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setLocalStorage } from "@/service/storage";

export default function SignIn() {
  const router = useRouter();
  const [showPass, setShowPass] = useState(true);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignIn = () => {
    console.log("tapped");
    setLoading(true);
    if (!email || !pass) {
      Alert.alert("Invalid Email or Password!");
    }

    signInWithEmailAndPassword(auth, email, pass)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        await setLocalStorage("userDetail", user);
        router.replace("/(tabs)");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        if (errorCode == "auth/wrong-password") {
          Alert.alert("Wrong Password!");
        }
        if (errorCode == "auth/user-not-found") {
          Alert.alert("User Doesn't Exist, Create New Account Instead!");
        }
        if (errorCode == "auth/invalid-credential") {
          Alert.alert("Invalid Email or Password!");
        }
        if (errorCode == "auth/invalid-email") {
          Alert.alert("Check your email!");
        }
      })
      .then(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={[styles.heading, { color: Colors.PRIMARY }]}>
        We Missed You ❤️
      </Text>
      <Text style={[styles.heading, { color: Colors.DARK_GRAY }]}>
        Let's Sign You In...
      </Text>

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
        <View
          style={[
            styles.input,
            { flexDirection: "row", justifyContent: "space-between" },
          ]}
        >
          <TextInput
            style={{ flex: 1 }}
            placeholder="Password"
            autoCapitalize={"none"}
            selectionColor={Colors.PRIMARY}
            secureTextEntry={showPass}
            onChangeText={(value) => setPass(value)}
          />
          <TouchableOpacity onPress={() => setShowPass((prev) => !prev)}>
            <Ionicons
              name={showPass ? "eye" : "eye-off"}
              size={15}
              color={Colors.DARK_GRAY}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 50, gap: 14 }}>
        <TouchableOpacity style={styles.signInBtn} onPress={onSignIn}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.signInBtnTxt}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          disabled={loading}
          style={styles.signUpBtn}
          onPress={() => router.push("/login/SignUp")}
        >
          <Text style={styles.signUpBtnTxt}>Create New Account</Text>
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
