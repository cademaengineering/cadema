import React, { useState } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import FeedCategoriesCard from "../Reusables/FeedCategoriesCard";
import CategoryAdd from "@/assets/icons/category-add.svg";
import { useRouter } from "expo-router";

const FeedCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("0");
  const router = useRouter();

  // Default "All" category
  const allCategory = {
    id: "0",
    title: "Random Feeds",
    imageUrl: null,
    isActive: true,
  };

  // Sample data for categories - replace with your actual data
  const categoriesData = [
    {
      id: "1",
      title: "School feeds",
      imageUrl:
        "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/use_i5jqsi.png",
      isActive: false,
    },
  ];

  const renderCategoryItem = ({ item, index }) => (
    <FeedCategoriesCard
      category={{
        ...item,
        isActive: item.id === selectedCategory,
      }}
      onPress={() => handleCategoryPress(item)}
      otherStyles="mx-1"
    />
  );

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
    console.log("Selected category:", category.title);
    // Add your category selection logic here
  };

  const handleAllCategoryPress = () => {
    setSelectedCategory("0");
    console.log("Selected: All Feeds");
  };

  const handleAddCategory = () => {
    console.log("Add new category");
    router.push("/communities/addCommunity");
    // Add your add category logic here
  };

  return (
    <View className="py-4">
      <View className="flex-row items-center px-6">
        {/* All Feeds Category */}
        <FeedCategoriesCard
          category={{
            ...allCategory,
            isActive: selectedCategory === "0",
          }}
          onPress={handleAllCategoryPress}
          otherStyles="w-[69px] mr-3"
        />

        {/* Scrollable Categories */}
        <View className="flex-1">
          <FlatList
            data={categoriesData}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingRight: 16,
            }}
            ItemSeparatorComponent={() => <View className="w-2" />}
            bounces={false}
            decelerationRate="fast"
          />
        </View>

        {/* Add Category Button */}
        <TouchableOpacity onPress={handleAddCategory} className="ml-3">
          <CategoryAdd width={32} height={32} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedCategories;
