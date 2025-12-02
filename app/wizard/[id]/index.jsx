import DoubleMark from "@/assets/icons/double-mark.svg";
import Star from "@/assets/icons/startwo.svg";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("Overview");

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
          <ArrowTitlebar title="" />
        </View>
        <ScrollView className="">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dtxr92piy/image/upload/v1764587147/wizRectangle_580_d5tzcv.png",
            }}
            className="w-full h-[255px]"
          />
          <View className="px-6 -mt-6 gap-5">
            <View className="bg-white rounded-[12px] p-5">
              <View className="">
                <View className="flex-row justify-between items-center pb-2">
                  <View className="justify-center items-center">
                    <View className="flex-row justify-center items-center gap-1">
                      <Star width={14} height={14} />
                      <TextContainer
                        content={`4.2`}
                        textStyles={`text-[14px] text-[#030303]`}
                      />
                    </View>
                    <TextContainer
                      content={`Ratings`}
                      textStyles={`text-[#999999] text-[12px]`}
                    />
                  </View>
                  <View className="justify-center items-center">
                    <View className="flex-row justify-center items-center gap-1">
                      <TextContainer
                        content={`256`}
                        textStyles={`text-[14px] text-[#030303]`}
                      />
                    </View>
                    <TextContainer
                      content={`Reviews`}
                      textStyles={`text-[#999999] text-[12px]`}
                    />
                  </View>
                  <View className="justify-center items-center">
                    <View className="flex-row justify-center items-center gap-1">
                      <TextContainer
                        content={`$30,790/year`}
                        textStyles={`text-[14px] text-[#030303]`}
                      />
                    </View>
                    <TextContainer
                      content={`Tuition`}
                      textStyles={`text-[#999999] text-[12px]`}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View className="bg-[#F2F2F2] rounded-[12px] p-5 flex-row justify-around items-center">
              <TouchableOpacity
                activeOpacity={1}
                className={`px-4 rounded-[8px] ${
                  activeTab === "Overview" ? "bg-[#13E0A0]" : ""
                }`}
                onPress={() => setActiveTab("Overview")}
              >
                <TextHeader
                  customLineHeight={0}
                  content={`Overview`}
                  textStyles={`${
                    activeTab === "Overview"
                      ? "text-[#000E3A]"
                      : "text-[#999999]"
                  } text-[14px]`}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                className={`px-4 rounded-[8px] ${
                  activeTab === "Reviews" ? "bg-[#13E0A0]" : ""
                }`}
                onPress={() => setActiveTab("Reviews")}
              >
                <TextHeader
                  customLineHeight={0}
                  content={`Reviews`}
                  textStyles={`${
                    activeTab === "Reviews"
                      ? "text-[#000E3A]"
                      : "text-[#999999]"
                  } text-[14px]`}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                className={`px-4 rounded-[8px] ${
                  activeTab === "Curriculum" ? "bg-[#13E0A0]" : ""
                }`}
                onPress={() => setActiveTab("Curriculum")}
              >
                <TextHeader
                  customLineHeight={0}
                  content={`Curriculum`}
                  textStyles={`${
                    activeTab === "Curriculum"
                      ? "text-[#000E3A]"
                      : "text-[#999999]"
                  } text-[14px]`}
                />
              </TouchableOpacity>
            </View>
            <View className="gap-4">
              {activeTab === "Overview" && (
                <>
                  <View className="bg-white rounded-[12px] p-5">
                    <TextHeader
                      content={`About This Program`}
                      textStyles={`text-[#030303] text-[14px]`}
                      customLineHeight={20}
                    />
                    <TextContainer
                      content={`Comprehensive program covering algorithms, software engineering, and AI with hands-on projects and industry partnerships.`}
                      textStyles={`text-[#999999] text-[12px]`}
                    />
                  </View>
                  <View className="bg-white rounded-[12px] p-5">
                    <TextHeader
                      content={`Skills To Be Acquired`}
                      textStyles={`text-[#030303] text-[14px]`}
                      customLineHeight={20}
                    />
                    <View className="flex-row flex-wrap gap-2 pt-3">
                      {[
                        "Programming",
                        "AI",
                        "Software Development",
                        "Algorithms",
                        "Data Structures",
                      ].map((skill, index) => {
                        const colors =
                          interestColors[index % interestColors.length];
                        return (
                          <TextContainer
                            key={index}
                            content={skill}
                            textStyles={`${colors.text} text-[10px]`}
                            viewStyles={`${colors.bg} px-4 py-2 rounded-full`}
                          />
                        );
                      })}
                    </View>
                  </View>
                  <View className="bg-white rounded-[12px] p-5">
                    <View className="pb-5">
                      <View className="flex-row justify-between items-center pb-2">
                        <TextHeader
                          content={`Admission Requirements`}
                          textStyles={`text-[14px]`}
                          customLineHeight={20}
                        />
                      </View>
                      <View className="gap-1">
                        <View className="flex-row justify-start items-center gap-1">
                          <DoubleMark />
                          <TextContainer
                            content={`SAT: 1520+`}
                            textStyles={`text-[#030303] text-[12px]`}
                          />
                        </View>
                        <View className="flex-row justify-start items-center gap-1">
                          <DoubleMark />
                          <TextContainer
                            content={`GPA: 3.8+ `}
                            textStyles={`text-[#030303] text-[12px]`}
                          />
                        </View>
                        <View className="flex-row justify-start items-center gap-1">
                          <DoubleMark />
                          <TextContainer
                            content={`Strong Maths background`}
                            textStyles={`text-[#030303] text-[12px]`}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View className="bg-white rounded-[12px] p-5">
                    <TextHeader
                      content={`Career Opportunities`}
                      textStyles={`text-[#030303] text-[14px]`}
                      customLineHeight={20}
                    />
                    <View className="flex-row flex-wrap gap-2 pt-3">
                      {[
                        "Software engineering",
                        "AI",
                        "Data Scientist",
                        "Tech Entrepreneur",
                        "Product Engineering",
                      ].map((skill, index) => {
                        const colors =
                          interestColors[index % interestColors.length];
                        return (
                          <TextContainer
                            key={index}
                            content={skill}
                            textStyles={`${colors.text} text-[10px]`}
                            viewStyles={`${colors.bg} px-4 py-2 rounded-full`}
                          />
                        );
                      })}
                    </View>
                  </View>
                </>
              )}
              {activeTab === "Reviews" && (
                <View>
                  <View className="bg-white rounded-[12px] p-5">
                    <View className="flex-row justify-between items-c">
                      <TextHeader
                        content={`Student reviews`}
                        textStyles={`text-[14px] text-[#030303]`}
                        customLineHeight={20}
                      />
                      <View className="flex-row justify-start items-center">
                        <Star width={14} height={14} />
                        <TextContainer
                          content={`4.2(256)`}
                          customLineHeight={20}
                          textStyles={`text-[12px] text-[#030303]`}
                        />
                      </View>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <View className="bg-[#34C75914] p-5 justify-center items-center rounded-[12px] ">
                        <TextContainer
                          content={`94%`}
                          textStyles={`text-[#34C759] text-[16px]`}
                          customHeight={20}
                        />
                        <TextContainer
                          content={`94%`}
                          textStyles={`text-[#999999] text-[16px]`}
                          customHeight={20}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
              {activeTab === "Curriculum" && (
                <View className="bg-white rounded-[12px] p-5">
                  <View className="pb-5">
                    <View className="flex-row justify-between items-center pb-2">
                      <TextHeader
                        content={`Core Curriculum`}
                        textStyles={`text-[14px]`}
                        customLineHeight={20}
                      />
                    </View>
                    <View className="gap-1">
                      <View className="flex-row justify-start items-center gap-1">
                        <DoubleMark />
                        <TextContainer
                          content={`Introduction to Programming`}
                          textStyles={`text-[#030303] text-[12px]`}
                        />
                      </View>
                      <View className="flex-row justify-start items-center gap-1">
                        <DoubleMark />
                        <TextContainer
                          content={`Data Structures & Algorithms`}
                          textStyles={`text-[#030303] text-[12px]`}
                        />
                      </View>
                      <View className="flex-row justify-start items-center gap-1">
                        <DoubleMark />
                        <TextContainer
                          content={`Computer Systems`}
                          textStyles={`text-[#030303] text-[12px]`}
                        />
                      </View>
                      <View className="flex-row justify-start items-center gap-1">
                        <DoubleMark />
                        <TextContainer
                          content={`Introduction to Programming`}
                          textStyles={`text-[#030303] text-[12px]`}
                        />
                      </View>
                      <View className="flex-row justify-start items-center gap-1">
                        <DoubleMark />
                        <TextContainer
                          content={`Data Structures & Algorithms`}
                          textStyles={`text-[#030303] text-[12px]`}
                        />
                      </View>
                      <View className="flex-row justify-start items-center gap-1">
                        <DoubleMark />
                        <TextContainer
                          content={`Computer Systems`}
                          textStyles={`text-[#030303] text-[12px]`}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Index;
