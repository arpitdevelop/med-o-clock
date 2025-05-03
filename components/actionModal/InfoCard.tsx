import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

interface Props {
  label: string;
  text: string | string[];
}

export default function InfoCard({ label, text }: Props) {
  return (
    <View style={styles.infoBox}>
      <View style={{ gap: 5 }}>
        <Text style={styles.infoLabeltext}>{label}</Text>
        <Text style={styles.infotext}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    minHeight: 80,
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  infoLabeltext: {
    color: Colors.PRIMARY,
    fontSize: 14,
  },
  infotext: {
    color: Colors.DARK_GRAY,
    fontSize: 22,
    fontWeight: "600",
  },
});
