import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const CategoryCard = ({ community }) => {
  const router = useRouter();
  const Icon = community.Icon;

  const handlePress = () => {
    router.push({
      pathname: "/communities/addCommunity",
      params: { category: community.name },
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
      <View className="flex-row justify-between items-center p-5 bg-white border border-[#F2F2F2] rounded-[12px]">
        <View className=" gap-4">
          {Icon ? (
            <Icon width={32} height={32} />
          ) : (
            <Image
              source={{
                uri: community.imageUrl,
              }}
              style={{ width: 32, height: 32, borderRadius: 16 }}
            />
          )}

          <View>
            <TextHeader
              content={community.name}
              textStyles="text-[#030303] text-[14px] "
              viewStyles={`w-[128px]`}
              customLineHeight="20"
              numberOfLines={2}
            />
            <TextContainer
              content={`${community.members.toLocaleString()} members`}
              textStyles="text-[#ADADAD] text-[12px]"
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
