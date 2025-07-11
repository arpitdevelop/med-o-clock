import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { dateToWeekRange } from "@/utils/dateFormatter";
import moment from "moment";

interface Props {
  dateIndex: number;
  onDatePress: (index: number) => void;
}

const DatesRow = ({ dateIndex, onDatePress }: Props) => {
  const todayDate = moment().format("YYYY-MM-DD");
  const currentWeekDates = dateToWeekRange();
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <View style={styles.dateListContainer}>
      {currentWeekDates.map((date, index) => (
        <View
          key={date}
          style={{ flexDirection: "column", alignItems: "center", flex: 1 }}
        >
          <Text style={{ paddingVertical: 8, color: Colors.DARK_GRAY }}>
            {weekDays[index]}
          </Text>
          <TouchableOpacity
            onPress={() => onDatePress(index)}
            style={[
              styles.dateContainer,
              todayDate === date && styles.todayDate,
            ]}
          >
            <Text
              style={[
                styles.dateText,
                todayDate === date && { color: "white" },
              ]}
            >
              {date.slice(-2)}
            </Text>
          </TouchableOpacity>
          {dateIndex === index && <View style={styles.activeIndicator} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dateListContainer: {
    display: "flex",
    gap: 5,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  dateContainer: {
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 2,
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 20,
  },
  dateText: {
    color: Colors.DARK_GRAY,
    fontSize: 16,
  },
  todayDate: {
    backgroundColor: Colors.PRIMARY,
  },
  activeIndicator: {
    backgroundColor: Colors.PRIMARY,
    width: 5,
    height: 5,
    borderRadius: 99,
    marginTop: 4,
  },
});

export default DatesRow;
