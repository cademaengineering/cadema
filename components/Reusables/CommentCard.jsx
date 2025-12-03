import Like from "@/assets/icons/like.svg";
import { Image, Text, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const CommentCard = ({ comment }) => {
  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <View className="p-3 bg-[#F5F5F5] rounded-[10px]">
      <View className="flex-row justify-start items-start gap-4">
        <View className="">
          {comment?.author?.avatar_url ? (
            <Image
              source={{ uri: comment.author.avatar_url }}
              width={28}
              height={28}
              className="rounded-full"
            />
          ) : (
            <View className="w-[28px] h-[28px] rounded-full bg-[#000E3A] justify-center items-center">
              <Text className="text-[#13E0A0] text-[10px] font-bold">
                {getInitials(comment?.author?.full_name)}
              </Text>
            </View>
          )}
        </View>
        <View className="flex-1">
          <View className="flex-row justify-between items-center">
            <TextHeader
              content={comment?.author?.full_name || "Anonymous"}
              customLineHeight={30}
            />
            <TextContainer
              content={comment?.time}
              textStyles="text-[#ADADAD] text-[10px]"
            />
          </View>
          <TextContainer
            content={comment?.content}
            textStyles="text-[12px] text-[#030303]"
            viewStyles=""
          />
          <View className="flex-row justify-start items-center pt-2">
            <TouchableOpacity className="flex-row justify-start items-center gap-1 border-r border-[#ADADAD] pr-2 mr-2">
              <Like width={16} height={16} />
              <TextContainer
                content={0}
                textStyles="text-[14px] text-[#ADADAD]"
              />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row justify-start items-center gap-1">
              <TextContainer
                content="Reply"
                textStyles="text-[14px] text-[#ADADAD]"
              />
              <TextContainer
                content={0}
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
