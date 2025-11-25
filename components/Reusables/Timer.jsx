import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import TextContainer from "./TextContainer";

const Timer = ({
  initialMinutes = 3,
  initialSeconds = 0,
  onTimeUp,
  onResend,
  showResend = true,
  timerTextStyle = "",
  resendTextStyle = "",
  containerStyle = "",
}) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isActive && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (minutes === 0 && seconds === 0) {
      setIsActive(false);
      if (onTimeUp) {
        onTimeUp();
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, onTimeUp]);

  const handleResend = () => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsActive(true);
    if (onResend) {
      onResend();
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const isTimeUp = minutes === 0 && seconds === 0;

  return (
    <View className={`items-center ${containerStyle}`}>
      {!isTimeUp ? (
        <TextContainer
          content={`${formatTime(minutes)}:${formatTime(seconds)}s`}
          textStyles={`text-[14px] text-[#414D58] ${timerTextStyle}`}
        />
      ) : (
        ""
      )}
    </View>
  );
};

export default Timer;
