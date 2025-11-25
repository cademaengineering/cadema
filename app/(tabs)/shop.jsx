import NameBar from "@/components/Reusables/NameBar";
import AddProductBtn from "@/components/Buttons/FloatingButtons/AddProductBtn";
import React, { useState } from "react";
import { FlatList, View, RefreshControl } from "react-native";
import Advertisement from "@/components/Reusables/Advertisement";
import ShopCategories from "@/components/Reusables/ShopCategories";
import ProductCard from "@/components/Reusables/ProductCard";

const products = [
  {
    id: "1",
    name: "Steal like an...",
    location: "New York, US",
    price: "$100",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product1_ehqv51.png",
  },
  {
    id: "2",
    name: "Steal like an...",
    location: "New York, US",
    price: "$100",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product2_wssoff.png",
  },
  {
    id: "3",
    name: "Steal like an...",
    location: "New York, US",
    price: "$100",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product3_kqwqcc.png",
  },
  {
    id: "4",
    name: "Steal like an...",
    location: "New York, US",
    price: "$100",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/Product7_bms3tp.png",
  },
  {
    id: "5",
    name: "Steal like an...",
    location: "New York, US",
    price: "$100",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product4_s8utcg.png",
  },
  {
    id: "6",
    name: "Steal like an...",
    location: "New York, US",
    price: "$100",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product6_jusaew.png",
  },
];

const Shop = () => {
  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1">
        <NameBar shop />
        <View className="pt-7">
          <Advertisement />
        </View>
        <View className="px-6">
          <ShopCategories />
        </View>
        <View className="px-6 flex-1">
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        </View>
        {/* Floating Create Post Button */}
        <View className="absolute right-6 bottom-8">
          <AddProductBtn />
        </View>
      </View>
    </View>
  );
};

export default Shop;
