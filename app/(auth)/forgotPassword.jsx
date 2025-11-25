import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import TextHeader from "@/components/Reusables/TextHeader";
import TextContainer from "@/components/Reusables/TextContainer";
import BackButton from "@/components/Reusables/BackButton";
import { useRouter } from "expo-router";
import ForgotP from "@/assets/icons/ForgotP.svg";
import FormInput from "@/components/Forms/FormInput";
import AppButton from "@/components/Buttons/AppButton";
const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const goToVerifyCode = () => {
    router.push("/(auth)/verifyCode");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#000E3A]"
    >
      <View>
        <View className="bg-[#FCFCFC] h-full p-6 relative">
          <View className="pt-16">
            <BackButton />
          </View>
          <View className="mt-4">
            <View className="flex-row justify-center items-center">
              <ForgotP width={300} height={191} className="mx-auto mt-8" />
            </View>
            <View className="pt-8">
              <TextHeader
                textStyles="text-[24px] text-[#030303]"
                content="Forgot password"
              />
              <TextContainer
                content="Enter your email address registered to this account to receive code to reset password."
                textStyles="text-[12px] text-[#808080] mt-2"
              />
            </View>
            <View className="mt-8">
              <FormInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
                required
                labelStyle="text-[#030303]"
                inputStyle="border-[#030303] text-[#030303] bg-transparent"
              />
            </View>
          </View>
          {/* Button fixed at the bottom */}
          <View className="absolute left-0 right-0 bottom-20 px-6">
            <AppButton
              btnLabel="Continue"
              handlePress={goToVerifyCode}
              textStyles="text-[#13E0A0]"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
