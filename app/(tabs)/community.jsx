import FeedCategories from "@/components/Listings/FeedCategories";
import NameBar from "@/components/Reusables/NameBar";
import FeedCard from "@/components/Reusables/FeedCard";
import CreatePostBtn from "@/components/Buttons/FloatingButtons/CreatePostBtn";
import React, { useState } from "react";
import { FlatList, View, RefreshControl } from "react-native";

const Index = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [feedData, setFeedData] = useState([
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar:
          "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/avatar1.png",
        verified: true,
      },
      content:
        "Just completed an amazing project using React Native! The learning curve was steep but totally worth it. #ReactNative #MobileDev",
      images: [
        "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/project1.png",
      ],
      likes: 24,
      comments: 8,
      shares: 3,
      timestamp: "2h",
      category: "Technology",
    },
    {
      id: "2",
      user: {
        name: "Sarah Wilson",
        avatar:
          "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/avatar2.png",
        verified: false,
      },
      content:
        "Beautiful sunset from my evening walk. Sometimes we need to slow down and appreciate the simple things in life. 🌅",
      images: [
        "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/sunset.png",
      ],
      likes: 156,
      comments: 23,
      shares: 12,
      timestamp: "4h",
      category: "Lifestyle",
    },
    {
      id: "3",
      user: {
        name: "Mike Johnson",
        avatar:
          "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/avatar3.png",
        verified: true,
      },
      content:
        "Excited to announce that our startup just secured Series A funding! Thank you to everyone who believed in our vision. The journey continues! 🚀",
      images: [],
      likes: 89,
      comments: 45,
      shares: 28,
      timestamp: "6h",
      category: "Business",
    },
    {
      id: "4",
      user: {
        name: "Emily Chen",
        avatar:
          "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/avatar4.png",
        verified: false,
      },
      content:
        "New design system for our mobile app is finally ready! Clean, consistent, and user-friendly. What do you think?",
      images: [
        "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/design1.png",
        "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/design2.png",
      ],
      likes: 67,
      comments: 15,
      shares: 9,
      timestamp: "8h",
      category: "Design",
    },
  ]);

  const renderFeedItem = ({ item, index }) => (
    <FeedCard
      feed={item}
      onLike={(feedId) => handleLike(feedId)}
      onComment={(feedId) => handleComment(feedId)}
      onShare={(feedId) => handleShare(feedId)}
      onUserPress={(userId) => handleUserPress(userId)}
    />
  );

  const handleLike = (feedId) => {
    setFeedData((prevData) =>
      prevData.map((item) =>
        item.id === feedId ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  const handleComment = (feedId) => {
    console.log("Open comments for feed:", feedId);
    // Navigate to comments screen or open modal
  };

  const handleShare = (feedId) => {
    console.log("Share feed:", feedId);
    // Implement share functionality
  };

  const handleUserPress = (userId) => {
    console.log("Navigate to user profile:", userId);
    // Navigate to user profile screen
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
      console.log("Feed refreshed");
    }, 2000);
  };

  const handleCategoryChange = (category) => {
    console.log("Filter by category:", category.title);
    // Implement category filtering logic
  };

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1">
        <NameBar />
        <FeedCategories onCategoryChange={handleCategoryChange} />

        <View className="pb-20">
          <FlatList
            data={feedData}
            renderItem={renderFeedItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 100, // Extra padding for tab bar
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
            initialNumToRender={3}
            maxToRenderPerBatch={5}
            windowSize={10}
            removeClippedSubviews={true}
            getItemLayout={(data, index) => ({
              length: 200, // Approximate card height
              offset: 200 * index + 16 * index, // Height + separator
              index,
            })}
          />
        </View>
        {/* Floating Create Post Button */}
        <View className="absolute right-6 bottom-8">
          <CreatePostBtn />
        </View>
      </View>
    </View>
  );
};

export default Index;
