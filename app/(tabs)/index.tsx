import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import NoMedications from "@/components/NoMedications";
import Header from "@/components/Header";
import {
  dateToWeekRange,
  formatDateToYYYYMMDD,
  onlyDateDigit,
} from "@/utils/dateFormatter";
import Colors from "@/constants/Colors";
import { signOut } from "firebase/auth";
import { auth } from "@/config/FirebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { clearLocalStorage } from "@/service/storage";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const MedicationsData = null;
  const todayDate = formatDateToYYYYMMDD(new Date());
  const currentWeekDates = dateToWeekRange(); // returns Array of 7 week dates

  const router = useRouter();

  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, { paddingTop: top }]}>
        <Header
          title={"Hello! 👋"}
          color={"white"}
          iconName="settings-outline"
          onPressIcon={() => console.log("settings pressed!")}
        />
      </View>
      <View style={styles.medicationsContainer}>
        <View style={styles.dateListContainer}>
          {currentWeekDates.map((item) => (
            <View
              key={item.date}
              style={{ flexDirection: "column", alignItems: "center" }}
            >
              <Text style={{ paddingVertical: 8, color: Colors.DARK_GRAY }}>
                {item.day.slice(0, 3)}
              </Text>
              <TouchableOpacity
                style={[
                  styles.dateContainer,
                  todayDate === item.date && styles.todayDate,
                ]}
              >
                <Text
                  style={[
                    styles.dateText,
                    todayDate === item.date && { color: "white" },
                  ]}
                >
                  {onlyDateDigit(item.date)}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={{ width: "100%" }}></View>
        {!MedicationsData && <NoMedications />}
      </View>
      <View>
        <Button
          title="logout"
          onPress={() => {
            clearLocalStorage();
            signOut(auth);
            router.replace("/login");
            console.log("logout");
          }}
        />
        {/* <Redirect href={"login"} /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  progressContainer: {
    // flex: 2,
    // backgroundColor: Colors.PRIMARY,
  },
  medicationsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 3,
    // justifyContent: "center",
  },
  dateListContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateContainer: {
    padding: 16,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 99,
  },
  dateText: {
    color: Colors.DARK_GRAY,
    fontSize: 16,
  },
  todayDate: {
    backgroundColor: Colors.PRIMARY,
  },
});
