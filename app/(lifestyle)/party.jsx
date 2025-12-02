import AddScholarship from "@/components/Buttons/FloatingButtons/AddParty";
import AllEventCard from "@/components/Reusables/AllEventCard";
import NameBar from "@/components/Reusables/NameBar";
import EventCard from "@/components/Reusables/PartyCard";
import TextHeader from "@/components/Reusables/TextHeader";
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
    title: "Tech Innovation Party",
    organization: "Tech Leaders Network",
    description:
      "Join us for an evening of networking and innovation discussions with industry leaders...",
    amount: "$20,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1764073934/mmRectangle_579_4_c79bml.png",
  },
  {
    id: "3",
    title: "Campus Music Festival",
    organization: "Student Affairs Department",
    description:
      "Annual music festival featuring live performances from local and international artists...",
    amount: "$10,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1764073935/jjRectangle_579_gltjdg.png",
  },
  {
    id: "4",
    title: "Entrepreneurship Workshop",
    organization: "Business School",
    description:
      "Learn from successful entrepreneurs and develop your business ideas in this intensive workshop...",
    amount: "$25,000",
    image:
      "https://res.cloudinary.com/dtxr92piy/image/upload/v1764073935/hh_nflvbr.png",
  },
];

const Party = () => {
  const renderHeader = () => (
    <>
      <View className="pt-6">
        <TextHeader
          content={`Happening this November`}
          textStyles={`text-[14px]`}
          viewStyles={`w-4/5 mb-3`}
          customLineHeight={20}
        />
      </View>
      <View className=" mb-4">
        <EventCard party={roommatesList[0]} />
      </View>
      <TextHeader
        content={`All Events`}
        textStyles={`text-[14px]`}
        viewStyles={`w-4/5 mb-3`}
        customLineHeight={20}
      />
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
            <AllEventCard event={item} index={index} />
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

export default Party;
