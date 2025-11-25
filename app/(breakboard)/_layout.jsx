import InternshipIconActive from "@/assets/icons/internship-icon-active.svg";
import InternshipIcon from "@/assets/icons/internship-icon.svg";
import JobsIconActive from "@/assets/icons/jobs-icon-active.svg";
import JobsIcon from "@/assets/icons/jobs-icon.svg";
import MsaIconActive from "@/assets/icons/msa-icon-active.svg";
import MsaIcon from "@/assets/icons/msa-icon.svg";
import NicheIconActive from "@/assets/icons/niche-icon-active.svg";
import NicheIcon from "@/assets/icons/niche-icon.svg";
import ScholarshipIconActive from "@/assets/icons/scholarship-icon-active.svg";
import ScholarshipIcon from "@/assets/icons/scholarship-icon.svg";

import { Tabs } from "expo-router";

import { StatusBar } from "expo-status-bar";

const LearningLayout = () => {
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
            marginTop: 8, // Increase space between icon and label
          },
          tabBarIconStyle: {
            marginBottom: 1, // Additional spacing for icons
          },
        }}
      >
        <Tabs.Screen
          name="scholarship"
          options={{
            title: "Scholarship",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ScholarshipIconActive
                  width={28}
                  height={28}
                  fill="#13E0A0"
                  stroke="none"
                />
              ) : (
                <ScholarshipIcon width={28} height={28} fill="" stroke="none" />
              ),
          }}
        />
        <Tabs.Screen
          name="internship"
          options={{
            title: "Internship",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <InternshipIconActive
                  width={24}
                  height={24}
                  fill=""
                  stroke="none"
                />
              ) : (
                <InternshipIcon
                  width={24}
                  height={24}
                  fill="none"
                  stroke="none"
                />
              ),
          }}
        />
        <Tabs.Screen
          name="jobs"
          options={{
            title: "Jobs",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <JobsIconActive width={24} height={24} fill="" stroke="none" />
              ) : (
                <JobsIcon width={24} height={24} fill="none" stroke="none" />
              ),
          }}
        />
        <Tabs.Screen
          name="msa"
          options={{
            title: "M/S/A",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <MsaIconActive width={24} height={24} fill="" stroke="none" />
              ) : (
                <MsaIcon width={24} height={24} fill="" stroke="none" />
              ),
          }}
        />
        <Tabs.Screen
          name="niche"
          options={{
            title: "Niche",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <NicheIconActive width={24} height={24} fill="" stroke="none" />
              ) : (
                <NicheIcon width={24} height={24} fill="" stroke="none" />
              ),
          }}
        />
      </Tabs>
    </>
  );
};

export default LearningLayout;
