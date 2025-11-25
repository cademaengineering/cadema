import GreenArrow from "@/assets/icons/green-arrow.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";
import TextInter from "./TextInter";

const NicheCard = ({ scholarship }) => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const handlePress = () => {
    router.push(`/niche/${id}`);
  };
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
            <TextInter
              content={scholarship.amount}
              textStyles={`text-[16px] text-[#13E0A0]`}
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
          <View className="flex-row justify-start items-center gap-2">
            <TextHeader
              content={`View details`}
              textStyles={`text-[14px] text-[#000E3A]`}
              customLineHeight={20}
            />
            <GreenArrow width={16} height={16} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NicheCard;
