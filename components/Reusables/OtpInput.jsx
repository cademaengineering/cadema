import React, { useState, useRef, useEffect } from "react";
import { View, TextInput } from "react-native";

const OtpInput = ({
  length = 6,
  onComplete,
  onCodeChange,
  containerStyle = "",
  inputStyle = "",
  error = false,
  ...props
}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    // Initialize refs array and focus first input
    inputRefs.current = inputRefs.current.slice(0, length);
    inputRefs.current[0]?.focus();
  }, [length]);

  const handleChange = (value, index) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);

    // Call onCodeChange callback
    if (onCodeChange) {
      onCodeChange(newOtp.join(""));
    }

    // Auto-focus next input when current field gets a value
    if (value && index < length - 1) {
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus();
      }, 50);
    }

    // Call onComplete when all fields are filled
    if (newOtp.every((digit) => digit !== "") && onComplete) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyPress = (event, index) => {
    // Handle backspace
    if (event.nativeEvent.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index] === "" && index > 0) {
        // If current field is empty, focus and clear previous field
        newOtp[index - 1] = "";
        setOtp(newOtp);
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 50);
      } else {
        // Clear current field
        newOtp[index] = "";
        setOtp(newOtp);
      }

      if (onCodeChange) {
        onCodeChange(newOtp.join(""));
      }
    }
  };

  const getBorderColor = (index) => {
    if (error) return "border-red-500";
    if (otp[index]) return "border-green-500";
    return "border-gray-300";
  };

  const getBackgroundColor = (index) => {
    if (otp[index]) return "bg-green-50";
    return "bg-gray-50";
  };

  return (
    <View className={`flex-row justify-between gap-2 ${containerStyle}`}>
      {Array.from({ length }, (_, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          value={otp[index]}
          onChangeText={(value) => handleChange(value, index)}
          onKeyPress={(event) => handleKeyPress(event, index)}
          keyboardType="numeric"
          maxLength={1}
          selectTextOnFocus
          className={`
            w-12 h-12 rounded-lg border-2 text-center text-lg font-semibold
            ${getBorderColor(index)}
            ${getBackgroundColor(index)}
            ${inputStyle}
          `}
          style={{
            fontFamily: "Abeatbykai",
            fontSize: 18,
            color: "#030303",
          }}
          placeholderTextColor="#999999"
          {...props}
        />
      ))}
    </View>
  );
};

export default OtpInput;
