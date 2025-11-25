import React from "react";
import { Tabs } from "expo-router";
import CoursesIcon from "@/assets/icons/courses-s.svg";
import CoursesIconActive from "@/assets/icons/courses-active.svg";
import QuizzesIcon from "@/assets/icons/quizzes.svg";
import QuizzesIconActive from "@/assets/icons/quizzes-active.svg";
import PastQuestionsIcon from "@/assets/icons/past-questions.svg";
import PastQuestionsIconActive from "@/assets/icons/past-questions-active.svg";
import TutorsIcon from "@/assets/icons/tutors-none.svg";
import TutorsIconActive from "@/assets/icons/tutors-active.svg";

import { StatusBar } from "expo-status-bar";

const LearningLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#000E3A",
          tabBarInactiveTintColor: "#757575",
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
          name="courses"
          options={{
            title: "Courses",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <CoursesIconActive
                  width={28}
                  height={28}
                  fill="#13E0A0"
                  stroke="none"
                  strokeWidth={0}
                />
              ) : (
                <CoursesIcon
                  width={28}
                  height={28}
                  fill=""
                  stroke="none"
                  strokeWidth={0}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="quizzes"
          options={{
            title: "Quizzes",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <QuizzesIconActive
                  width={24}
                  height={24}
                  fill="#13E0A0"
                  stroke="none"
                />
              ) : (
                <QuizzesIcon width={24} height={24} fill="" stroke="none" />
              ),
          }}
        />
        <Tabs.Screen
          name="pastQuestions"
          options={{
            title: "Past Questions",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <PastQuestionsIconActive
                  width={24}
                  height={24}
                  fill=""
                  stroke="none"
                />
              ) : (
                <PastQuestionsIcon
                  width={24}
                  height={24}
                  fill=""
                  stroke="none"
                />
              ),
          }}
        />
        <Tabs.Screen
          name="tutors"
          options={{
            title: "Tutors",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <TutorsIconActive
                  width={24}
                  height={24}
                  fill=""
                  stroke="none"
                />
              ) : (
                <TutorsIcon width={24} height={24} fill="" stroke="none" />
              ),
          }}
        />
      </Tabs>
    </>
  );
};

export default LearningLayout;
