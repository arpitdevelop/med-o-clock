import { FlatList, TouchableOpacity } from "react-native";
import React from "react";
import MedCardItem from "../MedCardItem";
import NoMedications from "../NoMedications";
import { Href, useRouter } from "expo-router";
import { Medicine } from "@/constants/types";

interface ActionModalParams extends Medicine {
  selectedDate: string;
  time: string;
}
interface Props {
  medList: Medicine[];
  currentWeekDates: string[];
  loading: boolean;
  reloadMeds: () => void;
}

const MedList = ({ medList, currentWeekDates, loading, reloadMeds }: Props) => {
  const router = useRouter();

  return (
    <FlatList
      refreshing={loading}
      onRefresh={() => reloadMeds()}
      data={medList}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
        // To repeat same entry for multiple reminders
        <>
          {item.reminders.map((reminder) => (
            <TouchableOpacity
              key={reminder.id}
              onPress={() => {
                const params: ActionModalParams = {
                  selectedDate: currentWeekDates[index],
                  time: reminder.time,
                  ...item,
                };
                router.push({
                  pathname: "/action-modal",
                  params,
                } as unknown as Href);
              }}
            >
              <MedCardItem data={item} reminder={reminder.time} />
            </TouchableOpacity>
          ))}
        </>
      )}
      keyExtractor={(item) => item.id.toString()}
      ListEmptyComponent={<NoMedications />}
    />
  );
};

export default MedList;
