import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { medType } from "@/constants/optionsData";
import Colors from "@/constants/Colors";

import { DocumentData, Timestamp } from "firebase/firestore";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { fbTimestampToTime } from "@/utils/dateFormatter";

interface Props {
  data: DocumentData;
  reminder: Timestamp;
}

export default function MedCardItem({ data, reminder }: Props) {
  const imageSource = medType.find((item) => item.name === data.type)?.imageSrc;
  // console.log(reminder);
  return (
    // <Animated.View entering={FadeInDown.duration(500)} style={styles.container}>
    <Animated.View
      entering={FadeIn.duration(500)}
      // exiting={FadeOut.duration(500)}
      style={styles.container}
    >
      <Image source={imageSource} style={styles.image} />
      <View style={{ justifyContent: "space-between", gap: 4 }}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.when}>{data.when}</Text>
        <Text style={styles.dose}>{data.dose + " " + data.type}</Text>
      </View>
      <View style={{ flex: 1 }} />
      <Text style={styles.time}>{fbTimestampToTime(reminder)}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    padding: 8,
    borderRadius: 12,
    backgroundColor: Colors.LIGHT_GRAY,
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  when: {
    fontSize: 14,
    fontWeight: "200",
  },
  dose: {
    fontSize: 14,
    fontWeight: "200",
  },
  time: {
    fontSize: 24,
    fontWeight: "300",
    marginRight: 10,
  },
});
