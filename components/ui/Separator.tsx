import { View } from "react-native";
import React, { FC } from "react";
import Colors from "@/constants/Colors";

const Separator: FC = () => {
  return (
    <View
      style={{ width: "98%", height: 1, backgroundColor: Colors.LIGHT_GRAY }}
    />
  );
};

export default Separator;
