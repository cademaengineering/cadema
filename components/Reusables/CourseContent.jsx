import React from "react";
import { View, Image } from "react-native";
import TextContainer from "@/components/Reusables/TextContainer";

const CourseContent = () => {
  return (
    <View className="px-2 py-4">
      <TextContainer
        content="Introduction to Field Dynamics"
        textStyles="text-[16px] text-[#666666] mb-3 font-bold"
      />
      <TextContainer
        content="Field dynamics is a branch of physics that studies how fields interact with matter and energy. Below are some key concepts:"
        textStyles="text-[14px] text-[#666666] mb-4"
      />
      <TextContainer
        content="Key Concepts:"
        textStyles="text-[15px] text-[#666666] mb-2 font-semibold"
      />
      <View className="mb-4">
        <TextContainer
          content="• Fields and their properties"
          textStyles="text-[14px] text-[#666666] mb-1"
        />
        <TextContainer
          content="• Energy transfer mechanisms"
          textStyles="text-[14px] text-[#666666] mb-1"
        />
        <TextContainer
          content="• Applications in engineering"
          textStyles="text-[14px] text-[#666666] mb-1"
        />
      </View>
      <TextContainer
        content="Example:"
        textStyles="text-[15px] text-[#666666] mb-2 font-semibold"
      />
      <TextContainer
        content="The image below shows a simple field interaction in a balanced system:"
        textStyles="text-[14px] text-[#666666] mb-2"
      />
      <Image
        source={{
          uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1747064065/balc_nf8dsw.png",
        }}
        className="w-full h-[180px] rounded-xl mb-4"
        resizeMode="cover"
      />
      <TextContainer
        content="Notice how the forces are distributed evenly across the field."
        textStyles="text-[14px] text-[#666666] mb-2"
      />
      <TextContainer
        content="Summary:"
        textStyles="text-[15px] text-[#666666] mb-2 font-semibold"
      />
      <View>
        <TextContainer
          content="• Fields are fundamental to understanding energy transfer."
          textStyles="text-[14px] text-[#666666] mb-1"
        />
        <TextContainer
          content="• Real-world examples help visualize these concepts."
          textStyles="text-[14px] text-[#666666] mb-1"
        />
      </View>
    </View>
  );
};

export default CourseContent;
