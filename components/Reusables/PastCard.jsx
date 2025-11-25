import React from "react";
import { TouchableOpacity, View } from "react-native";
import Past from "@/assets/icons/past.svg";
import Download from "@/assets/icons/download.svg";
import TextHeader from "./TextHeader";
import TextContainer from "./TextContainer";
const PastCard = () => {
  return (
    <View className="p-4 bg-white rounded-[12px]">
      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-start items-center gap-3">
          <TouchableOpacity className="justify-center items-center bg-[#D000001A] w-[44px] h-[44px] rounded-full">
            <Past width={22} height={22} />
          </TouchableOpacity>
          <View className="gap-1">
            <TextHeader
              content="Field Dynamics Mech"
              textStyles="text-[#000E3A] text-[14px]"
              customLineHeight={20}
            />
            <View className="gap-1">
              <View className="">
                <TextContainer
                  content="15 questions"
                  textStyles="text-[12px] text-[#999999]"
                />
              </View>
              <View className="gap-2">
                <TextContainer
                  content="20 min"
                  textStyles="text-[12px] text-[#999999]"
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity className="flex-row justify-center items-center bg-[#13E0A0] rounded-full w-[100px] h-[30px]">
          <TextHeader
            content="Download"
            textStyles="text-[12px] text-[#000E3A]"
            customLineHeight={20}
          />
          <Download width={16} height={16} className="ml-2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PastCard;
