import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import TextHeader from "./TextHeader";
import TextContainer from "./TextContainer";
import Action from "@/assets/icons/more-menu.svg";
import Like from "@/assets/icons/like.svg";
import FeedChat from "@/assets/icons/feed-chat.svg";
import Repost from "@/assets/icons/repost.svg";
import { useRouter } from "expo-router";

const FeedCard = () => {
  const router = useRouter();

  return (
    <View className="bg-white border border-[#F2F2F2] rounded-[12px] p-5">
      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-start gap-3 items-center">
          <Image
            source={{
              url: "https://res.cloudinary.com/dtxr92piy/image/upload/v1747072456/ava_my3oab.png",
            }}
            width={44}
            height={44}
            className="rounded-full"
          />
          <View>
            <TextHeader
              content="Sarah Johnson"
              customLineHeight={20}
              textStyles="text-[#030303] text-[14px]"
            />
            <TextContainer
              content="2 hours ago"
              textStyles="text-[#ADADAD] text-[12px]"
            />
          </View>
        </View>
        <TouchableOpacity>
          <Action width={24} height={24} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/post/singlePost")}
      >
        <TextContainer
          content="Just finished my machine learning project! The results are amazing. AI is truly revolutionizing how we approach complex problems"
          textStyles="text-[14px]"
          viewStyles="pt-3"
          customHeight="22"
        />
        <Image
          source={{
            url: "https://res.cloudinary.com/dtxr92piy/image/upload/v1761864248/feedImage_uqc0xs.png",
          }}
          className="w-full mt-4"
          width={334}
          height={241}
        />
      </TouchableOpacity>
      <View className="flex-row justify-start items-center py-2 gap-4">
        <TouchableOpacity className="flex-row justify-start items-center gap-1">
          <Like width={24} height={24} />
          <TextContainer
            content={225}
            textStyles="text-[14px] text-[#ADADAD]"
            viewStyles="pt-1"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-start items-center gap-1">
          <FeedChat width={24} height={24} />
          <TextContainer
            content={45}
            textStyles="text-[14px] text-[#ADADAD]"
            viewStyles="pt-1"
          />
        </TouchableOpacity>
        <TouchableOpacity className="flex-row justify-start items-center gap-1">
          <Repost width={24} height={24} />
          <TextContainer
            content={10}
            textStyles="text-[14px] text-[#ADADAD]"
            viewStyles="pt-1"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedCard;
