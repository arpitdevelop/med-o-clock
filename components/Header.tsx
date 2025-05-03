import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

import { headerProps } from "@/constants/types";

export default function Header({
  title,
  iconName,
  color,
  onPressIcon,
}: headerProps) {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, { color: color }]}>{title}</Text>
      <TouchableOpacity onPress={onPressIcon}>
        <Ionicons name={iconName} size={30} color={color} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingTop: 16,
    // width: "100%",
    // position: "absolute",
    // zIndex: 1,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
