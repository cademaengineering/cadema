import LocationIcon from "@/assets/icons/location-outline.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const BusinessCard = ({ business }) => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const handlePress = () => {
    router.push(`/business/${id}`);
  };
  return (
    <TouchableOpacity
      className="rounded-[12px] bg-white flex-row justify-start items-start p-2"
      onPress={handlePress}
    >
      <Image
        source={{ uri: business.image }}
        width={100}
        height={100}
        resizeMode="cover"
        className="rounded-[12px]"
      />
      <View className="p-5">
        <View className="gap-1">
          <View className="flex-row justify-between items-center">
            <TextHeader
              content={business.title}
              textStyles={`text-[14px] text-[#000000]`}
              customLineHeight={20}
            />
          </View>
          <TextContainer
            content={`Fri, Nov 18 | 6:30 pm`}
            textStyles={`text-[10px] text-[#ADADAD]`}
          />
          <View className="flex-row justify-start items-cenenter">
            <View className="flex-row justify-start items-center gap-2 mr-4">
              <LocationIcon />
              <TextContainer
                content={`Main Auditorium`}
                textStyles={`text-[12px] text-[#ADADAD]`}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessCard;
