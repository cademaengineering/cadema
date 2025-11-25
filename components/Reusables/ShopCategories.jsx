import React, { useState } from "react";
import { TouchableOpacity, View, FlatList } from "react-native";
import TextHeader from "./TextHeader";

const categories = [
  { id: "1", name: "All" },
  { id: "2", name: "Books" },
  { id: "3", name: "Electronics" },
  { id: "4", name: "Men's" },
  { id: "5", name: "Women's" },
];

const ShopCategories = () => {
  const [activeId, setActiveId] = useState(categories[0].id);

  return (
    <View className="pt-6">
      <TextHeader
        content="Categories"
        textStyles="text-[14px]"
        customLineHeight={20}
      />
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 8 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            className={`px-4 h-[42px] justify-center items-center rounded-[12px] mr-3 ${
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

export default ShopCategories;
