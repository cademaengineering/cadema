import TimerClock from "@/assets/icons/timer-clock.svg";
import { useEffect, useState } from "react";
import { View } from "react-native";
import TextContainer from "./TextContainer";

const QuizProgressBar = ({
  currentQuestion = 1,
  totalQuestions = 10,
  initialTime = 240, // time in seconds (default 4 minutes)
  onTimeUp,
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const isLowTime = timeLeft <= 60; // red color when 1 minute or less
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <View>
      <View className="flex-row justify-between items-center mb-3">
        <TextContainer
          content={`Question ${currentQuestion} of ${totalQuestions}`}
          textStyles="text-white"
        />
        <View className="flex-row justify-start items-center gap-1">
          <TimerClock width={12} height={14} />
          <TextContainer
            content={formatTime(timeLeft)}
            textStyles={`${
              isLowTime ? "text-[#D00000]" : "text-[#D00000]"
            } text-[12px]`}
          />
        </View>
      </View>
      <View className="h-2 rounded-full bg-[#F5F5F580] overflow-hidden">
        <View
          className="h-full bg-[#FDFEFE] rounded-full"
          style={{ width: `${progress}%` }}
        />
      </View>
    </View>
  );
};

export default QuizProgressBar;
