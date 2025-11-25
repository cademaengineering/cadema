import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const MentorCard = ({ mentor }) => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const goToMentor = () => {
    router.push(`/msa/${id}`);
  };
  return (
    <TouchableOpacity
      onPress={goToMentor}
      className="bg-white p-4 rounded-[12px] flex-1"
    >
      <View>
        <Image
          source={{
            uri:
              mentor?.image ||
              "https://res.cloudinary.com/dtxr92piy/image/upload/v1762180958/Rectangle_578_gqxglo.png",
          }}
          style={{ width: "100%", height: 128 }}
          className="rounded-[8px]"
          resizeMode="cover"
        />
        <View className="gap-1 pt-3">
          <TextHeader
            content={mentor?.name || "Professor Chen"}
            textStyles="text-[14px] text-[#030303]"
            customLineHeight={20}
          />
          <TextContainer
            content={mentor?.title || "Financial Analyst, Domarian Data"}
            textStyles={`text-[12px] text-[#ADADAD]`}
            viewStyles={``}
          />
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center gap-1">
              <View className="w-[10px] h-[10px] rounded-full bg-[#CB30E0]"></View>
              <TextContainer
                content={mentor?.role || `Sponsor`}
                textStyles={`text-[12px] text-[#CB30E0]`}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MentorCard;
