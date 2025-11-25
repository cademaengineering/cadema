import React from "react";
import { View } from "react-native";
import BackIcon from "@/assets/icons/back-icon.svg";
const BackButton = () => {
  return (
    <View>
      <View className="w-[48px] justify-center items-center bg-[#F3F3F3] h-[48px] rounded-full">
        <BackIcon width={24} height={24} />
      </View>
    </View>
  );
};

export default BackButton;
