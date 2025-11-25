import AddScholarship from "@/components/Buttons/FloatingButtons/addScholarship";
import JobsCard from "@/components/Reusables/JobsCard";
import NameBar from "@/components/Reusables/NameBar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { FlatList, View } from "react-native";

const JobList = [
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
];

const Jobs = () => {
  const renderHeader = () => (
    <>
      <View className="pt-6">
        <TextHeader
          content={`Job Opportunities`}
          textStyles={`text-[14px]`}
          customLineHeight={20}
        />
      </View>
      <View className="flex-row justify-start items-center gap-2 pt-6 pb-4">
        <View className="bg-[#13E0A0] w-[16px] h-[16px] rounded-full"></View>
        <TextContainer
          content={`${JobList.length} Jobs available`}
          textStyles={`text-[12px] text-[#999999]`}
        />
      </View>
    </>
  );

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1">
        <NameBar />
        <FlatList
          data={JobList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobsCard job={item} />}
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

export default Jobs;
