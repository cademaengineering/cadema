import CoursesCategories from "@/components/Reusables/CoursesCategories";
import MentorCard from "@/components/Reusables/MentorCard";
import NameBar from "@/components/Reusables/NameBar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { FlatList, View } from "react-native";

const mentorsData = Array.from({ length: 6 }, (_, i) => ({ id: `${i + 1}` }));

const Mentors = () => {
  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1">
        <NameBar courses />
        <View className="px-6 pt-2">
          <TextHeader
            content="Connect with industry experts"
            textStyles="text-[14px] text-[#000000]"
            customLineHeight={20}
          />
          <TextContainer
            content="Connect with industry experts, advisors, and sponsors in your field"
            textStyles="text-[12px] text-[#999999]"
          />
        </View>
        <View>
          <CoursesCategories />
        </View>
        <View className="px-6 flex-1">
          <View>
            <TextHeader
              content="Our Tutors"
              textStyles="text-[14px] text-[#030303]"
            />
          </View>
          <FlatList
            data={mentorsData}
            keyExtractor={(item) => item.id}
            renderItem={() => <MentorCard />}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        </View>
      </View>
    </View>
  );
};

export default Mentors;
