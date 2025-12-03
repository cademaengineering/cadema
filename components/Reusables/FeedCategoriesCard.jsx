import { Image, Text, TouchableOpacity, View } from "react-native";
import TextHeader from "./TextHeader";

const FeedCategoriesCard = ({ otherStyles, category, onPress }) => {
  // Generate background color based on category ID
  const getBackgroundColor = () => {
    if (!category?.id || category.id === "0") return null;

    const colors = [
      "#FF6B6B", // Red
      "#4ECDC4", // Teal
      "#45B7D1", // Blue
      "#F7B731", // Yellow
      "#5F27CD", // Purple
      "#00D2D3", // Cyan
      "#FF9FF3", // Pink
      "#54A0FF", // Light Blue
      "#48DBFB", // Sky Blue
      "#FF6348", // Orange
      "#1DD1A1", // Green
      "#FD79A8", // Rose
      "#A29BFE", // Lavender
      "#6C5CE7", // Indigo
      "#FDCB6E", // Mustard
    ];

    // Use category ID to generate consistent color
    const hash = category.id.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name) => {
    if (!name) return "C";
    const words = name.trim().split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Handle image source properly
  const getImageSource = () => {
    if (category?.imageUrl) {
      return { uri: category.imageUrl };
    }
    if (category?.id === "0") {
      return require("@/assets/icons/all.png");
    }
    return null;
  };

  const imageSource = getImageSource();
  const backgroundColor = getBackgroundColor();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      className={`w-[89px] justify-center items-center gap-2 ${
        otherStyles || ""
      }`}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          style={{ width: 32, height: 32 }}
          resizeMode="contain"
        />
      ) : (
        <View
          className="w-[32px] h-[32px] rounded-full justify-center items-center"
          style={{ backgroundColor }}
        >
          <Text className="text-white text-[12px] font-bold">
            {getInitials(category?.title)}
          </Text>
        </View>
      )}
      <TextHeader
        content={category?.title || "All Feeds"}
        customLineHeight={14}
        textStyles={`text-[14px] text-center ${
          category?.isActive ? "text-[#000E3A] font-bold" : "text-[#ADADAD]"
        }`}
      />
    </TouchableOpacity>
  );
};

export default FeedCategoriesCard;
