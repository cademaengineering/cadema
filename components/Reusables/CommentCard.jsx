import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import TextHeader from "./TextHeader";
import TextContainer from "./TextContainer";
import Like from "@/assets/icons/like.svg";

const CommentCard = () => {
  return (
    <View className="p-3 bg-[#F5F5F5] rounded-[10px]">
      <View className="flex-row justify-start items-start gap-4">
        <View className="">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1761923878/timber_va9scv.png",
            }}
            width={28}
            height={28}
            className=""
          />
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <TextHeader content="John Timber" customLineHeight={30} />
            <TextContainer
              content="2 hours ago"
              textStyles="text-[#ADADAD] text-[10px]"
            />
          </View>
          <TextContainer
            content="This is so helpful! I've been struggling with this concept for weeks. Thank you for sharing!"
            textStyles="text-[12px] text-[#030303]"
            viewStyles=""
          />
          <View className="flex-row justify-start items-center pt-2">
            <TouchableOpacity className="flex-row justify-start items-center gap-1 border-r border-[#ADADAD] pr-2 mr-2">
              <Like width={16} height={16} />
              <TextContainer
                content={6}
                textStyles="text-[14px] text-[#ADADAD]"
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-start items-center gap-1">
              <TextContainer
                content="Reply"
                textStyles="text-[14px] text-[#ADADAD]"
              />
              <TextContainer
                content={4}
                textStyles="text-[14px] text-[#ADADAD]"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommentCard;
