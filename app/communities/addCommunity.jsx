import AddIcon from "@/assets/icons/add-community-icon.svg";
import AppButton from "@/components/Buttons/AppButton";
import SearchInput from "@/components/Forms/SearchInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import CommunityCard from "@/components/Reusables/CommunityCard";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { getCommunitiesByCategory } from "@/lib/supabaseServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from "react-native";

const AddCommunity = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  const [search, setSearch] = useState("");
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCommunities();
  }, [category]);

  // Listen for focus event to reload when coming back from create screen
  useEffect(() => {
    const unsubscribe = router.addListener?.("focus", () => {
      loadCommunities();
    });

    return unsubscribe;
  }, [category]);

  const loadCommunities = async () => {
    try {
      setLoading(true);
      const data = await getCommunitiesByCategory(category);
      setCommunities(data || []);
    } catch (error) {
      console.error("Error loading communities:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCommunities();
    setRefreshing(false);
  };

  const filteredData = communities.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderCommunity = ({ item }) => (
    <CommunityCard
      community={{
        id: item.community_id,
        imageUrl: item.image_url,
        name: item.name,
        members: item.member_count || 0,
      }}
      onRefresh={loadCommunities}
    />
  );

  const gotoCreateCommunity = () => {
    router.push(`/communities/createCommunity?category=${category}`);
  };

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1 px-6">
        <ArrowTitlebar title={category} />
        <TextContainer
          content="Choose communities you want to add to your feeds"
          textStyles="text-[#808080] text-[12px] text-center w-[70%] mx-auto"
        />
        <View className="pt-6">
          <SearchInput
            placeholder="Search communities"
            value={search}
            onChangeText={setSearch}
            moreStyles=""
          />
        </View>
        <View className="flex-1 pt-4">
          {loading && !refreshing ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#000E3A" />
            </View>
          ) : (
            <FlatList
              data={filteredData}
              renderItem={renderCommunity}
              keyExtractor={(item) => item.community_id}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View className="h-4" />}
              contentContainerStyle={{ paddingBottom: 24 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#13E0A0"]}
                  tintColor="#13E0A0"
                />
              }
              ListEmptyComponent={
                <View className="flex-1 justify-center items-center py-10">
                  <TextContainer
                    content="No communities found in this category"
                    textStyles="text-[#ADADAD] text-[14px]"
                  />
                </View>
              }
            />
          )}
        </View>
        <View className="py-6">
          <View className="bg-white p-5 justify-center items-center rounded-[12px] border-dashed border-2 border-[#ADADAD]">
            <AddIcon />
            <TextHeader
              content={`Create New Community`}
              textStyles={`text-[14px]`}
              customLineHeight={20}
            />
            <TextContainer
              content={`Start your own sub-group under ${category} and connect with like-minded students`}
              textStyles={`text-[#ADADAD] text-[12px] text-center mt-2`}
            />
            <View className="pt-3">
              <AppButton
                handlePress={gotoCreateCommunity}
                btnLabel={`Create Community`}
                moreStyles={`bg-[#13E0A0] px-16`}
                textStyles={`text-[#000E3A]`}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddCommunity;
