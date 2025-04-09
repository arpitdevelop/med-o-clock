import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import NoMedications from "@/components/NoMedications";
import Header from "@/components/Header";
import {
  dateToWeekRange,
  formatDateToYYYYMMDD,
  onlyDateDigit,
} from "@/utils/dateFormatter";
import Colors from "@/constants/Colors";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/FirebaseConfig";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { clearLocalStorage, getLocalStorage } from "@/service/storage";
import { useRouter } from "expo-router";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import MedCardItem from "@/components/MedCardItem";

export default function HomeScreen() {
  const [medList, setMedList] = useState<DocumentData[]>([]);
  const todayDate = formatDateToYYYYMMDD(new Date());
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const currentWeekDates = dateToWeekRange(); // returns Array of 7 week dates

  const router = useRouter();

  useEffect(() => {
    getMedicationsList(selectedDate);
  }, [selectedDate]);

  const getMedicationsList = async (selectedDate: string) => {
    const user = await getLocalStorage("userDetail");
    try {
      const q = query(
        collection(db, "medication"),
        where("userEmail", "==", user.email),
        where("dates", "array-contains", selectedDate)
      );
      const querySnapshot = await getDocs(q);
      setMedList([]);
      querySnapshot.forEach((doc) => {
        // console.log("docID:" + doc.id + "==>", doc.data());
        setMedList((prev) => [...prev, doc.data()]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const { top } = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: top }}>
        <Header
          title={"Hello! 👋"}
          color={"#fff"}
          iconName="settings-outline"
          onPressIcon={() => console.log("settings pressed!")}
        />
      </View>
      <View style={styles.medicationsContainer}>
        <View style={styles.dateListContainer}>
          {currentWeekDates.map((item) => (
            <View
              key={item.date}
              style={{ flexDirection: "column", alignItems: "center", flex: 1 }}
            >
              <Text style={{ paddingVertical: 8, color: Colors.DARK_GRAY }}>
                {item.day.slice(0, 3)}
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedDate(item.date)}
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
              {selectedDate === item.date && (
                <View style={styles.activeIndicator} />
              )}
            </View>
          ))}
        </View>

        {medList.length > 0 ? (
          <FlatList
            data={medList}
            renderItem={({ item, index }) => <MedCardItem data={item} />}
            keyExtractor={(item) => item.docID}
          />
        ) : (
          <NoMedications />
        )}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
  },
  medicationsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 3,
  },
  dateListContainer: {
    display: "flex",
    gap: 5,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateContainer: {
    width: "100%",
    alignItems: "center",
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
  activeIndicator: {
    backgroundColor: Colors.PRIMARY,
    width: 5,
    height: 5,
    borderRadius: 99,
    marginTop: 4,
  },
});
