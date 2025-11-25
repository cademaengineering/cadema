import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import BackIcon from "@/assets/icons/arrow-back.svg";
import Action from "@/assets/icons/more-menu.svg";
import { useRouter } from "expo-router";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const PostTitlebar = ({ action, title }) => {
  const router = useRouter();

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row justify-start items-center gap-4">
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <BackIcon width={28} height={28} />
        </TouchableOpacity>
        <Image
          source={{
            uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762072241/avatar2_aistac.png",
          }}
          width={36}
          height={36}
          className="rounded-full"
        />
        <TextContainer
          content={title}
          textStyles="text-[12px] text-[#999999]"
        />
      </View>
      <View className="">
        {action ? (
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-[#000E3A] rounded-full px-4 py-2"
          >
            <TextHeader
              content="Post"
              customLineHeight={20}
              textStyles="text-[14px] text-[#13E0A0]"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default PostTitlebar;
