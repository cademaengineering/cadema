import React from "react";
import { View, Image } from "react-native";
import TextHeader from "./TextHeader";
import TextContainer from "./TextContainer";
import Star from "@/assets/icons/startwo.svg";
const TutorCard = () => {
  return (
    <View className="bg-white p-4 rounded-[12px]">
      <View>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762180958/Rectangle_578_gqxglo.png",
          }}
          width={142}
          height={128}
          className="rounded-[8px]"
          resizeMode="cover"
        />
        <View className="gap-1 pt-3">
          <TextHeader
            content="Professor Chen"
            textStyles="text-[14px] text-[#030303]"
            customLineHeight={20}
          />
          <TextContainer
            content="Business"
            textStyles={`text-[12px] text-[#F59E0B]`}
          />
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center gap-1">
              <View className="w-[10px] h-[10px] rounded-full bg-[#16A34A]"></View>
              <TextContainer
                content={`Available`}
                textStyles={`text-[12px] text-[#16A34A]`}
              />
            </View>
            <View className="flex-row justify-start items-center gap-1">
              <TextContainer
                content={`4.2`}
                textStyles={`text-[12px] text-[#ADADAD]`}
              />
              <Star width={10} height={10} className="" />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TutorCard;
