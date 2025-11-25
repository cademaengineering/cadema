import LocationIcon from "@/assets/icons/location-outline.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const InternshipCard = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const gotoDetails = () => {
    router.push(`/internships/${id}`);
  };
  return (
    <TouchableOpacity
      onPress={gotoDetails}
      className="bg-white rounded-[12px] p-5"
    >
      <View className="">
        <View className="flex-row justify-between items-center">
          <TextHeader
            content={`Software Engineering Intern`}
            textStyles={`text-[14px]`}
            customLineHeight={20}
          />
          <View className="">
            <TouchableOpacity className="bg-[#13E0A01A] px-5 py-2 rounded-full">
              <TextContainer
                content={`Remote`}
                textStyles={`text-[#000E3A] text-[10px]`}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TextContainer
          content={`TechCorp Solutions`}
          textStyles={`text-[#000E3A] text-[12px]`}
          viewStyles={``}
        />
        <View className="flex-row justify-start items-center my-2">
          <LocationIcon width={16} height={16} />
          <TextContainer
            content={` San Francisco, CA`}
            textStyles={`text-[#999999] text-[10px]`}
          />
        </View>
        <View className="flex-row justify-start items-center gap-1">
          <TextContainer
            content={`JavaScript`}
            textStyles={`text-[#999999] text-[10px]`}
            viewStyles={`bg-[#F2F2F2] px-5 py-2 rounded-full`}
          />
          <TextContainer
            content={`Python`}
            textStyles={`text-[#999999] text-[10px]`}
            viewStyles={`bg-[#F2F2F2] px-5 py-2 rounded-full`}
          />
          <TextContainer
            content={`React`}
            textStyles={`text-[#999999] text-[10px]`}
            viewStyles={`bg-[#F2F2F2] px-5 py-2 rounded-full`}
          />
        </View>
        <TextHeader
          content={`Paid`}
          textStyles={`text-[#13E0A0] text-[14px] underline`}
          customLineHeight={20}
          viewStyles={`mt-2`}
        />
      </View>
    </TouchableOpacity>
  );
};

export default InternshipCard;
