import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import Location from "@/assets/icons/location.svg";
import Message from "@/assets/icons/black-message.svg";
const SellerDetails = () => {
  return (
    <View
      className="flex-row justify-between items-center bg-[#FFFFFF] p-4 rounded-[12px]"
      style={{
        shadowColor: "#F2F2F2",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8, // blur
        elevation: 2, // for Android shadow
      }}
    >
      <View className="flex-row justify-start gap-3 items-center">
        <Image
          source={{
            uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762072241/avatar2_aistac.png",
          }}
          className="w-[40px] h-[40px]"
        />
        <View>
          <TextContainer
            content="Francis Duke"
            textStyles="text-[14px] text-[#000000]"
          />
          <View className="flex-row justify-start items-center">
            <Location width={14} height={14} />
            <TextContainer
              content="Texas, US"
              textStyles="text-[#ADADAD] text-[12px]"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity className="bg-[#F5F5F5] p-3 rounded-full justify-center items-center">
        <Message width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SellerDetails;
