import AppButton from "@/components/Buttons/AppButton";
import TextContainer from "@/components/Reusables/TextContainer";
import TextInter from "@/components/Reusables/TextInter";
import BackButton from "@/components/Reusables/WhiteArrowBar";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardAvoidingView, Platform, View } from "react-native";

const Summary = () => {
  const router = useRouter();
  const gotoQuiz = () => {
    router.replace(`/(learning)/quizzes`);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#000E3A]"
    >
      <View className="h-full p-6">
        <View className="pt-10 mb-5">
          <BackButton title={`Quiz summary`} />
        </View>
        <View className="gap-2">
          <View className="bg-white rounded-[12px] p-4">
            <TextContainer
              content={`Total questions`}
              textStyles={`text-[#414D58] text-[14px]`}
            />
            <TextInter
              content={`6`}
              textStyles={`text-[#000E3A] text-[24px]`}
              customLineHeight={30}
            />
          </View>
          <View className="bg-white rounded-[12px] p-4">
            <TextContainer
              content={`Correct answers`}
              textStyles={`text-[#414D58] text-[14px]`}
            />
            <TextInter
              content={`3`}
              textStyles={`text-[#16A34A] text-[24px]`}
              customLineHeight={30}
            />
          </View>
          <View className="bg-white rounded-[12px] p-4">
            <TextContainer
              content={`Inorrect answers`}
              textStyles={`text-[#414D58] text-[14px]`}
            />
            <TextInter
              content={`2`}
              textStyles={`text-[#D00000] text-[24px]`}
              customLineHeight={30}
            />
          </View>
          <View className="bg-white rounded-[12px] p-4">
            <TextContainer
              content={`Time spent`}
              textStyles={`text-[#414D58] text-[14px]`}
            />
            <TextInter
              content={`03:55`}
              textStyles={`text-[#000E3A] text-[24px]`}
              customLineHeight={30}
            />
          </View>
        </View>
        <View className="pt-10">
          <AppButton
            handlePress={gotoQuiz}
            btnLabel={`Back to Quiz`}
            moreStyles={`bg-[#13E0A0]`}
            viewStyles={`text-[#000E3A]`}
          />
        </View>
      </View>

      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
};

export default Summary;
