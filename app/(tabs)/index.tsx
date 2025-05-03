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
  fbTimestampToTime,
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
  Timestamp,
  where,
} from "firebase/firestore";
import MedCardItem from "@/components/MedCardItem";

export default function HomeScreen() {
  const [loading, setLoading] = useState(false);
  const [medList, setMedList] = useState<DocumentData[]>([]);
  const todayDate = formatDateToYYYYMMDD(new Date());
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const currentWeekDates = dateToWeekRange(); // returns Array of 7 week dates

  const router = useRouter();

  useEffect(() => {
    getMedicationsList(selectedDate);
  }, [selectedDate]);

  const getMedicationsList = async (selectedDate: string) => {
    setLoading(true);
    const user = await getLocalStorage("userDetail");
    setMedList([]);

    try {
      if (user) {
        const q = query(
          collection(db, "medication"),
          where("userEmail", "==", user.email),
          where("dates", "array-contains", selectedDate)
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          // console.log("docID:" + doc.id + "==>", doc.data());
          setMedList((prev) => [...prev, doc.data()]);
        });
      } else {
        handleLogout();
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      const errorCode = error.code;
      console.log(errorCode);
      if (errorCode == "permission-denied") {
        handleLogout();
      }
      setLoading(false);
    }
  };

  const { top } = useSafeAreaInsets();

  const handleLogout = () => {
    clearLocalStorage();
    signOut(auth);
    router.replace("/login");
    console.log("logout");
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: top }}>
        <Header
          title={"Hello! 👋"}
          color={"#fff"}
          iconName="medkit-outline"
          onPressIcon={() => router.push("/add-new-medication")}
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

        <FlatList
          refreshing={loading}
          onRefresh={() => getMedicationsList(selectedDate)}
          data={medList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
            // To repeat same entry for multiple reminders
            item.reminders.map((reminder: { id: number; time: Timestamp }) => (
              <TouchableOpacity
                key={reminder.id}
                onPress={() =>
                  router.push({
                    pathname: "/action-modal",
                    params: {
                      selectedDate: selectedDate,
                      time: fbTimestampToTime(reminder.time),
                      ...item,
                    },
                  })
                }
              >
                <MedCardItem data={item} reminder={reminder.time} />
              </TouchableOpacity>
            ))
          }
          keyExtractor={(item) => item.docID}
        />
        {medList?.length < 1 && !loading && <NoMedications />}
      </View>
      <View>
        <Button title="logout" onPress={handleLogout} />
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
    paddingHorizontal: 12,
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
