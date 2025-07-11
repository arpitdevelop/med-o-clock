import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Colors from "@/constants/Colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { getMedicines } from "@/database/database";
import { useSQLiteContext } from "expo-sqlite";
import DatesRow from "@/components/home/DatesRow";
import { Medicine } from "@/constants/types";
import moment from "moment";
import MedList from "@/components/home/MedList";
import { dateToWeekRange } from "@/utils/dateFormatter";
import Separator from "@/components/ui/Separator";
import Ionicons from "@expo/vector-icons/Ionicons";
const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  const [loading, setLoading] = useState(true);
  const [medList, setMedList] = useState<Medicine[]>([]);
  const currentWeekDates = dateToWeekRange();
  const initialIndex = moment().diff(moment(currentWeekDates[0]), "days");
  const [dateIndex, setDateIndex] = useState<number>(initialIndex);

  const medicationScrollRef = useRef<FlatList<number>>(null);

  const db = useSQLiteContext();

  useLayoutEffect(() => {
    getDataDB();
  }, []);

  const getDataDB = async () => {
    setLoading(true);
    try {
      const result = await getMedicines(db);
      console.log(result);
      setMedList(result);
      setLoading(false);
    } catch (error) {
      console.error("Error initializing app:", error);
      Alert.alert("Error", "Failed to initialize the app. Please restart.");
    }
  };

  const filterMedsByDate = (date: string) => {
    return medList.filter((medicine) =>
      moment(date).isBetween(
        medicine.start_date,
        medicine.end_date,
        "day",
        "[]"
      )
    );
  };

  const handleLogout = () => {
    console.log("logout");
  };

  const onDatePress = (index: number) => {
    setDateIndex(index);
    medicationScrollRef.current?.scrollToIndex({ index, animated: true });
  };

  const onMedicationScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ): void => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (width - 24));
    setDateIndex(index);
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
        <DatesRow dateIndex={dateIndex} onDatePress={onDatePress} />
        <Separator />
        <FlatList
          ref={medicationScrollRef}
          data={[0, 1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => (
            <MedList
              medList={filterMedsByDate(currentWeekDates[item])}
              currentWeekDates={currentWeekDates}
              loading={loading}
              reloadMeds={getDataDB}
            />
          )}
          keyExtractor={(item) => item.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMedicationScroll}
          // onScroll={onMedicationScroll}
          getItemLayout={(_, index) => ({
            length: width - 24,
            offset: (width - 24) * index,
            index,
          })}
          initialScrollIndex={dateIndex}
        />
      </View>

      <TouchableOpacity
        style={styles.floatingIcon}
        onPress={() => router.push("/add-new-medication")}
      >
        <Ionicons name="add-outline" size={28} color="white" />
      </TouchableOpacity>

      {/* <View>
        <Button title="logout" onPress={handleLogout} />
      </View> */}
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
  floatingIcon: {
    position: "absolute",
    bottom: 24,
    right: 24,
    padding: 16,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
    shadowColor: "black",
    // shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
