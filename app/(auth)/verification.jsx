import React from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TextHeader from "@/components/Reusables/TextHeader";
import TextContainer from "@/components/Reusables/TextContainer";
import OtpViaPhone from "@/assets/icons/otp-via-phone.svg";
import OtpViaEmail from "@/assets/icons/otp-via-email.svg";
import ChveronRight from "@/assets/icons/chevron-right.svg";
import BackButton from "@/components/Reusables/BackButton";
import { useRouter } from "expo-router";
const Verification = () => {
  const router = useRouter();
  const handleOtp = () => {
    router.push("/(auth)/otpverification");
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
            <View className="pt-8">
              <TextHeader
                textStyles="text-[24px] text-[#030303]"
                content="OTP verification"
              />
              <TextContainer
                content="Kindly select how you want to receive OTP code to verify your identity."
                textStyles="text-[12px] text-[#808080] mt-2"
              />
            </View>
            <View className="gap-6 pt-8">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleOtp}
                className="flex-row justify-between border border-[#999999] rounded-[12px] bg-[#F5F5F5] p-3 items-center"
              >
                <View className="flex-row justify-start gap-3 items-center">
                  <OtpViaPhone width={24} height={24} />
                  <TextContainer
                    content="Send OTP via Phone"
                    textStyles="text-[14px] text-[#808080]"
                  />
                </View>
                <ChveronRight width={6.5} height={11.5} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleOtp}
                className="flex-row justify-between border border-[#999999] rounded-[12px] bg-[#F5F5F5] p-3 items-center"
              >
                <View className="flex-row justify-start gap-3 items-center">
                  <OtpViaEmail width={24} height={24} />
                  <TextContainer
                    content="Send OTP via email"
                    textStyles="text-[14px] text-[#808080]"
                  />
                </View>
                <ChveronRight width={6.5} height={11.5} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Verification;
