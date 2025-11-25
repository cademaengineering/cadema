import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import CourseContent from "@/components/Reusables/CourseContent";
import LearnCard from "@/components/Reusables/LearnCard";
import ProgressBar from "@/components/Reusables/ProgressBar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const handlePress = () => {
    router.push(`/courses/${id}/videoContent`);
  };
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
            <TouchableOpacity className="justify-center items-center border-b-2 border-[#13E0A0]">
              <TextHeader
                content="Text"
                textStyles="text-[#000E3A] text-[14px]"
                viewStyles="px-8 py-2"
                customLineHeight={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePress}
              className="justify-center items-center"
            >
              <TextHeader
                content="Video"
                textStyles="text-[#999999] text-[14px]"
                viewStyles="px-8 py-2"
                customLineHeight={20}
              />
            </TouchableOpacity>
          </View>
          <View>
            <CourseContent />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Index;
