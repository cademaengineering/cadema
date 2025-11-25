import React from "react";
import { Image, View } from "react-native";
import TextContainer from "./TextContainer";
import TextInter from "./TextInter";

const CartItem = () => {
  return (
    <View className="flex-row justify-start items-start bg-white rounded-[12px] p-2 gap-3">
      <Image
        source={{
          uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product1_ehqv51.png",
        }}
        className="w-[120px] h-[120px] rounded-[6px]"
      />
      <View className="gap-3">
        <TextContainer
          content="Steal Like An Artist"
          textStyles="text-[16px]"
        />
        <TextContainer content="New" textStyles="text-[12px] text-[#13E0A0]" />
        <TextInter
          content="$25"
          customLineHeight={20}
          textStyles="text-[14px] text-[#1A1A1A]"
        />
      </View>
    </View>
  );
};

export default CartItem;
