import React, { useState } from "react";
import { TouchableOpacity, View, FlatList } from "react-native";
import TextHeader from "./TextHeader";

const courses = [
  { id: "1", name: "All" },
  { id: "2", name: "Agric" },
  { id: "3", name: "Arts and Media" },
  { id: "4", name: "Automotive" },
  { id: "5", name: "Aviation" },
];

const CoursesCategories = () => {
  const [activeId, setActiveId] = useState(courses[0].id);

  return (
    <View className="pt-6">
      <FlatList
        data={courses}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            className={`px-4 h-[42px] justify-center items-center rounded-[12px] ml-3 ${
              activeId === item.id ? "bg-[#13E0A0]" : "bg-[#F2F2F2]"
            }`}
            onPress={() => setActiveId(item.id)}
          >
            <TextHeader
              content={item.name}
              viewStyles={`text-[14px] ${
                activeId === item.id ? "text-[#000E3A]" : "text-[#999999]"
              }`}
              customLineHeight={20}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CoursesCategories;
