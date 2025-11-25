import Fest from "@/assets/icons/fest.svg";
import Summit from "@/assets/icons/summit.svg";
import AddScholarship from "@/components/Buttons/FloatingButtons/addScholarship";
import CoursesCategories from "@/components/Reusables/CoursesCategories";
import EventCard from "@/components/Reusables/EventCard";
import NameBar from "@/components/Reusables/NameBar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { BlurView } from "expo-blur";
import { FlatList, View } from "react-native";

const roommatesList = [
  {
    id: "1",
    title: "Amazon Web Summit",
    organization: "Global Education Foundation",
    description:
      "A prestigious scholarship for outstanding academic performers with a minimum GPA of...",
    amount: "$15,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1764073935/jjRectangle_579_gltjdg.png",
  },
  {
    id: "2",
    title: "STEM Innovation Award",
    organization: "Technology Education Trust",
    description:
      "Supporting students pursuing careers in Science, Technology, Engineering, and Mathematics...",
    amount: "$20,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1764073935/hh_nflvbr.png",
  },
  {
    id: "3",
    title: "Future Leaders Scholarship",
    organization: "Leadership Development Institute",
    description:
      "For students demonstrating exceptional leadership potential and community service...",
    amount: "$10,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1764073934/mnnbRectangle_579_4_qu9rpl.png",
  },
  {
    id: "4",
    title: "Merit Excellence Scholarship",
    organization: "Global Education Foundation",
    description:
      "A prestigious scholarship for outstanding academic performers with a minimum GPA of...",
    amount: "$15,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1764073934/mmRectangle_579_4_c79bml.png",
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

const Events = () => {
  const renderHeader = () => (
    <>
      <View className="pt-6">
        <View className="">
          <View
            className="p-3 bg-[#F9FAFB] mb-4"
            style={{
              borderWidth: 1,
              borderColor: "#CCCCCC",
              borderStyle: "dashed",
              borderRadius: 12,
            }}
          >
            <TextHeader
              content={`Upcoming Events`}
              textStyles={`text-[14px]`}
              customLineHeight={20}
            />
            <TextContainer
              content={`Dont miss these special events`}
              textStyles={`text-[12px] text-[#999999]`}
            />
            <View className="gap-4 pt-3">
              <View className="bg-[#FF8D28] py-3 pl-3 rounded-[12px] flex-row justify-between items-end overflow-hidden">
                <View>
                  <TextHeader
                    content={`Uptown Tech Fest`}
                    textStyles={`text-white text-[14px]`}
                    customLineHeight={20}
                  />
                  <TextContainer
                    content={`November 5`}
                    textStyles={`text-[12px] text-white`}
                  />
                  <BlurView
                    intensity={20}
                    tint="light"
                    className="rounded-full w-[76px] overflow-hidden"
                  >
                    <TextContainer
                      content={`14 days left`}
                      textStyles={`text-[10px] text-white text-center`}
                      viewStyles={`p-2`}
                    />
                  </BlurView>
                </View>
                <Fest />
              </View>
              <View className="bg-[#0088FF] py-3 pl-3 rounded-[12px] flex-row justify-between items-end overflow-hidden">
                <View>
                  <TextHeader
                    content={`Harvard Account Summit`}
                    textStyles={`text-white text-[14px]`}
                    customLineHeight={20}
                  />
                  <TextContainer
                    content={`December 21`}
                    textStyles={`text-[12px] text-white`}
                  />
                  <BlurView
                    intensity={20}
                    tint="light"
                    className="rounded-full w-[76px] overflow-hidden"
                  >
                    <TextContainer
                      content={`43 days left`}
                      textStyles={`text-[10px] text-white text-center`}
                      viewStyles={`p-2`}
                    />
                  </BlurView>
                </View>
                <Summit />
              </View>
            </View>
          </View>
        </View>
        <TextHeader
          content={`Happening this November`}
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
        <View>
          <CoursesCategories />
        </View>

        <FlatList
          data={roommatesList}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <EventCard event={item} index={index} />
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

export default Events;
