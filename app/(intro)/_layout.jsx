import React from "react";
import { Stack } from "expo-router";

const IntroLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#FBFBFB" },
      }}
    />
  );
};

export default IntroLayout;
