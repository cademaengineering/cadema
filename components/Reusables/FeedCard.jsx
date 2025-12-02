import BookmarkIcon from "@/assets/icons/bookmark-icon.svg";
import FeedChat from "@/assets/icons/feed-chat.svg";
import Like from "@/assets/icons/like.svg";
import Action from "@/assets/icons/more-menu.svg";
import ReactionClap from "@/assets/icons/reaction-clap.svg";
import ReactionFire from "@/assets/icons/reaction-fire.svg";
import ReactionHandshake from "@/assets/icons/reaction-handshake.svg";
import ReactionIdea from "@/assets/icons/reaction-idea.svg";
import ReactionLove from "@/assets/icons/reaction-love.svg";
import ReactionPeace from "@/assets/icons/reaction-peace.svg";
import ReactionSmile from "@/assets/icons/reaction-smile.svg";
import Repost from "@/assets/icons/repost.svg";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const FeedCard = () => {
  const router = useRouter();
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionCount, setReactionCount] = useState(225);

  const reactions = [
    { id: "love", Icon: ReactionLove },
    { id: "idea", Icon: ReactionIdea },
    { id: "fire", Icon: ReactionFire },
    { id: "handshake", Icon: ReactionHandshake },
    { id: "smile", Icon: ReactionSmile },
    { id: "peace", Icon: ReactionPeace },
    { id: "clap", Icon: ReactionClap },
  ];

  const handleReactionSelect = (reactionId) => {
    setSelectedReaction(reactionId);
    setShowReactions(false);
    if (!selectedReaction) {
      setReactionCount(reactionCount + 1);
    }
  };

  const toggleReactions = () => {
    setShowReactions(!showReactions);
  };

  return (
    <View className="bg-white border border-[#F2F2F2] rounded-[12px] p-5">
      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-start gap-3 items-center">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1747072456/ava_my3oab.png",
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
            uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1761864248/feedImage_uqc0xs.png",
          }}
          className="w-full mt-4 rounded-[8px]"
          width={334}
          height={241}
        />
      </TouchableOpacity>

      {/* Reactions Container */}
      <View className="relative">
        {showReactions && (
          <View className="absolute -top-12 left-0 rounded-full px-3 py-2 flex-row gap-2 shadow-lg bg-[#00000029] border border-[#F2F2F2]">
            {reactions.map(({ id, Icon }) => (
              <TouchableOpacity
                key={id}
                onPress={() => handleReactionSelect(id)}
                className="w-[32px] h-[32px] justify-center items-center"
              >
                <Icon width={28} height={28} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View className="flex-row justify-start items-center py-2 gap-4">
          <TouchableOpacity
            className="flex-row justify-start items-center gap-1"
            onPress={toggleReactions}
          >
            <Like width={24} height={24} />
            <TextContainer
              content={reactionCount}
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
          <TouchableOpacity className="flex-row justify-start items-center gap-1">
            <BookmarkIcon width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedCard;
