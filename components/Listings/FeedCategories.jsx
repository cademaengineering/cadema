import CategoryAdd from "@/assets/icons/category-add.svg";
import { getUserCommunities } from "@/lib/supabaseServices";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import FeedCategoriesCard from "../Reusables/FeedCategoriesCard";

const FeedCategories = ({ onCategoryChange, selectedCategoryId }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    selectedCategoryId || "0"
  );
  const [userCommunities, setUserCommunities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadUserCommunities();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      setSelectedCategory(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const loadUserCommunities = async () => {
    try {
      const data = await getUserCommunities();
      setUserCommunities(data || []);
    } catch (error) {
      console.error("Error loading user communities:", error);
    }
  };

  // Default "All" category
  const allCategory = {
    id: "0",
    title: "Random Feeds",
    imageUrl: null,
    isActive: true,
  };

  const renderCategoryItem = ({ item, index }) => (
    <FeedCategoriesCard
      category={{
        id: item.id,
        title: item.name,
        imageUrl: item.image_url,
        isActive: item.id === selectedCategory,
      }}
      onPress={() => handleCategoryPress(item)}
      otherStyles="mx-1"
    />
  );

  const handleCategoryPress = (category) => {
    setSelectedCategory(category.id);
    if (onCategoryChange) {
      onCategoryChange(category.id);
    }
  };

  const handleAllCategoryPress = () => {
    setSelectedCategory("0");
    if (onCategoryChange) {
      onCategoryChange("0");
    }
  };

  const handleAddCategory = () => {
    router.push("/communities/categories");
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
            data={userCommunities}
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
