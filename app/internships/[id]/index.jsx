import DoubleMark from "@/assets/icons/double-mark.svg";
import FulltimeIcon from "@/assets/icons/fulltime-icon.svg";
import GiftIcon from "@/assets/icons/gift-icon.svg";
import GraduationIcon from "@/assets/icons/graduation-icon.svg";
import LocationIconTwo from "@/assets/icons/location-icon-two.svg";
import AppButton from "@/components/Buttons/AppButton";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const gotoApply = () => {
    router.push(`/internships/${id}/apply`);
  };
  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="" />
        </View>
        <ScrollView className="px-6">
          <View className="bg-[#13E0A01F] rounded-[12px] p-5 mb-3">
            <View className="">
              <View className="flex-row justify-between items-center">
                <TextHeader
                  content={`Software Engineering Intern`}
                  textStyles={`text-[16px]`}
                  customLineHeight={20}
                />
                <View className="">
                  <View className="bg-[#13E0A080] px-5 py-2 rounded-full">
                    <TextContainer
                      content={`Remote`}
                      textStyles={`text-[#000E3A] text-[10px]`}
                    />
                  </View>
                </View>
              </View>
              <TextContainer
                content={`TechCorp Solutions`}
                textStyles={`text-[#000E3A] text-[14px]`}
                viewStyles={``}
              />
            </View>
          </View>
          <View className="bg-white p-5 gap-2 mb-3 rounded-[12px]">
            <TextContainer
              content={`$700 Monthly Stipend`}
              textStyles={`text-[#16A34A] text-[14px] font-semibold`}
            />
            <View className="flex-row justify-start items-center gap-2">
              <LocationIconTwo width={20} height={20} />
              <TextContainer
                content={`San Francisco, CA`}
                textStyles={`text-[#030303] text-[12px]`}
              />
            </View>
            <View className="flex-row justify-start items-center gap-2">
              <FulltimeIcon width={20} height={20} />
              <TextContainer
                content={`6 months | Full-time`}
                textStyles={`text-[#030303] text-[12px]`}
              />
            </View>
            <View className="flex-row justify-start items-center gap-2">
              <GraduationIcon width={20} height={20} />
              <TextContainer
                content={`Undergraduate`}
                textStyles={`text-[#030303] text-[12px]`}
              />
            </View>
          </View>
          <View className="bg-white p-5 mb-3 rounded-[12px]">
            <TextHeader
              content={`About this Internship`}
              textStyles={`text-[#030303] text-[14px]`}
              customLineHeight={20}
            />
            <TextContainer
              content={`Join our dynamic engineering team and work on cutting-edge web applications. You'll collaborate with senior developers, participate in code reviews, and contribute to real-world projects that impact thousands of users.`}
              textStyles={`text-[#999999] text-[12px]`}
            />
          </View>
          <View className="mb-3">
            <TextHeader
              content={`Skills Required`}
              textStyles={`text-[#030303] text-[14px]`}
            />
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
          </View>
          <View className="bg-white p-5 mb-3 gap-2">
            <TextHeader
              content={`Requirements / Application process`}
              textStyles={`text-[#030303] text-[14px]`}
              customLineHeight={20}
            />
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`5 minutes video recording, introducing yourself and why you are a great fit for this role. Clear and neat atmosphere.`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Currently pursuing Computer Science or related degree`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Proficiency in JavaScript, React, or Python`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Strong problem-solving skills`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Excellent communication abilities`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
          </View>
          <View className="bg-white p-5 mb-3 gap-2">
            <TextHeader
              content={`Responsibilities`}
              textStyles={`text-[#030303] text-[14px]`}
              customLineHeight={20}
            />
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Maintain and Develop web applications.`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Currently pursuing Computer Science or related degree`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Participate in daily stand-up meetings.`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Write clean, maintainable codes.`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <DoubleMark width={20} height={20} />
              <TextContainer
                content={`Collaborate with cross-functional teams.`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
          </View>
          <View className="bg-white p-5 mb-3 gap-2">
            <TextHeader
              content={`Benefits`}
              textStyles={`text-[#030303] text-[14px]`}
              customLineHeight={20}
            />
            <View className="flex-row justify-start items-start gap-2">
              <GiftIcon width={16} height={16} />
              <TextContainer
                content={`Mentorship from senior engineers`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <GiftIcon width={16} height={16} />
              <TextContainer
                content={`Flexible working hours`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <GiftIcon width={16} height={16} />
              <TextContainer
                content={`Professional development opportunities`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <GiftIcon width={16} height={16} />
              <TextContainer
                content={`Networking events`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
            <View className="flex-row justify-start items-start gap-2">
              <GiftIcon width={16} height={16} />
              <TextContainer
                content={`Potential for full-time offer`}
                textStyles={`text-[#030303] text-[12px] pr-4`}
              />
            </View>
          </View>
        </ScrollView>
        <View className="px-6 pt-4 pb-8">
          <AppButton
            handlePress={gotoApply}
            btnLabel={`Apply now`}
            moreStyles={`bg-[#13E0A0]`}
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
