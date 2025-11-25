import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import TextHeader from "./TextHeader";

const FeedCategoriesCard = ({ otherStyles, category, onPress }) => {
  // Handle image source properly
  const getImageSource = () => {
    if (category?.imageUrl) {
      return { uri: category.imageUrl };
    }
    return require("@/assets/icons/all.png");
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`w-[89px] justify-center items-center gap-2 ${
        otherStyles || ""
      }`}
    >
      <Image
        source={getImageSource()}
        style={{ width: 32, height: 32 }}
        resizeMode="contain"
      />
      <TextHeader
        content={category?.title || "All Feeds"}
        customLineHeight={14}
        textStyles={`text-[14px] text-center ${
          category?.isActive ? "text-[#000E3A] font-bold" : "text-[#ADADAD]"
        }`}
      />
    </TouchableOpacity>
  );
};

export default FeedCategoriesCard;
