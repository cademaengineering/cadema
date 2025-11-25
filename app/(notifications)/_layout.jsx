import React from "react";
import { Tabs } from "expo-router";
import { View } from "react-native";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TabActive from "@/assets/icons/tabActive.svg";
const NotificationLayout = () => {
  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="pt-14 px-6 pb-4">
        <ArrowTitlebar title="Notifications" />
      </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#F9FAFB",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            elevation: 0,
          },
          tabBarActiveTintColor: "#16A34A",
          tabBarInactiveTintColor: "#ADADAD",
          tabBarLabelStyle: {
            fontFamily: "Abeatbykai",
            fontSize: 14,
            fontWeight: "600",
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#16A34A",
            height: 3,
          },
        }}
        tabBarPosition="top"
      >
        <Tabs.Screen
          name="all"
          options={{
            title: "All",
            tabBarIcon: ({ color, focused }) =>
              focused ? <TabActive width={70} height={50} /> : "",
            tabBarLabelPosition: "above-icon",
          }}
        />
        <Tabs.Screen
          name="read"
          options={{
            title: "Read",
            tabBarIcon: ({ color, focused }) =>
              focused ? <TabActive width={70} height={50} /> : "",
            tabBarLabelPosition: "above-icon",
          }}
        />
        <Tabs.Screen
          name="unread"
          options={{
            title: "Unread",
            tabBarIcon: ({ color, focused }) =>
              focused ? <TabActive width={70} height={50} /> : "",
            tabBarLabelPosition: "above-icon",
          }}
        />
      </Tabs>
    </View>
  );
};

export default NotificationLayout;
