import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import TextHeader from "./TextHeader";
import TextContainer from "./TextContainer";

const NotificationCard = () => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full bg-white rounded-[8px] p-4 shadow-md mb-3"
    >
      <View className="flex-row justify-start items-center gap-4">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
          }}
          width={40}
          height={40}
          className="rouded-full"
        />
        <View>
          <TextHeader
            content="From the community"
            textStyles="text-[#030303] text-[16px]"
            customLineHeight={20}
          />
          <TextContainer
            content="Check out new feeds available for you..."
            textStyles="text-[#999999] text-[14px] mt-1"
          />
        </View>
      </View>
      <TextContainer
        content="Yesterday 06:53am"
        textStyles="text-[#030303] text-[10px] text-italic"
        viewStyles="flex-row justify-end"
      />
    </TouchableOpacity>
  );
};

export default NotificationCard;
