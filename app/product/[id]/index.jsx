import AppButton from "@/components/Buttons/AppButton";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import ProductDetailsImage from "@/components/Reusables/ProductDetailsImage";
import SellerDetails from "@/components/Reusables/SellerDetails";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import TextInter from "@/components/Reusables/TextInter";
import { addToCart, getProductById } from "@/lib/supabaseServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error("Error loading product:", error);
      Alert.alert("Error", "Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const goToCart = () => {
    router.push(`/product/${id}/cart`);
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      await addToCart(id);
      Alert.alert("Success", "Product added to cart!", [
        {
          text: "View Cart",
          onPress: () => router.push(`/product/${id}/cart`),
        },
        {
          text: "Continue Shopping",
          style: "cancel",
        },
      ]);
    } catch (error) {
      console.error("Error adding to cart:", error);
      Alert.alert("Error", "Failed to add product to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <View className="bg-[#000E3A05] flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Product details" />
        </View>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000E3A" />
          <Text className="mt-4 text-[#ADADAD] text-[14px]">
            Loading product...
          </Text>
        </View>
      </View>
    );
  }

  if (!product) {
    return (
      <View className="bg-[#000E3A05] flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Product details" />
        </View>
        <View className="flex-1 justify-center items-center">
          <Text className="text-[#ADADAD] text-[16px]">Product not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Product details" />
        </View>
        <ScrollView className="flex-1 bg-[#F9FAFB] pt-6 py-4">
          <View className="pl-6">
            <ProductDetailsImage images={product.image_urls} />
          </View>
          <View className="px-6 mt-3">
            <TextHeader
              content={product.name}
              textStyles="text-[16px]"
              customLineHeight={20}
            />
            <TextContainer
              content={product.condition || "Pre-owned"}
              textStyles="text-[14px] text-[#13E0A0]"
              viewStyles="mt-3"
            />
            <TextInter content={`$${product.price}`} textStyles="text-[20px]" />
            <View className="gap-3">
              <TextContainer
                content="Seller details"
                textStyles="text-[14px] text-[#000000]"
                viewStyles="mt-5"
              />
              <SellerDetails
                seller={product.seller}
                location={product.location}
              />
            </View>
            <View>
              <TextContainer
                content="Product details"
                textStyles="text-[14px] text-[#000000]"
                viewStyles="mt-5 border-b border-[#F2F2F2] pb-3"
              />
              <TextContainer
                content={product.description || "No description available"}
                textStyles="text-[12px] text-[#808080]"
                viewStyles="mt-3"
              />
              <View className="mt-3">
                <TextContainer
                  content={`Category: ${product.category}`}
                  textStyles="text-[12px] text-[#808080]"
                />
              </View>
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
              moreStyles="bg-[#13E0A0] px-10"
            />
          </View>
          <View>
            <AppButton
              btnLabel={addingToCart ? "Adding..." : "Add to Cart"}
              handlePress={handleAddToCart}
              disabled={addingToCart}
              textStyles="text-[#000E3A] text-center text-[14px]"
              moreStyles="border border-[#000E3A] bg-transparent px-10"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;
