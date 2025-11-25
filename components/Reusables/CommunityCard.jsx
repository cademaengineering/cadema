import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import TextHeader from "./TextHeader";
import TextContainer from "./TextContainer";

const CommunityCard = ({ community }) => {
  return (
    <View>
      <View className="flex-row justify-between items-center p-5 bg-white border border-[#F2F2F2] rounded-[12px]">
        <View className="flex-row justify-start items-center gap-4">
          <Image
            source={{
              uri: community.imageUrl,
            }}
            width={32}
            height={32}
            className="rounded-full"
          />
          <View>
            <TextHeader
              content={community.name}
              textStyles="text-[#030303] text-[14px]"
              customLineHeight="20"
            />
            <TextContainer
              content={`${community.members.toLocaleString()} members`}
              textStyles="text-[#ADADAD] text-[12px]"
            />
          </View>
        </View>
        <TouchableOpacity className="bg-[#13E0A0] justify-center items-center rounded-[8px] h-[35px] px-6">
          <TextHeader
            content="Add"
            customLineHeight="20"
            textStyles="text-[#000E3A] text-[14px]"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommunityCard;
