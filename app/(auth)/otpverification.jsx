import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
// import TextHeader from "@/components/Reusables/TextHeader";
import { OtpInput } from "react-native-otp-entry";
import TextContainer from "@/components/Reusables/TextContainer";
import BackButton from "@/components/Reusables/BackButton";
import AppButton from "@/components/Buttons/AppButton";
import Timer from "@/components/Reusables/Timer";
import TextHeader from "@/components/Reusables/TextHeader";
import { useRouter } from "expo-router";
const OtpVerification = () => {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState("");

  const handleOtpChange = (text) => {
    setOtpCode(text);
    console.log(text);
  };

  const handleVerify = () => {
    if (otpCode.length === 6) {
      // Handle verification logic
      console.log("Verifying OTP:", otpCode);

      // Navigate to success page after verification
      router.push("/(auth)/success");
    } else {
      console.log("Please enter complete OTP");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#000E3A]"
    >
      <View>
        <View className="bg-[#FCFCFC] h-full p-6">
          <View className="pt-16">
            <BackButton />
          </View>
          <View className="mt-4">
            <View className="">
              <TextContainer
                content="Enter the 6 digit code sent to your email address t********@gmail.com below."
                textStyles="text-[12px] text-center text-[#808080] mt-2"
              />
            </View>
            <View className="mt-8">
              <OtpInput
                numberOfDigits={6}
                onTextChange={handleOtpChange}
                theme={{
                  containerStyle: {
                    marginHorizontal: 0,
                    gap: 8,
                  },
                  pinCodeContainerStyle: {
                    width: 50,
                    height: 50,
                    backgroundColor: "#9999991A",
                    borderRadius: 8,
                    borderWidth: 1,
                    borderColor: "#9999991A",
                  },
                  focusedPinCodeContainerStyle: {
                    borderColor: "#9999991A",
                    borderWidth: 2,
                  },
                  pinCodeTextStyle: {
                    fontSize: 18,
                    fontWeight: "700",
                    fontFamily: "Abeatbykai",
                    color: "#030303",
                  },
                  focusStickStyle: {
                    backgroundColor: "#030303",
                  },
                }}
                focusColor="#030303"
                autoFocus
              />
            </View>
            <View className="flex-row justify-center items-center gap-4 pt-6">
              <TextContainer
                content="Code expires"
                textStyles="text-[14px] text-[#7F8C8D]"
              />
              <Timer />
            </View>
            <View className="flex-row justify-center items-center pt-4">
              <TextContainer
                content="Didn't get the code?"
                textStyles="text-[14px] text-[#7F8C8D]"
              />
              <TouchableOpacity activeOpacity={0.7}>
                <TextHeader
                  content="Resend Code"
                  textStyles="text-[14px] text-[#000E3A]"
                />
              </TouchableOpacity>
            </View>
            <View className="gap-6 pt-8">
              <AppButton
                btnLabel="Verify"
                textStyles="text-[#13E0A0] "
                handlePress={handleVerify}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;
