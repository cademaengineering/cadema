import CreatePostBtn from "@/components/Buttons/FloatingButtons/CreatePostBtn";
import FeedCategories from "@/components/Listings/FeedCategories";
import FeedCard from "@/components/Reusables/FeedCard";
import NameBar from "@/components/Reusables/NameBar";
import { getAllPosts, getPostsByCommunityId } from "@/lib/supabaseServices";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCommunityId, setSelectedCommunityId] = useState("0"); // "0" means all feeds

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [selectedCommunityId])
  );

  const loadPosts = async () => {
    try {
      setLoading(true);
      let data;

      if (selectedCommunityId === "0") {
        // Load all posts (random feeds)
        data = await getAllPosts();
      } else {
        // Load posts from specific community
        data = await getPostsByCommunityId(selectedCommunityId);
      }

      setFeedData(data || []);
    } catch (error) {
      console.error("Error loading posts:", error);
      setFeedData([]);
    } finally {
      setLoading(false);
    }
  };

  const renderFeedItem = ({ item, index }) => <FeedCard post={item} />;

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    setRefreshing(false);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCommunityId(categoryId);
    console.log("Filter by category:", categoryId);
  };

  if (loading) {
    return (
      <View className="bg-[#F9FAFB] flex-1">
        <View className="pt-16 flex-1">
          <NameBar />
          <FeedCategories onCategoryChange={handleCategoryChange} />
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#000E3A" />
            <Text className="mt-4 text-[#ADADAD] text-[14px]">
              Loading posts...
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1">
        <NameBar />
        <FeedCategories
          onCategoryChange={handleCategoryChange}
          selectedCategoryId={selectedCommunityId}
        />

        <View className="pb-20">
          <FlatList
            data={feedData}
            renderItem={renderFeedItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 100,
            }}
            ItemSeparatorComponent={() => <View className="h-4" />}
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
                  No posts yet.{"\n"}Be the first to share something!
                </Text>
              </View>
            }
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            removeClippedSubviews={true}
          />
        </View>
        {/* Floating Create Post Button */}
        <View className="absolute right-6 bottom-8">
          <CreatePostBtn
            communityId={
              selectedCommunityId !== "0" ? selectedCommunityId : null
            }
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
