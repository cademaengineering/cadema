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
import {
  addBookmark,
  addReaction,
  removeBookmark,
} from "@/lib/supabaseServices";
import { getRelativeTime } from "@/utils/dateHelpers";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const FeedCard = ({ post }) => {
  console.log("Post in FeedCard:", post);
  const router = useRouter();
  const [showReactions, setShowReactions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState(null);
  const [reactionCount, setReactionCount] = useState(
    post?.reactions?.length || 0
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  const reactions = [
    { id: "love", Icon: ReactionLove },
    { id: "idea", Icon: ReactionIdea },
    { id: "fire", Icon: ReactionFire },
    { id: "handshake", Icon: ReactionHandshake },
    { id: "smile", Icon: ReactionSmile },
    { id: "peace", Icon: ReactionPeace },
    { id: "clap", Icon: ReactionClap },
  ];

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const handleReactionSelect = async (reactionId) => {
    try {
      await addReaction(post.id, reactionId);
      setSelectedReaction(reactionId);
      setShowReactions(false);
      if (!selectedReaction) {
        setReactionCount(reactionCount + 1);
      }
    } catch (error) {
      console.error("Reaction error:", error);
    }
  };

  const toggleReactions = () => {
    setShowReactions(!showReactions);
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await removeBookmark(post.id);
        setIsBookmarked(false);
      } else {
        await addBookmark(post.id);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  return (
    <View className="bg-white border border-[#F2F2F2] rounded-[12px] p-5">
      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-start gap-3 items-center">
          {post?.author?.avatar_url ? (
            <Image
              source={{ uri: post.author.avatar_url }}
              width={44}
              height={44}
              className="rounded-full"
            />
          ) : (
            <View className="w-[44px] h-[44px] rounded-full bg-[#000E3A] justify-center items-center">
              <Text className="text-[#13E0A0] text-[16px] font-bold">
                {getInitials(post?.author?.full_name)}
              </Text>
            </View>
          )}
          <View>
            <TextHeader
              content={post?.author?.full_name || "Anonymous"}
              customLineHeight={20}
              textStyles="text-[#030303] text-[14px]"
            />
            <TextContainer
              content={getRelativeTime(post?.created_at)}
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
        onPress={() => router.push(`/post/singlePost?postId=${post.id}`)}
      >
        <TextContainer
          content={post?.content}
          textStyles="text-[14px]"
          viewStyles="pt-3"
          customHeight="22"
        />
        {post?.image_url && (
          <Image
            source={{ uri: post.image_url }}
            className="w-full mt-4 rounded-[8px]"
            width={334}
            height={241}
          />
        )}
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
              content={post?.comments?.length || 0}
              textStyles="text-[14px] text-[#ADADAD]"
              viewStyles="pt-1"
            />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row justify-start items-center gap-1">
            <Repost width={24} height={24} />
            <TextContainer
              content={0}
              textStyles="text-[14px] text-[#ADADAD]"
              viewStyles="pt-1"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row justify-start items-center gap-1"
            onPress={handleBookmark}
          >
            <BookmarkIcon
              width={24}
              height={24}
              fill={isBookmarked ? "#000E3A" : "none"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedCard;
