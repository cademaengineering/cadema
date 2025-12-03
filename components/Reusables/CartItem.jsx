import { removeFromCart } from "@/lib/supabaseServices";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextInter from "./TextInter";

const CartItem = ({ item, onUpdate }) => {
  const handleRemove = async () => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              await removeFromCart(item.id);
              if (onUpdate) onUpdate();
            } catch (error) {
              console.error("Error removing from cart:", error);
              Alert.alert("Error", "Failed to remove item from cart");
            }
          },
        },
      ]
    );
  };

  const imageUrl =
    item.product.image_urls?.[0] ||
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1762092943/product1_ehqv51.png";

  return (
    <View className="flex-row justify-start items-start bg-white rounded-[12px] p-2 gap-3">
      <Image
        source={{ uri: imageUrl }}
        className="w-[120px] h-[120px] rounded-[6px]"
      />
      <View className="flex-1 gap-3">
        <TextContainer content={item.product.name} textStyles="text-[16px]" />
        <TextContainer
          content={item.product.condition || "Pre-owned"}
          textStyles="text-[12px] text-[#13E0A0]"
        />
        <View className="flex-row justify-between items-center">
          <TextInter
            content={`$${item.product.price}`}
            customLineHeight={20}
            textStyles="text-[14px] text-[#1A1A1A]"
          />
          <TextContainer
            content={`Qty: ${item.quantity}`}
            textStyles="text-[12px] text-[#808080]"
          />
        </View>
        <TouchableOpacity onPress={handleRemove}>
          <TextContainer
            content="Remove"
            textStyles="text-[12px] text-red-500"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
