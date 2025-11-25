import React from "react";
import { TouchableOpacity, View } from "react-native";
import BackIcon from "@/assets/icons/arrow-back.svg";
import TextHeader from "./TextHeader";
import Action from "@/assets/icons/more-menu.svg";
import { useRouter } from "expo-router";

const ArrowTitlebar = ({ action, title }) => {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center">
      <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
        <BackIcon width={28} height={28} />
      </TouchableOpacity>
      <TextHeader content={title} textStyles="text-[24px] text-[#030303]" />
      <View className="w-[25px]">
        {action ? (
          <TouchableOpacity activeOpacity={0.7}>
            <Action width={24} height={24} />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default ArrowTitlebar;
