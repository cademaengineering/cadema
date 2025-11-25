import React from "react";
import { View, FlatList, Image } from "react-native";

const ProductDetailsImage = () => {
  const productImages = [
    {
      id: "1",
      uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product1_ehqv51.png",
    },
    {
      id: "2",
      uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product1_ehqv51.png",
    },
  ];
  return (
    <View className="h-[220px] bg-[#F9FAFB]">
      <FlatList
        data={productImages}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mr-4">
            <Image
              source={{ uri: item.uri }}
              className="w-[202px] h-[201px] border border-[#13E0A0] rounded-[12px]"
              resizeMode="cover"
            />
          </View>
        )}
      />
    </View>
  );
};

export default ProductDetailsImage;
