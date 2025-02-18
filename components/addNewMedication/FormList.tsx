import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { medType } from "@/constants/optionsData";
import Colors from "@/constants/Colors";

interface Props {
  type: string;
  handleInputChange: (key: string, value: string) => void;
}

const FormList: React.FC<Props> = ({ type, handleInputChange }) => {
  return (
    <FlatList
      style={styles.listContainer}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={medType}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.itemContainer}
          onPress={() => handleInputChange("type", item.name)}
        >
          <View
            style={[
              styles.itemImageContainer,
              {
                borderColor: item.name === type ? Colors.PRIMARY : "white",
              },
            ]}
          >
            <Image source={item.imageSrc} style={styles.itemImage} />
            {item.name === type && (
              <Ionicons
                style={styles.tickMark}
                name="checkmark-circle"
                size={24}
                color={Colors.PRIMARY}
              />
            )}
          </View>
          <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 10,
  },
  itemContainer: {
    alignItems: "center",
    gap: 10,
    maxWidth: 86,
  },
  itemImage: {
    width: 40,
    height: 40,
  },
  tickMark: {
    position: "absolute", // Position the tick mark absolutely
    right: 0, // Adjust the horizontal position
    bottom: 0, // Adjust the vertical position
    backgroundColor: "white", // Optional: Add background to make the tick mark stand out
    borderRadius: 99, // Optional: Round the background
  },
  itemImageContainer: {
    padding: 20,
    borderRadius: 99,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "white",
  },
  itemText: {
    fontSize: 12,
  },
});

export default FormList;
