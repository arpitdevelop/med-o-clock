import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import React, { useRef, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/constants/Colors";
import { doseTime } from "@/constants/optionsData";

interface Props {
  onOptionSelect: (key: string, value: string) => void;
}

export default function DropdownPicker({ onOptionSelect }: Props) {
  const [selectedDose, setSelectedDose] = useState("When To Take");
  const [isClicked, setIsClicked] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0 });

  const pickerRef = useRef<View>(null);

  const toggleDropdown = () => {
    if (pickerRef.current) {
      // Measure the input field's position
      pickerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({
          top: height, // Position below the input field
        });
        setIsClicked((prev) => !prev);
      });
    }
  };

  const handleItemClick = (item: string) => {
    setSelectedDose(item);
    setIsClicked(false);
    onOptionSelect("when", item);
  };

  return (
    <View ref={pickerRef}>
      <TouchableOpacity
        style={styles.nameInputContainer}
        onPress={toggleDropdown}
      >
        <Ionicons
          name="time-outline"
          size={24}
          color={Colors.PRIMARY}
          style={styles.inputIcon}
        />
        <View>
          <Text
            style={[
              styles.textInput,
              selectedDose === "When To Take" && { color: Colors.DARK_GRAY },
            ]}
          >
            {selectedDose}
          </Text>
        </View>
        {isClicked ? (
          <Ionicons name="chevron-up" size={20} color={Colors.PRIMARY} />
        ) : (
          <Ionicons name="chevron-down" size={20} color={Colors.PRIMARY} />
        )}
      </TouchableOpacity>
      {isClicked && (
        <View style={[styles.dropdownArea, dropdownPosition]}>
          <FlatList
            data={doseTime}
            keyExtractor={(item) => item}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItemContainer}
                onPress={() => handleItemClick(item)}
              >
                <Text style={styles.textInput}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  nameInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.LIGHT_GRAY,
    padding: 12,
    gap: 10,
  },
  inputIcon: {
    borderRightWidth: 1,
    paddingRight: 10,
    borderRightColor: Colors.LIGHT_GRAY,
  },
  textInput: {
    fontSize: 16,
    flex: 1,
  },
  dropdownArea: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY,
    borderRadius: 8,
    width: "100%",
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginTop: 10,
    zIndex: 1000, // Ensure dropdown is above other content
    maxHeight: 200, // Add maxHeight to prevent overflow
  },
  dropdownItemContainer: {
    width: "85%",
    padding: 12,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.LIGHT_GRAY,
  },
});
