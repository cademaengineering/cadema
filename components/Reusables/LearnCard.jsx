import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import TextHeader from "./TextHeader";
import TextContainer from "./TextContainer";
import Star from "@/assets/icons/startwo.svg";
import MoveRight from "@/assets/icons/move-right.svg";
import { useRouter } from "expo-router";

const LearnCard = ({ learn, id }) => {
  const router = useRouter();

  const goToCourse = () => {
    router.push(`/courses/${id}`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={goToCourse}
      className="bg-white p-2 rounded-[12px]"
    >
      <View className="flex-row justify-start items-start gap-3">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762171646/Rectangle_575_jhmigw.png",
          }}
          width={80}
          height={94}
          className="rounded-[6px]"
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-center gap-8 w-[200px]">
            <TextContainer
              content="Field Dynamics Mech 203"
              textStyles="text-[14px] text-[#030303]"
            />
            <View className="flex-row justify-end items-center gap-1">
              <TextContainer
                content="4.2"
                textStyles="text-[12px] text-[#ADADAD]"
              />
              <Star width={10} height={10} className="" />
            </View>
          </View>
          <TextContainer
            content="Dr Lisa Wong"
            textStyles="text-[12px] text-[#808080]"
          />
          <TextContainer
            content="Engineering"
            textStyles="text-[10px] text-[#13E0A0]"
            viewStyles="bg-[#F2F2F2] rounded-full px-3 py-1 w-[80px]"
          />
          {learn ? (
            <View className="flex-row justify-start items-center pt-3">
              <TextContainer
                content="5 lessons"
                textStyles="text-[12px] text-[#808080]"
              />
              <TextContainer
                content="| 3hr 18min"
                textStyles="text-[12px] text-[#808080]"
              />
            </View>
          ) : (
            <View className="flex-row justify-start items-center gap-2 pt-2">
              <TextHeader
                content="Start learning"
                textStyles="text-[#000E3A] text-[14px]"
                viewStyles=""
                customLineHeight={20}
              />
              <MoveRight width={16} height={16} />
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LearnCard;
