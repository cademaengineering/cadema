import React from "react";
import { ScrollView, View } from "react-native";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import ProductDetailsImage from "@/components/Reusables/ProductDetailsImage";
import TextHeader from "@/components/Reusables/TextHeader";
import TextContainer from "@/components/Reusables/TextContainer";
import TextInter from "@/components/Reusables/TextInter";
import SellerDetails from "@/components/Reusables/SellerDetails";
import AppButton from "@/components/Buttons/AppButton";
import { useRouter, useLocalSearchParams } from "expo-router";

const Index = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const goToCart = () => {
    router.push(`/product/${id}/cart`);
  };
  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Product details" />
        </View>
        <ScrollView className="flex-1 bg-[#F9FAFB] pt-6 py-4">
          <View className="pl-6">
            <ProductDetailsImage />
          </View>
          <View className="px-6 mt-3">
            <TextHeader
              content="Steal Like An Artist"
              textStyles="text-[16px]"
              customLineHeight={20}
            />
            <TextContainer
              content="New"
              textStyles="text-[14px] text-[#13E0A0]"
              viewStyles="mt-3"
            />
            <TextInter content="$25" textStyles="text-[20px]" />
            <View className="gap-3">
              <TextContainer
                content="Seller details"
                textStyles="text-[14px] text-[#000000]"
                viewStyles="mt-5"
              />
              <SellerDetails />
            </View>
            <View>
              <TextContainer
                content="Product details"
                textStyles="text-[14px] text-[#000000]"
                viewStyles="mt-5 border-b border-[#F2F2F2] pb-3"
              />
              <TextContainer
                content="Book: Steal like an artist | Author: Austin Kleon | Single unit"
                textStyles="text-[12px] text-[#808080]"
                viewStyles="mt-3"
              />
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Fixed buttons at the bottom */}
      <View className="absolute left-0 right-0 bottom-0 w-full bg-[#F9FAFB]">
        <View className="px-6 flex-row justify-center items-center w-full gap-5 pb-14 pt-5">
          <View>
            <AppButton
              btnLabel="Buy Now"
              handlePress={goToCart}
              textStyles="text-[#000E3A] text-center text-[14px]"
              moreStyles="bg-[#13E0A0] w-[170px]"
            />
          </View>
          <View>
            <AppButton
              btnLabel="Add to Cart"
              textStyles="text-[#000E3A] text-center text-[14px]"
              moreStyles="border border-[#000E3A] bg-transparent w-[170px]"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;
