import React from "react";
import { View } from "react-native";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import CartItem from "@/components/Reusables/CartItem";
import AppButton from "@/components/Buttons/AppButton";
import { useRouter, useLocalSearchParams } from "expo-router";

const Cart = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const goToCheckout = () => {
    router.push(`/product/${id}/checkout`);
  };
  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Cart" />
        </View>
        <View className="flex-1 bg-[#F9FAFB] pt-6 py-4 px-6">
          <CartItem />
          <View className="gap-5 pt-8">
            <AppButton
              btnLabel="Checkout"
              textStyles=""
              handlePress={goToCheckout}
              moreStyles="bg-[#13E0A0]"
            />
            <AppButton
              btnLabel="Checkout"
              textStyles="text-[#999999]"
              moreStyles="bg-transparent border border-[#999999]"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cart;
