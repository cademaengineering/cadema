import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import CancelModal from "@/assets/icons/Close.svg";
import AppButton from "@/components/Buttons/AppButton";
import QuizProgressBar from "@/components/Reusables/QuizProgressBar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import TextInter from "@/components/Reusables/TextInter";
import BackButton from "@/components/Reusables/WhiteArrowBar";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

const Index = () => {
  const router = useRouter();
  const id = useLocalSearchParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const totalQuestions = 10;

  const options = [
    { id: 1, text: "Deploying technical controls to safeguard personal data" },
    { id: 2, text: "Conducting a comprehensive privacy impact assessment" },
    { id: 3, text: "Appointing a Data Protection Officer" },
    { id: 4, text: "Establishing data breach notification procedures" },
  ];

  const gotoSummary = () => {
    if (currentQuestion === totalQuestions) {
      console.log("clicked");
      router.push(`/quiz/${id}/summary`);
    } else {
      handleNext();
    }
  };

  // Calculate visible question range
  const getVisibleQuestions = () => {
    const maxVisible = 3;
    let start = Math.max(1, currentQuestion - Math.floor(maxVisible / 2));
    let end = Math.min(totalQuestions, start + maxVisible - 1);

    // Adjust start if we're near the end
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handlePrevious = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }
  };

  const handleQuestionSelect = (questionNum) => {
    setCurrentQuestion(questionNum);
    setSelectedOption(null);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#000E3A]"
    >
      <View className="h-full p-6">
        <View className="pt-10 mb-5">
          <BackButton title={`Quiz`} />
        </View>
        <LinearGradient
          colors={["#13E0A0", "#0A7A57"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ flex: 1, padding: 20, borderRadius: 12, marginBottom: 40 }}
        >
          <QuizProgressBar
            currentQuestion={currentQuestion}
            totalQuestions={totalQuestions}
            initialTime={300}
            onTimeUp={() => {
              console.log("Time's up!");
            }}
          />
          <View className="mb-4">
            <TextHeader
              content={`Which of the following is the most appropriate first step when establishing a privacy program within an organization?`}
              textStyles={`text-white text-[14px]`}
              customLineHeight={22}
              viewStyles={`bg-[#27272A4D] px-6 py-4 mt-5 rounded-[12px]`}
            />
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                activeOpacity={1}
                onPress={() => setSelectedOption(option.id)}
                className="flex-row justify-between items-center px-6 py-5 bg-[#27272A4D] rounded-[12px] mb-3"
                style={{
                  borderWidth: selectedOption === option.id ? 3 : 0,
                  borderColor:
                    selectedOption === option.id ? "white" : "transparent",
                }}
              >
                <TextContainer
                  content={option.text}
                  textStyles={`text-white text-[14px]`}
                  viewStyles={`flex-1 mr-3`}
                />
                <View
                  className="w-6 h-6 rounded-full border-white justify-center items-center"
                  style={{ borderWidth: 1.5 }}
                >
                  {selectedOption === option.id && (
                    <View className="w-4 h-4 rounded-full bg-white" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View className="flex-row justify-between items-center my-2">
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setShowAnswerModal(true)}
            >
              <TextHeader
                content={`See answer`}
                customLineHeight={20}
                textStyles={`text-white text-[16px] underline`}
              />
            </TouchableOpacity>
            <View>
              <AppButton
                btnLabel={
                  currentQuestion === totalQuestions ? "Submit" : "Next"
                }
                moreStyles={`${
                  currentQuestion === totalQuestions
                    ? "bg-white"
                    : "bg-transparent border border-white"
                } px-6 py-2`}
                textStyles={`${
                  currentQuestion === totalQuestions
                    ? "text-[#000E3A]"
                    : "text-white"
                }`}
                handlePress={gotoSummary}
              />
            </View>
          </View>
          <View
            className="flex-row justify-between items-center p-3 my-1 rounded-[12px]"
            style={{
              backgroundColor: "rgba(253, 254, 254, 0.12)",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <TouchableOpacity
              onPress={handlePrevious}
              activeOpacity={1}
              disabled={currentQuestion === 1}
              className="justify-center items-center bg-[#ABABAB24] rounded-[6.6px] p-3"
              style={{
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
                opacity: currentQuestion === 1 ? 0.5 : 1,
              }}
            >
              <ArrowLeft width={20} height={20} />
            </TouchableOpacity>
            <View className="flex-row justify-center items-center gap-2">
              {getVisibleQuestions().map((questionNum) => (
                <TouchableOpacity
                  key={questionNum}
                  activeOpacity={1}
                  onPress={() => handleQuestionSelect(questionNum)}
                  className={`py-3 px-5 justify-center items-center rounded-[8px] ${
                    currentQuestion === questionNum
                      ? "bg-white"
                      : "bg-transparent"
                  }`}
                >
                  <TextInter
                    customLineHeight={20}
                    textStyles={`${
                      currentQuestion === questionNum
                        ? "text-[#000E3A]"
                        : "text-white"
                    }`}
                    content={`${questionNum}`}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              onPress={handleNext}
              activeOpacity={1}
              disabled={currentQuestion === totalQuestions}
              className="justify-center items-center bg-[#ABABAB24] rounded-[6.6px] p-3"
              style={{
                shadowColor: "#000000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 4,
                opacity: currentQuestion === totalQuestions ? 0.5 : 1,
              }}
            >
              <ArrowRight width={20} height={20} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>

      <Modal
        visible={showAnswerModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAnswerModal(false)}
      >
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity
            className="absolute inset-0"
            activeOpacity={1}
            onPress={() => setShowAnswerModal(false)}
          >
            <BlurView
              intensity={80}
              tint="dark"
              style={{ flex: 1 }}
              className="bg-white"
            />
          </TouchableOpacity>
          <View className="bg-white rounded-[16px] p-6 mx-6 max-w-md">
            <View className="flex-row justify-end">
              <TouchableOpacity onPress={() => setShowAnswerModal(false)}>
                <CancelModal width={40} height={40} />
              </TouchableOpacity>
            </View>
            <TextHeader
              content="Correct Answer"
              customLineHeight={20}
              textStyles="text-[#13E0A0] text-[20px] mb-4"
            />
            <TextContainer
              content="Explanation: Establishing leadership and accountability is a foundational step. Assigning responsibility, such as appointing a DPO, ensures oversight and program direction."
              textStyles="text-[#030303] text-[14px] mb-4"
            />
          </View>
        </View>
      </Modal>

      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
};

export default Index;
