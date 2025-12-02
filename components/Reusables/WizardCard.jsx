import CommentsIcon from "@/assets/icons/wizard-comments.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const WizardCard = ({ scholarship }) => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const handlePress = () => {
    router.push(`/wizard/${id}`);
  };

  const tags = ["Programming", "AI", "Software Development"];

  return (
    <TouchableOpacity className="rounded-[12px] bg-white" onPress={handlePress}>
      <Image
        source={{ uri: scholarship.image }}
        style={{ width: "100%", height: 160 }}
        resizeMode="cover"
        className="rounded-t-[12px]"
      />
      <View className="p-5">
        <View className="gap-2">
          <View className="flex-row justify-between items-center">
            <TextHeader
              content={scholarship.title}
              textStyles={`text-[16px] text-[#000000]`}
              customLineHeight={20}
            />
          </View>
          <TextHeader
            content={scholarship.organization}
            textStyles={`text-[14px] text-[#999999]`}
            customLineHeight={20}
          />
          <TextContainer
            content={scholarship.description}
            textStyles={`text-[12px] text-[#ADADAD]`}
          />
          <View className="flex-row flex-wrap gap-2 my-2">
            {tags.map((tag, index) => (
              <TextContainer
                key={index}
                content={tag}
                textStyles={`text-[10px] text-[#999999]`}
                viewStyles={`bg-[#EBEBEB] px-4 py-1 rounded-full`}
              />
            ))}
          </View>

          <View className="flex-row justify-start items-center gap-2">
            <CommentsIcon width={16} height={16} />
            <TextContainer
              content={`256 Reviews`}
              textStyles={`text-[10px] text-[#ADADAD]`}
              customLineHeight={20}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WizardCard;
