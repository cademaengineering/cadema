import DoubleMark from "@/assets/icons/double-mark.svg";
import EventIg from "@/assets/icons/event-ig.svg";
import EventMessage from "@/assets/icons/event-message.svg";
import EventPhone from "@/assets/icons/event-phone.svg";
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
          <ArrowTitlebar title="Party Details" />
        </View>
        <ScrollView className="pb-10">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1764074531/eveRectangle_580_1_ab0jrn.png",
            }}
            className="w-full h-[255px]"
          />
          <View className="px-6 -mt-6 gap-5">
            <View className="bg-white rounded-[12px] p-5">
              <View className="border-b border-[#F2F2F2] pb-5">
                <View className="flex-row justify-between items-center pb-2">
                  <TextHeader
                    content={`Campus Pool Party`}
                    textStyles={`text-[14px]`}
                    customLineHeight={20}
                  />
                </View>
                <TextContainer
                  content={`9:00 pm | Nov 06`}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
                <TextContainer
                  content={`Amber’s pool, Kansas University`}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
              </View>
              <View className="py-5">
                <TextContainer
                  content={`Get ready for the most electrifying night of the semester! Campus pool party brings you the ultimate dance experience with world-class DJs, stunning light shows, and an atmosphere that will keep you moving all night long. Dress in your brightest neon colors and prepare for an unforgettable night of music and dancing.`}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
              </View>
            </View>
            <View className="bg-white rounded-[12px] p-5">
              <View className="pb-5">
                <View className="flex-row justify-between items-center pb-2">
                  <TextHeader
                    content={`Ticket`}
                    textStyles={`text-[14px]`}
                    customLineHeight={20}
                  />
                </View>
                <View className="gap-1">
                  <View className="flex-row justify-start items-center gap-1">
                    <DoubleMark />
                    <TextContainer
                      content={`VIP | $50`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                  <View className="flex-row justify-start items-center gap-1">
                    <DoubleMark />
                    <TextContainer
                      content={`Regular | $20`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View className="bg-white rounded-[12px] p-5">
              <View className="pb-5">
                <View className="flex-row justify-between items-center pb-2">
                  <TextHeader
                    content={`Music`}
                    textStyles={`text-[14px]`}
                    customLineHeight={20}
                  />
                </View>
                <View className="gap-1">
                  <View className="flex-row justify-start items-center gap-1">
                    <DoubleMark />
                    <TextContainer
                      content={`DJ lighthouse`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                  <View className="flex-row justify-start items-center gap-1">
                    <DoubleMark />
                    <TextContainer
                      content={`DJ Oreo`}
                      textStyles={`text-[#030303] text-[12px]`}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View className="bg-white rounded-[12px] p-5">
              <View className="pb-5">
                <View className="flex-row justify-between items-center pb-2">
                  <TextHeader
                    content={`Contact Host`}
                    textStyles={`text-[14px]`}
                    customLineHeight={20}
                  />
                </View>
                <View className="gap-2">
                  <View className="flex-row justify-start items-center gap-2">
                    <EventMessage />
                    <View>
                      <TextContainer
                        content={`Email`}
                        textStyles={`text-[#030303] text-[12px]`}
                      />
                      <TextContainer
                        content={`Sambabara@gmail.com`}
                        textStyles={`text-[#ADADAD] text-[10px]`}
                      />
                    </View>
                  </View>
                  <View className="flex-row justify-start items-center gap-2">
                    <EventPhone />
                    <View>
                      <TextContainer
                        content={`Phone`}
                        textStyles={`text-[#030303] text-[12px]`}
                      />
                      <TextContainer
                        content={`+123-456-7890`}
                        textStyles={`text-[#ADADAD] text-[10px]`}
                      />
                    </View>
                  </View>
                  <View className="flex-row justify-start items-center gap-2">
                    <EventIg />
                    <View>
                      <TextContainer
                        content={`Instagram`}
                        textStyles={`text-[#030303] text-[12px]`}
                      />
                      <TextContainer
                        content={`@sam_parties`}
                        textStyles={`text-[#ADADAD] text-[10px]`}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Index;
