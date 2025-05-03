import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { medType } from "@/constants/optionsData";
import InfoCard from "@/components/actionModal/InfoCard";
import ActionBtn from "@/components/ui/ActionBtn";
import Colors from "@/constants/Colors";

export default function ActionModal() {
  const medicine = useLocalSearchParams();
  const router = useRouter();
  // console.log(medicine);
  const imageSource = medType.find(
    (item) => item.name === medicine.type
  )?.imageSrc;

  return (
    <ScrollView contentContainerStyle={{ alignItems: "center", gap: 10 }}>
      <TouchableOpacity
        style={{ alignSelf: "flex-end", padding: 10 }}
        onPress={() => router.back()}
      >
        <Ionicons name={"close"} size={30} color={"black"} />
      </TouchableOpacity>

      <Image source={imageSource} style={styles.image} />
      <Text style={styles.title}>{medicine.name}</Text>

      <View style={styles.infoContainer}>
        <InfoCard label="Date:" text={medicine.selectedDate} />
        <InfoCard label="Time:" text={medicine.time} />
      </View>

      <View style={styles.infoContainer}>
        <InfoCard label="Type:" text={medicine.type} />
        <InfoCard label="When:" text={medicine.when} />
      </View>
      <View style={[styles.infoContainer]}>
        <InfoCard label="Comment:" text={medicine.comment} />
      </View>

      {/* Buttons */}
      <View style={styles.btnsContainer}>
        <ActionBtn
          btnStyles={{ backgroundColor: Colors.RED }}
          onPress={() => console.log("Skip")}
        >
          Skip
        </ActionBtn>
        <ActionBtn
          btnStyles={{ backgroundColor: Colors.LIGHT_GREEN }}
          onPress={() => console.log("Take")}
        >
          Take
        </ActionBtn>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 20,
  },
  infoContainer: {
    display: "flex",
    paddingHorizontal: 10,
    width: "100%",
    flexDirection: "row",
    gap: 10,
  },
  btnsContainer: {
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    marginVertical: 30,
  },
});
