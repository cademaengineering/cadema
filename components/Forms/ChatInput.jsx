import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import SendIcon from "@/assets/icons/send.svg";

const ChatInput = () => {
  const [text, setText] = useState("");

  return (
    <View className="flex-row justify-between items-center bg-[#000E3A] py-5 px-6">
      <View>
        <Image
          source={require("@/assets/icons/avatar.png")}
          width={32}
          height={32}
        />
      </View>
      <View className="flex-1 mx-3">
        <TextInput
          placeholder="Write a comment..."
          value={text}
          onChangeText={setText}
          className="border border-[#F2F2F2] rounded-full px-4 py-2 text-[#ADADAD]"
          multiline
          numberOfLines={6}
          style={{
            fontFamily: "Abeatbykai",
            fontSize: 14,
            minHeight: 36,
            textAlignVertical: "top",
          }}
          placeholderTextColor="#ADADAD"
        />
      </View>
      <TouchableOpacity className="bg-[#13E0A0] w-[36px] h-[36px] justify-center items-center rounded-full">
        <SendIcon width={16} height={16} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatInput;
