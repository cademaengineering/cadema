import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import React, { useState } from "react";
import TextHeader from "@/components/Reusables/TextHeader";
import Action from "@/assets/icons/more-menu.svg";
import Like from "@/assets/icons/like.svg";
import FeedChat from "@/assets/icons/feed-chat.svg";
import Repost from "@/assets/icons/repost.svg";
import Bookmark from "@/assets/icons/Bookmark.svg";
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import CommentCard from "@/components/Reusables/CommentCard";
import ChatInput from "@/components/Forms/ChatInput";

const commentsData = [
  {
    id: "1",
    user: "Jane Doe",
    avatar:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1747072456/ava_my3oab.png",
    comment: "Great work! Really inspiring.",
    time: "1h",
  },
  {
    id: "2",
    user: "Mike Smith",
    avatar:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1747072456/ava_my3oab.png",
    comment: "Congrats on finishing your project!",
    time: "2h",
  },
  // Add more comments as needed
];

const SinglePost = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-[#F9FAFB] flex-1"
      keyboardVerticalOffset={0} // reduced offset for less space
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="pt-16 flex-1">
          <View className="px-6">
            <ArrowTitlebar title="Post" action />
          </View>
          <View className="bg-white border border-[#F2F2F2] flex-1 p-6">
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
            <TouchableOpacity activeOpacity={0.7}>
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
            <View className="flex-row border-b border-[#F2F2F2] justify-between items-center py-4">
              <TextContainer
                content="225 likes"
                textStyles="text-[14px] text-[#ADADAD]"
              />
              <TextContainer
                content="45 comments"
                textStyles="text-[14px] text-[#ADADAD]"
              />
            </View>
            <View className="flex-row justify-between items-center py-3 gap-4">
              <TouchableOpacity className="flex-row justify-start items-center gap-1">
                <Like width={24} height={24} />
                <TextContainer
                  content="Like"
                  textStyles="text-[14px] text-[#ADADAD]"
                  viewStyles="pt-1"
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row justify-start items-center gap-1">
                <FeedChat width={24} height={24} />
                <TextContainer
                  content="Comment"
                  textStyles="text-[14px] text-[#ADADAD]"
                  viewStyles="pt-1"
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex-row justify-start items-center gap-1">
                <Repost width={24} height={24} />
                <TextContainer
                  content="Repost"
                  textStyles="text-[14px] text-[#ADADAD]"
                  viewStyles="pt-1"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Bookmark width={24} height={24} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={commentsData}
              renderItem={({ item }) => <CommentCard comment={item} />}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
              ItemSeparatorComponent={() => <View className="h-4" />}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ChatInput />
    </KeyboardAvoidingView>
  );
};

export default SinglePost;
