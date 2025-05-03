import {
  Text,
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";

interface Props {
  children: string;
  btnStyles: StyleProp<ViewStyle>;
  onPress: () => void;
}

export default function ActionBtn({ children, btnStyles, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, btnStyles]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
