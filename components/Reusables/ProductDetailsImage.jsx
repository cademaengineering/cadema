import { FlatList, Image, View } from "react-native";

const ProductDetailsImage = ({ images = [] }) => {
  // Use provided images or fallback to default
  const productImages =
    images.length > 0
      ? images.map((url, index) => ({ id: String(index + 1), uri: url }))
      : [
          {
            id: "1",
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
