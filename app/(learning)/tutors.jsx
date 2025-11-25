import CoursesCategories from "@/components/Reusables/CoursesCategories";
import NameBar from "@/components/Reusables/NameBar";
import TutorCard from "@/components/Reusables/TutorCard";
import TextHeader from "@/components/Reusables/TextHeader";
import React from "react";
import { FlatList, View } from "react-native";

const tutorsData = Array.from({ length: 6 }, (_, i) => ({ id: `${i + 1}` }));

const Tutors = () => {
  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="pt-16 flex-1">
        <NameBar courses />
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
            data={tutorsData}
            keyExtractor={(item) => item.id}
            renderItem={() => <TutorCard />}
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

export default Tutors;
