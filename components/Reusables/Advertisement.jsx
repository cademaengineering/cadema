import React, { useRef, useEffect, useState } from "react";
import { Image, View, FlatList } from "react-native";

const adverts = [
  {
    id: "1",
    uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762085398/advert1_wwz4os.png",
  },
  {
    id: "2",
    uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762085399/advert2_ewi2ih.png",
  },
  // Add more adverts as needed
];

const Advertisement = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % adverts.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View className="w-full">
      <FlatList
        ref={flatListRef}
        data={adverts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mx-3">
            <Image
              source={{ uri: item.uri }}
              className="w-[366px] h-[126px] rounded-xl"
              resizeMode="cover"
            />
          </View>
        )}
        pagingEnabled
      />
    </View>
  );
};

export default Advertisement;
