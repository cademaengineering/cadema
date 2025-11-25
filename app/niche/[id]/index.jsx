import BulbIcon from "@/assets/icons/bulb-icon.svg";
import CalendarIcon from "@/assets/icons/calendar-icon.svg";
import MoneyIcon from "@/assets/icons/money-icon.svg";
import AppButton from "@/components/Buttons/AppButton";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import TextInter from "@/components/Reusables/TextInter";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const gotoApply = () => {
    router.push(`/niche/${id}/apply`);
  };
  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="" />
        </View>
        <ScrollView className="px-6">
          <View className="rounded-[12px] bg-white">
            <Image
              source={{
                uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1762689224/scholar1_o5binl.png",
              }}
              style={{ width: "100%", height: 160 }}
              resizeMode="cover"
              className="rounded-t-[12px]"
            />
            <View className="p-5">
              <View className="gap-2">
                <View className="flex-row justify-between items-center">
                  <TextHeader
                    content={"Merit Excellence Scholarship"}
                    textStyles={`text-[16px] text-[#000000]`}
                    customLineHeight={20}
                  />
                  <TextInter
                    content={`$15,000`}
                    textStyles={`text-[16px] text-[#13E0A0]`}
                    customLineHeight={20}
                  />
                </View>
              </View>
            </View>
          </View>
          <View className="pt-6 pb-4">
            <TextHeader
              content={`Scholarship details`}
              textStyles={`text-[14px]`}
              customLineHeight={20}
              viewStyles={`border-b border-[#F2F2F2] pb-4 mb-4`}
            />
            <TextContainer
              content={`A crucial role in accelerating and helping students entrepreneurs grow their businesses and show their leadership and marketing skills in being the world next big innovators.`}
              textStyles={`text-[14px] text-[#999999]`}
              viewStyles={``}
            />
          </View>
          <View className="flex-row justify-between items-center">
            <View className="flex-row justify-start items-center gap-2 p-4 bg-[#F2F2F2] rounded-[12px] w-[48%]">
              <MoneyIcon width={24} height={24} />
              <View>
                <TextInter
                  content={`$15,000`}
                  textStyles={`text-[16px] text-[#16A34A]`}
                  customLineHeight={20}
                />
                <TextHeader
                  content={`Funding Amount`}
                  textStyles={`text-[14px] text-[#999999]`}
                  customLineHeight={20}
                />
              </View>
            </View>
            <View className="flex-row justify-start items-center gap-2 p-4 bg-[#F2F2F2] rounded-[12px] w-[48%]">
              <CalendarIcon width={24} height={24} />
              <View>
                <TextInter
                  content={`Jan 16, 2026`}
                  textStyles={`text-[16px] text-[#030303]`}
                  customLineHeight={20}
                />
                <TextHeader
                  content={`Deadline`}
                  textStyles={`text-[14px] text-[#999999]`}
                  customLineHeight={20}
                />
              </View>
            </View>
          </View>
          <View className="rounded-[12px] bg-[#13E0A014] p-4 mt-4">
            <TextHeader
              content={`Eligibility`}
              textStyles={`text-[#000E3A] text-[14px]`}
              customLineHeight={20}
            />
            <TextContainer
              content={`Undergraduate | Postgraduate`}
              textStyles={`text-[#000E3A] text-[12px]`}
              customLineHeight={20}
            />
          </View>
          <View className="bg-[#F7B13B0F] rounded-[12px] p-4 mt-4">
            <View className="flex-row justify-start items-center gap-2 ">
              <BulbIcon width={24} height={24} />
              <TextHeader
                content={`Application Requirements/Tips`}
                textStyles={`text-[14px] text-[#935F06]`}
              />
            </View>
            <TextContainer
              content={`Note that you will be required to upload a 5min video introducing yourself, a brief description of your business, what problem does it solves and why you should be considered for this grant.`}
              textStyles={`text-[12px] text-[#935F06]`}
            />
          </View>
        </ScrollView>
        <View className="px-6 pt-4 pb-8">
          <AppButton
            handlePress={gotoApply}
            btnLabel={`Apply for Grant`}
            moreStyles={`bg-[#13E0A0]`}
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
