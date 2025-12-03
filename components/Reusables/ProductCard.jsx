import AddCart from "@/assets/icons/add-cart.svg";
import Location from "@/assets/icons/location.svg";
import { addToCart } from "@/lib/supabaseServices";
import { useRouter } from "expo-router";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextInter from "./TextInter";

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id);
      Alert.alert("Success", "Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add product to cart");
    }
  };

  const imageUrl =
    product.image_urls?.[0] ||
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product1_ehqv51.png";

  return (
    <View
      className="border border-[#F2F2F2] bg-white p-2 rounded-[12px]"
      style={{
        shadowColor: "#F2F2F2",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      <View>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={{ uri: imageUrl }}
            className="w-[154px] h-[120px] rounded-[6px]"
          />
        </TouchableOpacity>
        <View className="px-1 pt-5">
          <View className="flex-row justify-between items-center">
            <TextContainer
              content={product.name}
              textStyles="text-[#030303] text-[14px]"
            />
            <TouchableOpacity onPress={handleAddToCart}>
              <AddCart width={20} height={20} />
            </TouchableOpacity>
          </View>
          <TextContainer
            content={product.condition || "Pre-owned"}
            textStyles="text-[#808080] text-[12px]"
          />
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center">
              <Location width={14} height={14} />
              <TextContainer
                content={product.location || "N/A"}
                textStyles="text-[#808080] text-[10px]"
              />
            </View>
            <TextInter
              content={`$${product.price}`}
              textStyles="text-[#1A1A1A] text-[12px]"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
