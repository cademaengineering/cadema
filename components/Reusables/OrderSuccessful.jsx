import React from "react";
import { View } from "react-native";
import Confetti from "@/assets/icons/confetti.svg";
import TextHeader from "./TextHeader";
import TextContainer from "./TextContainer";
import AppButton from "../Buttons/AppButton";
import { useRouter } from "expo-router";
const OrderSuccessful = () => {
  const router = useRouter();
  const goToShop = () => {
    router.replace("/(tabs)/shop");
  };
  return (
    <View className="px-2 gap-3">
      <View className="flex-row justify-center items-center">
        <Confetti width={120} height={140} />
      </View>
      <TextHeader
        content="Order successful!"
        textStyles="text-[24px] text-center"
      />
      <TextContainer
        content="More details on your order will be sent to you through mail"
        textStyles="text-[14px] text-[#ADADAD] text-center"
        viewStyles=""
      />
      <View className="gap-4 p-3 bg-[#F2F2F2] rounded-[12px] my-10">
        <View className="flex-row justify-between items-center">
          <TextContainer
            content="Product"
            textStyles="text-[12px] text-[#808080]"
          />
          <TextContainer
            content="Book"
            textStyles="text-[12px] text-[#030303]"
          />
        </View>
        <View className="flex-row justify-between items-center">
          <TextContainer
            content="Amount"
            textStyles="text-[12px] text-[#808080]"
          />
          <TextContainer
            content="$25"
            textStyles="text-[12px] text-[#030303]"
          />
        </View>
      </View>
      <View>
        <AppButton
          btnLabel="Back to shop"
          handlePress={goToShop}
          moreStyles="bg-transparent border border-[#000E3A]"
          textStyles="text-[#000E3A]"
        />
      </View>
    </View>
  );
};

export default OrderSuccessful;
