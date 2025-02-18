import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import NoMedications from "@/components/NoMedications";
import Header from "@/components/Header";
import {
  dateToWeekRange,
  formatDateToYYYYMMDD,
  onlyDateDigit,
} from "@/utils/dateFormatter";
import Colors from "@/constants/Colors";

export default function HomeScreen() {
  const MedicationsData = null;
  const todayDate = formatDateToYYYYMMDD(new Date());
  const currentWeekDates = dateToWeekRange(); // returns Array of 7 week dates
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flex: 2,
    backgroundColor: Colors.PRIMARY,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  medicationsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "white",
    flex: 3,
    justifyContent: "center",
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
