import AddProductBtn from "@/components/Buttons/FloatingButtons/AddProductBtn";
import Advertisement from "@/components/Reusables/Advertisement";
import NameBar from "@/components/Reusables/NameBar";
import ProductCard from "@/components/Reusables/ProductCard";
import ShopCategories from "@/components/Reusables/ShopCategories";
import { getAllProducts } from "@/lib/supabaseServices";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [selectedCategory])
  );

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts(selectedCategory);
      setProducts(data || []);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <View className="bg-[#F9FAFB] flex-1">
        <View className="pt-16 flex-1">
          <NameBar shop />
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#000E3A" />
            <Text className="mt-4 text-[#ADADAD] text-[14px]">
              Loading products...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1">
        <NameBar shop />
        <View className="pt-7">
          <Advertisement />
        </View>
        <View className="px-6">
          <ShopCategories
            onCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#13E0A0"]}
                tintColor="#13E0A0"
              />
            }
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center py-20">
                <Text className="text-[#ADADAD] text-[16px] text-center">
                  No products yet.{"\n"}Be the first to list a product!
                </Text>
              </View>
            }
          />
        </View>
        {/* Floating Add Product Button */}
        <View className="absolute right-6 bottom-8">
          <AddProductBtn />
        </View>
      </View>
    </View>
  );
};

export default Shop;
