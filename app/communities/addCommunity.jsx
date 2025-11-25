import SearchInput from "@/components/Forms/SearchInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import CommunityCard from "@/components/Reusables/CommunityCard";
import TextContainer from "@/components/Reusables/TextContainer";
import React, { useState } from "react";
import { FlatList, View } from "react-native";

const communitiesData = [
  {
    id: "1",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/use_i5jqsi.png",
    name: "All American students",
    members: 1200,
  },
  {
    id: "2",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/google_abibwp.png",
    name: "Google Community",
    members: 800,
  },
  {
    id: "3",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/unilorin_tuaswg.png",
    name: "Unilorites",
    members: 500,
  },
  {
    id: "4",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/engineeringdiscover_keor4a.png",
    name: "The Job Region",
    members: 350,
  },
  {
    id: "5",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
    name: "Talent Hub",
    members: 500,
  },
  {
    id: "6",
    imageUrl:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/jobreigion_qeweb8.png",
    name: "Engineering Discoveries",
    members: 350,
  },
];

const AddCommunity = () => {
  const [search, setSearch] = useState("");

  const filteredData = communitiesData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderCommunity = ({ item }) => <CommunityCard community={item} />;

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1 px-6">
        <ArrowTitlebar title="Add Community" />
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
          <FlatList
            data={filteredData}
            renderItem={renderCommunity}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-4" />}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </View>
      </View>
    </View>
  );
};

export default AddCommunity;
