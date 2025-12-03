import SearchInput from "@/components/Forms/SearchInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import CategoryCard from "@/components/Reusables/CategoryCard";
import TextHeader from "@/components/Reusables/TextHeader";
import { useState } from "react";
import { FlatList, View } from "react-native";

import AnimationIcon from "@/assets/icons/animation-icon.svg";
import EntrepreneurshipIcon from "@/assets/icons/entrepreneurship-icon.svg";
import GamingIcon from "@/assets/icons/gaming-icon.svg";
import LoveIcon from "@/assets/icons/love-icon.svg";
import ScienceIcon from "@/assets/icons/science-tech.svg";
import BusinessIcon from "@/assets/icons/two-business-icon.svg";

const communitiesData = [
  {
    id: "1",
    Icon: GamingIcon,
    name: "Gaming",
    members: 1200,
  },
  {
    id: "2",
    Icon: ScienceIcon,
    name: "Science",
    members: 800,
  },
  {
    id: "3",
    Icon: BusinessIcon,
    name: "Business",
    members: 500,
  },
  {
    id: "4",
    Icon: EntrepreneurshipIcon,
    name: "Entrepreneurship",
    members: 350,
  },
  {
    id: "5",
    Icon: AnimationIcon,
    name: "Animation",
    members: 500,
  },
  {
    id: "6",
    Icon: LoveIcon,
    name: "Hobbies",
    members: 350,
  },
];

const Categories = () => {
  const [search, setSearch] = useState("");

  const filteredData = communitiesData.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderCommunity = ({ item }) => <CategoryCard community={item} />;

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1 px-6">
        <ArrowTitlebar title="Categories" />
        <View className="pt-6">
          <SearchInput
            placeholder="Search communities"
            value={search}
            onChangeText={setSearch}
            moreStyles=""
          />
        </View>

        <TextHeader
          content="Explore and choose the right Community post that aligns with you."
          textStyles=" text-[14px]"
          customLineHeight={20}
          viewStyles={`pt-2`}
        />
        <View className="flex-1 pt-4">
          <FlatList
            data={filteredData}
            renderItem={renderCommunity}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ gap: 16 }}
            ItemSeparatorComponent={() => <View className="h-4" />}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </View>
      </View>
    </View>
  );
};

export default Categories;
