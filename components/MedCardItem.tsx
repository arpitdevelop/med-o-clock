import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { medType } from "@/constants/optionsData";

import Animated, { FadeIn } from "react-native-reanimated";
import { formatTime12Hour } from "@/utils/dateFormat";
import { Medicine } from "@/constants/types";
import Separator from "./ui/Separator";

const { width } = Dimensions.get("window");

interface Props {
  data: Medicine;
  reminder: string;
}

export default function MedCardItem({ data, reminder }: Props) {
  const imageSource = medType.find((item) => item.name === data.type)?.imageSrc;
  // console.log(reminder);
  return (
    <>
      <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
        <Image source={imageSource} style={styles.image} />
        <View style={{ justifyContent: "space-between", gap: 4 }}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.when}>{data._when}</Text>
          <Text style={styles.dose}>{data.dose + " " + data.type}</Text>
        </View>
        <View style={{ flex: 1 }} />
        <Text style={styles.time}>{formatTime12Hour(reminder)}</Text>
      </Animated.View>
      <Separator />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 16,
    paddingVertical: 8,
    // borderRadius: 12,
    // backgroundColor: Colors.LIGHT_GRAY,
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    width: width - 24,
  },
  image: {
    width: 70,
    height: 70,
    padding: 10,
    // backgroundColor: "red",
    // borderRadius: 16,
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
