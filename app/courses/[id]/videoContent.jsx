import AppButton from "@/components/Buttons/AppButton";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";

import LearnCard from "@/components/Reusables/LearnCard";
import ProgressBar from "@/components/Reusables/ProgressBar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import VideoCard from "@/components/Reusables/VideoCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";

const VideoContent = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const handlePress = () => {
    router.push(`/courses/${id}/`);
  };

  const videoData = [
    { id: "1", title: "Overview", duration: "12min", played: true },
    { id: "2", title: "Introduction", duration: "15min", played: true },
    { id: "3", title: "Getting Started", duration: "20min", played: false },
    { id: "4", title: "Advanced Topics", duration: "25min", played: false },
    { id: "5", title: "Functions", duration: "20min", played: false },
    { id: "6", title: "Conclusion", duration: "25min", played: false },
  ];

  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Human Resources" />
        </View>
        <ScrollView className="flex-1 bg-[#F9FAFB] pt-6 py-4 px-6">
          <LearnCard learn />
          <View className="flex-row justify-between items-center">
            <TextHeader
              content="Course progress"
              textStyles="text-[14px] text-[#030303]"
            />
            <TextContainer
              content="38%"
              textStyles="text-[#16A34A] text-[14px]"
            />
          </View>
          <ProgressBar progress={0.38} />
          <TextContainer
            content={`${2} of ${5} completed`}
            textStyles="text-[#999999] text-[12px]"
            viewStyles="mt-3"
          />
          <View className="flex-row justify-start items-center pt-2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handlePress}
              className="justify-center items-center"
            >
              <TextHeader
                content="Text"
                textStyles="text-[#000E3A] text-[14px]"
                viewStyles="px-8 py-2"
                customLineHeight={20}
              />
            </TouchableOpacity>
            <TouchableOpacity className="justify-center items-center  border-b-2 border-[#13E0A0]">
              <TextHeader
                content="Video"
                textStyles="text-[#999999] text-[14px]"
                viewStyles="px-8 py-2"
                customLineHeight={20}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={videoData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <VideoCard
                played={item.played}
                title={item.title}
                duration={item.duration}
              />
            )}
            ItemSeparatorComponent={() => <View className="h-3" />}
            scrollEnabled={false}
            contentContainerStyle={{ paddingVertical: 16 }}
          />
        </ScrollView>
        <View className="px-6 bg-[#F9FAFB] pb-16 pt-4">
          <AppButton
            btnLabel={`Resume learning`}
            moreStyles={`bg-[#13E0A0]`}
            textStyles={`text-[#000E3A]`}
          />
        </View>
      </View>
    </View>
  );
};

export default VideoContent;
