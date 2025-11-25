import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import TextContainer from "./TextContainer";
import AddCart from "@/assets/icons/add-cart.svg";
import Location from "@/assets/icons/location.svg";
import TextInter from "./TextInter";

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <View
      className="border border-[#F2F2F2] bg-white p-2 rounded-[12px]"
      style={{
        shadowColor: "#F2F2F2",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8, // blur
        elevation: 2, // for Android shadow
      }}
    >
      <View>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={{ uri: product.imageUrl }}
            className="w-[154px] h-[120px] rounded-[6px]"
          />
        </TouchableOpacity>
        <View className="px-1 pt-5">
          <View className="flex-row justify-between items-center">
            <TextContainer
              content={product.name}
              textStyles="text-[#030303] text-[14px]"
            />
            <TouchableOpacity>
              <AddCart width={20} height={20} />
            </TouchableOpacity>
          </View>
          <TextContainer
            content="Pre-owned"
            textStyles="text-[#808080] text-[12px]"
          />
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center">
              <Location width={14} height={14} />
              <TextContainer
                content={product.location}
                textStyles="text-[#808080] text-[10px]"
              />
            </View>
            <TextInter
              content={product.price}
              textStyles="text-[#1A1A1A] text-[12px]"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
