import BusinessIconActive from "@/assets/icons/business-icon-active.svg";
import BusinessIcon from "@/assets/icons/business-icon.svg";
import EventsIconActive from "@/assets/icons/events-icon-active.svg";
import EventsIcon from "@/assets/icons/events-icon.svg";
import PartyIconActive from "@/assets/icons/party-icon-active.svg";
import PartyIcon from "@/assets/icons/party-icon.svg";
import RoommatesActive from "@/assets/icons/roomates-icon-active.svg";
import RoommatesIcon from "@/assets/icons/roomates-icon.svg";
import WizardIconActive from "@/assets/icons/wizard-icon-active.svg";
import WizardIcon from "@/assets/icons/wizard-icon.svg";

import { Tabs } from "expo-router";

import { StatusBar } from "expo-status-bar";

const LifestyleLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000E3A",
          tabBarInactiveTintColor: "#858585",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#13E0A0",
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
            height: 100,
            paddingBottom: 10,
            paddingTop: 20,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Abeatbykai",
            marginTop: 8,
          },
          tabBarIconStyle: {
            marginBottom: 1,
          },
        }}
      >
        <Tabs.Screen
          name="roommates"
          options={{
            title: "Roommates",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <RoommatesActive
                  width={28}
                  height={28}
                  fill="#13E0A0"
                  stroke="none"
                  strokeWidth={0}
                />
              ) : (
                <RoommatesIcon
                  width={28}
                  height={28}
                  fill="none"
                  stroke="none"
                />
              ),
          }}
        />
        <Tabs.Screen
          name="events"
          options={{
            title: "Events",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <EventsIconActive
                  width={24}
                  height={24}
                  fill="#13E0A0"
                  stroke="none"
                />
              ) : (
                <EventsIcon width={24} height={24} fill="none" stroke="none" />
              ),
          }}
        />
        <Tabs.Screen
          name="party"
          options={{
            title: "Parties",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <PartyIconActive
                  width={24}
                  height={24}
                  fill="#13E0A0"
                  stroke="none"
                />
              ) : (
                <PartyIcon width={24} height={24} fill="none" stroke="none" />
              ),
          }}
        />
        <Tabs.Screen
          name="business"
          options={{
            title: "Business",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <BusinessIconActive
                  width={24}
                  height={24}
                  fill="#13E0A0"
                  stroke="none"
                />
              ) : (
                <BusinessIcon
                  width={24}
                  height={24}
                  fill="none"
                  stroke="none"
                />
              ),
          }}
        />
        <Tabs.Screen
          name="wizard"
          options={{
            title: "Wizard",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <WizardIconActive
                  width={24}
                  height={24}
                  fill="#13E0A0"
                  stroke="none"
                />
              ) : (
                <WizardIcon
                  width={24}
                  height={24}
                  fill="none"
                  stroke="#858585"
                />
              ),
          }}
        />
      </Tabs>
    </>
  );
};

export default LifestyleLayout;
