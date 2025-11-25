import BookBrown from "@/assets/icons/book-brown.svg";
import BookOutline from "@/assets/icons/book-outline.svg";
import ClockBrown from "@/assets/icons/clock-brown.svg";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";
const QuizzCard = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const gotoQuiz = () => {
    router.push(`/quiz/${id}`);
  };
  return (
    <TouchableOpacity
      onPress={gotoQuiz}
      className="p-4 bg-white rounded-[12px]"
    >
      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-start items-center gap-2">
          <TouchableOpacity className="justify-center items-center bg-[#13E0A01A] w-[44px] h-[44px] rounded-full">
            <BookOutline width={22} height={22} />
          </TouchableOpacity>
          <View className="gap-1">
            <TextHeader
              content="Field Dynamics Mech"
              textStyles="text-[#000E3A] text-[14px]"
              customLineHeight={20}
            />
            <View className="flex-row justify-start items-center gap-3">
              <View className="flex-row justify-start items-center gap-2">
                <BookBrown width={15} height={15} />
                <TextContainer
                  content="15 questions"
                  textStyles="text-[12px] text-[#999999]"
                />
              </View>
              <View className="flex-row justify-start items-center gap-2">
                <ClockBrown width={15} height={15} />
                <TextContainer
                  content="20 min"
                  textStyles="text-[12px] text-[#999999]"
                />
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity className="justify-center items-center bg-[#13E0A0] rounded-full w-[85px] h-[30px]">
          <TextHeader
            content="Take quiz"
            textStyles="text-[14px] text-white"
            customLineHeight={20}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default QuizzCard;
