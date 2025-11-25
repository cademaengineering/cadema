import AddScholarship from "@/components/Buttons/FloatingButtons/addScholarship";
import NameBar from "@/components/Reusables/NameBar";
import RoomatesCard from "@/components/Reusables/RoomatesCard";
import TextHeader from "@/components/Reusables/TextHeader";
import { FlatList, View } from "react-native";

const roommatesList = [
  {
    id: "1",
    title: "Merit Excellence Scholarship",
    organization: "Global Education Foundation",
    description:
      "A prestigious scholarship for outstanding academic performers with a minimum GPA of...",
    amount: "$15,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762689224/scholar1_o5binl.png",
  },
  {
    id: "2",
    title: "STEM Innovation Award",
    organization: "Technology Education Trust",
    description:
      "Supporting students pursuing careers in Science, Technology, Engineering, and Mathematics...",
    amount: "$20,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762691465/Rectangle_579_lt2g9m.png",
  },
  {
    id: "3",
    title: "Future Leaders Scholarship",
    organization: "Leadership Development Institute",
    description:
      "For students demonstrating exceptional leadership potential and community service...",
    amount: "$10,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762691464/Rectangle_579_1_kpdghj.png",
  },
  {
    id: "4",
    title: "Merit Excellence Scholarship",
    organization: "Global Education Foundation",
    description:
      "A prestigious scholarship for outstanding academic performers with a minimum GPA of...",
    amount: "$15,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762689224/scholar1_o5binl.png",
  },
  {
    id: "5",
    title: "STEM Innovation Award",
    organization: "Technology Education Trust",
    description:
      "Supporting students pursuing careers in Science, Technology, Engineering, and Mathematics...",
    amount: "$20,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762691465/Rectangle_579_lt2g9m.png",
  },
  {
    id: "6",
    title: "Future Leaders Scholarship",
    organization: "Leadership Development Institute",
    description:
      "For students demonstrating exceptional leadership potential and community service...",
    amount: "$10,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1762691464/Rectangle_579_1_kpdghj.png",
  },
];

const Roommates = () => {
  const renderHeader = () => (
    <>
      <View className="pt-6">
        <TextHeader
          content={`Find the perfect Roommates that matches you`}
          textStyles={`text-[14px]`}
          viewStyles={`w-4/5 mb-3`}
          customLineHeight={20}
        />
      </View>
    </>
  );

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1">
        <NameBar />
        <FlatList
          data={roommatesList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <RoomatesCard roommate={item} index={index} />
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{ paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View className="h-4" />}
        />
        {/* Floating Create Post Button */}
        <View className="absolute right-6 bottom-8">
          <AddScholarship />
        </View>
      </View>
    </View>
  );
};

export default Roommates;
