import LocationIcon from "@/assets/icons/location-outline.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const RoomatesCard = ({ roommate, index }) => {
  const colorSchemes = [
    { bg: "bg-[#13E0A00F]", border: "border-[#13E0A01A]" },
    { bg: "bg-[#E0E0020F]", border: "border-[#E0E0021A]" },
    { bg: "bg-[#0088FF0F]", border: "border-[#0088FF1A]" },
    { bg: "bg-[#CB30E00F]", border: "border-[#CB30E01A]" },
  ];

  const router = useRouter();
  const { id } = useLocalSearchParams();
  const colorScheme = colorSchemes[index % 4];
  const gotoStudent = () => {
    router.push(`/roommates/${id}`);
  };

  return (
    <TouchableOpacity
      onPress={gotoStudent}
      className={`flex-row justify-between items-start p-4 ${colorScheme.bg} rounded-[12px] border ${colorScheme.border}`}
    >
      <View className="flex-row justify-start items-start gap-4">
        <Image
          source={{
            uri:
              roommate?.image ||
              "https://res.cloudinary.com/dtxr92piy/image/upload/v1763992522/roomates2_m1jwkn.png",
          }}
          style={{ width: 50, height: 50 }}
          className="rounded-full"
        />
        <View>
          <TextHeader
            content={roommate?.name || `Emma Rodriguez`}
            textStyles={`text-[14px]`}
            customLineHeight={20}
          />
          <TextContainer
            content={roommate?.major || `Business Administration`}
            textStyles={`text-[#A3A3A3] text-[12px]`}
          />
          <TextContainer
            content={roommate?.year || `2nd year`}
            textStyles={`text-[#A3A3A3] text-[12px]`}
          />
          <TextContainer
            content={roommate?.school || `Utah Business School`}
            textStyles={`text-[#A3A3A3] text-[12px]`}
          />
          <View className="flex-row justify-start items-center gap-2">
            <LocationIcon width={16} height={16} />
            <TextContainer
              content={roommate?.location || `Utah`}
              textStyles={`text-[#A3A3A3] text-[12px]`}
            />
          </View>
        </View>
      </View>
      <View>
        <TextHeader
          content={roommate?.roomType || `Private Room`}
          textStyles={`text-[#000E3A] text-[12px]`}
          viewStyles={`bg-[#13E0A033] px-3 py-2 rounded-full`}
          customLineHeight={15}
        />
      </View>
    </TouchableOpacity>
  );
};

export default RoomatesCard;
