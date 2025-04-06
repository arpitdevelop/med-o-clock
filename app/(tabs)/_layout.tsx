import { Tabs, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import { useEffect, useState } from "react";
import { getLocalStorage } from "@/service/storage";

export default function TabLayout() {
  const router = useRouter();

  // const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // // check if login or not
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     setIsAuthenticated(true);
  //     // ...
  //   } else {
  //     // User is signed out
  //     setIsAuthenticated(false);
  //     router.replace("/login");
  //     // ...
  //   }
  // });

  const getUserDetails = async () => {
    const userDetail = await getLocalStorage("userDetail");
    if (!userDetail) {
      router.replace("/login");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddNew"
        options={{
          tabBarLabel: "Add New",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
