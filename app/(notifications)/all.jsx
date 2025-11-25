import React from "react";
import { View, FlatList } from "react-native";
import NotificationCard from "@/components/Reusables/NotificationCard";

const notificationsData = [
  {
    id: "1",
    title: "Welcome to Cadema!",
    message: "Your account has been created successfully.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    title: "Update Available",
    message: "A new version of the app is available.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "3",
    title: "Update Available",
    message: "A new version of the app is available.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "4",
    title: "Update Available",
    message: "A new version of the app is available.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: "5",
    title: "Update Available",
    message: "A new version of the app is available.",
    time: "1 hour ago",
    read: true,
  },
  // Add more notifications as needed
];

const All = () => {
  return (
    <View className="flex-1 bg-[#F9FAFB] px-4 pt-28">
      <FlatList
        data={notificationsData}
        renderItem={({ item }) => <NotificationCard notification={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
};

export default All;
