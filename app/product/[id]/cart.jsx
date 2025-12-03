import AppButton from "@/components/Buttons/AppButton";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import CartItem from "@/components/Reusables/CartItem";
import { getCartItems } from "@/lib/supabaseServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const Cart = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const data = await getCartItems();
      setCartItems(data || []);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const goToCheckout = () => {
    if (cartItems.length === 0) {
      return;
    }
    router.push(`/product/${id}/checkout`);
  };

  if (loading) {
    return (
      <View className="bg-[#000E3A05] flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Cart" />
        </View>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000E3A" />
        </View>
      </View>
    );
  }

  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Cart" />
        </View>
        <View className="flex-1 bg-[#F9FAFB] pt-6 py-4 px-6">
          {cartItems.length === 0 ? (
            <View className="flex-1 justify-center items-center">
              <Text className="text-[#ADADAD] text-[16px]">
                Your cart is empty
              </Text>
            </View>
          ) : (
            <>
              <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                  <CartItem item={item} onUpdate={loadCartItems} />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ItemSeparatorComponent={() => <View className="h-4" />}
              />
              <View className="gap-5 pt-8">
                <Text className="text-[18px] font-bold text-[#030303]">
                  Total: ${calculateTotal()}
                </Text>
                <AppButton
                  btnLabel="Checkout"
                  textStyles=""
                  handlePress={goToCheckout}
                  moreStyles="bg-[#13E0A0]"
                />
                <AppButton
                  btnLabel="Continue Shopping"
                  textStyles="text-[#999999]"
                  moreStyles="bg-transparent border border-[#999999]"
                  handlePress={() => router.back()}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Cart;
