import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { medType } from "@/constants/optionsData";
import Colors from "@/constants/Colors";

import { DocumentData } from "firebase/firestore";

interface Props {
  data: DocumentData;
}

export default function MedCardItem({ data }: Props) {
  const imageSource = medType.find((item) => item.name === data.type)?.imageSrc;
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <View style={{ justifyContent: "space-between", marginVertical: 4 }}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.when}>{data.when}</Text>
        <Text style={styles.dose}>{data.dose + " " + data.type}</Text>
      </View>
    </View>
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
});
