import FulltimeIcon from "@/assets/icons/fulltime-icon.svg";
import GraduationIcon from "@/assets/icons/graduation-icon.svg";
import LocationIconTwo from "@/assets/icons/location-icon-two.svg";
import AppButton from "@/components/Buttons/AppButton";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const gotoApply = () => {
    router.push(`/msa/${id}/apply`);
  };
  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Profile" />
        </View>
        <ScrollView className="px-6">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1763983295/profile-pix_hq8u8p.png",
            }}
            width={60}
            height={60}
            className="rounded-full mb-2"
          />
          <TextHeader
            content={`Adam Adeyeye`}
            textStyles={`text-[#030303] text-[14px]`}
            customLineHeight={20}
          />
          <TextContainer
            content={`Senior Advisor at Delloite`}
            textStyles={`text-[#999999] text-[12px]`}
          />
          <TextContainer
            content={`PHD, MSc, ICAN, in Accounting and Finance`}
            textStyles={`text-[#999999] text-[12px]`}
          />
          <View className="pt-5">
            <TextContainer
              content={`About`}
              textStyles={`text-[#030303] text-[14px]`}
            />
            <TextContainer
              content={`Renowned financial advisor in the Account and Finance Industry. Expert in guiding companies, SMEs, and Individuals including students through navigating the financial word and making a tangible impact`}
              textStyles={`text-[#999999] text-[12px]`}
              viewStyles={`border-t border-[#F2F2F2] my-3 pt-3`}
            />
          </View>
          <View className="bg-white px-5 py-2 rounded-[12px] gap-1">
            <TextHeader
              content={`Professional Advisor`}
              textStyles={`text-[#16A34A] text-[14px]`}
            />
            <View className="flex-row justify-start items-center gap-2">
              <LocationIconTwo width={20} height={20} />
              <TextContainer
                content={`New York, USA`}
                textStyles={`text-[#030303] text-[12px]`}
              />
            </View>
            <View className="flex-row justify-start items-center gap-2">
              <FulltimeIcon width={20} height={20} />
              <TextContainer
                content={`Available for Consultation`}
                textStyles={`text-[#030303] text-[12px]`}
              />
            </View>
            <View className="flex-row justify-start items-center gap-2">
              <GraduationIcon width={20} height={20} />
              <TextContainer
                content={`PhD, MSc, ICAN`}
                textStyles={`text-[#030303] text-[12px]`}
              />
            </View>
            <View className="pt-4 mb-3">
              <AppButton
                handlePress={gotoApply}
                btnLabel={`Send connection request`}
                moreStyles={`bg-[#13E0A0]`}
              />
            </View>
          </View>
        </ScrollView>
        {/* <View className="px-6 pt-4 pb-8">
          <AppButton
            handlePress={gotoApply}
            btnLabel={`Apply now`}
            moreStyles={`bg-[#13E0A0]`}
          />
        </View> */}
      </View>
    </View>
  );
};

export default Index;
