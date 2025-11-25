import AppButton from "@/components/Buttons/AppButton";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const interests = ["Reading", "Hiking", "Photography", "Movies", "Cooking"];

  const interestColors = [
    { text: "text-[#16A34A]", bg: "bg-[#16A34A14]" },
    { text: "text-[#0088FF]", bg: "bg-[#0088FF14]" },
    { text: "text-[#CB30E0]", bg: "bg-[#CB30E014]" },
    { text: "text-[#E0E002]", bg: "bg-[#E0E00214]" },
    { text: "text-[#13E0A0]", bg: "bg-[#13E0A014]" },
  ];

  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Student Profile" />
        </View>
        <ScrollView className="">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1764068183/Rectangle_580_slhzpk.png",
            }}
            className="w-full h-[255px]"
          />
          <View className="px-6 -mt-6 gap-5">
            <View className="bg-white rounded-[12px] p-5">
              <View className="border-b border-[#F2F2F2] pb-5">
                <View className="flex-row justify-between items-center pb-2">
                  <TextHeader
                    content={`Emma Rodriguez`}
                    textStyles={`text-[14px]`}
                    customLineHeight={20}
                  />
                  <TextContainer
                    content={`$200/month`}
                    textStyles={`text-[#13E0A0] text-[14px]`}
                  />
                </View>
                <TextContainer
                  content={`Business Administration`}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
                <TextContainer
                  content={`2nd year`}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
                <TextContainer
                  content={`Utah Business School`}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
              </View>
              <View className="py-5">
                <TextContainer
                  content={`Looking for a clean, studious roommate who enjoys quiet evenings and weekend adventures. I'm a computer science major who loves coding, reading, and exploring new hiking trails. I believe in maintaining a balanced lifestyle between academics and personal interests.`}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
              </View>
              <View>
                <TextHeader
                  content="Interests"
                  textStyles="text-[14px] text-[#030303] mb-3"
                />
                <View className="flex-row flex-wrap gap-2">
                  {interests.map((interest, index) => {
                    return (
                      <TextContainer
                        key={index}
                        content={interest}
                        textStyles={`text-[#16A34A] text-[10px]`}
                        viewStyles={`bg-[#16A34A14] px-3 py-2 rounded-full`}
                      />
                    );
                  })}
                </View>
              </View>
            </View>
            <View className="bg-white rounded-[12px] p-5">
              <View className="pb-5">
                <View className="flex-row justify-between items-center pb-2">
                  <TextHeader
                    content={`Living preferences`}
                    textStyles={`text-[14px]`}
                    customLineHeight={20}
                  />
                </View>
                <View className="gap-1 mb-16">
                  <View className="flex-row justify-between items-center">
                    <TextContainer
                      content={`Cleanliness`}
                      textStyles={`text-[#ADADAD] text-[12px]`}
                    />
                    <TextContainer
                      content={`Very clean`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                  <View className="flex-row justify-between items-center">
                    <TextContainer
                      content={`Noise`}
                      textStyles={`text-[#ADADAD] text-[12px]`}
                    />
                    <TextContainer
                      content={`Quiet environment`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                  <View className="flex-row justify-between items-center">
                    <TextContainer
                      content={`Guest`}
                      textStyles={`text-[#ADADAD] text-[12px]`}
                    />
                    <TextContainer
                      content={`Occasionally`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                  <View className="flex-row justify-between items-center">
                    <TextContainer
                      content={`Smoking / Drinking`}
                      textStyles={`text-[#ADADAD] text-[12px]`}
                    />
                    <TextContainer
                      content={`Maybe`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                  <View className="flex-row justify-between items-center">
                    <TextContainer
                      content={`Pets`}
                      textStyles={`text-[#ADADAD] text-[12px]`}
                    />
                    <TextContainer
                      content={`Pets friendly`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View className="px-6 pt-4 pb-8">
          <AppButton btnLabel={`Contact`} moreStyles="bg-[#13E0A0]" />
        </View>
      </View>
    </View>
  );
};

export default Index;
