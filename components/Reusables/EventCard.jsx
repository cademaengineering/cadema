import LocationIcon from "@/assets/icons/location-outline.svg";
import Timer from "@/assets/icons/stop-watch.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";
import TextInter from "./TextInter";

const EventCard = ({ event }) => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const handlePress = () => {
    router.push(`/events/${id}`);
  };
  return (
    <TouchableOpacity className="rounded-[12px] bg-white" onPress={handlePress}>
      <Image
        source={{ uri: event.image }}
        style={{ width: "100%", height: 160 }}
        resizeMode="cover"
        className="rounded-t-[12px]"
      />
      <View className="p-5">
        <View className="gap-2">
          <View className="flex-row justify-between items-center">
            <TextHeader
              content={event.title}
              textStyles={`text-[16px] text-[#000000]`}
              customLineHeight={20}
            />
            <TextInter
              content={`Fri, Nov 5`}
              textStyles={`text-[10px] text-[#ADADAD]`}
              customLineHeight={20}
            />
          </View>
          <View className="flex-row justify-start items-cenenter">
            <View className="flex-row justify-start items-center gap-2 mr-4">
              <Timer />
              <TextContainer
                content={`9:00am`}
                textStyles={`text-[12px] text-[#ADADAD]`}
              />
            </View>
            <View className="flex-row justify-start items-center gap-2 mr-4">
              <LocationIcon />
              <TextContainer
                content={`Main Auditorium`}
                textStyles={`text-[12px] text-[#ADADAD]`}
              />
            </View>
          </View>
          <TextContainer
            content={`Computer Science Society`}
            textStyles={`text-[10px] text-[#ADADAD]`}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default EventCard;
