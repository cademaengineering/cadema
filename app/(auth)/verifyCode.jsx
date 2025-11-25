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
import FormInput from "@/components/Forms/FormInput";
import AppButton from "@/components/Buttons/AppButton";
const VerifyCode = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const goToSuccess = () => {
    router.push("/(auth)/forgotPasswordSuccess");
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
            <View className="pt-8">
              <TextHeader
                textStyles="text-[24px] text-[#030303]"
                content="Check your email"
              />
              <TextContainer
                content="We’ve sent a 6-digit code to your email address sethcohen25@email.com, enter the code and create a new password. "
                textStyles="text-[12px] text-[#808080] mt-2"
              />
            </View>
            <View className="mt-8 gap-10">
              <FormInput
                label="Enter code"
                value={email}
                onChangeText={setEmail}
                placeholder=""
                keyboardType="text"
                autoCapitalize="none"
                required
                labelStyle="text-[#030303]"
                inputStyle="border-[#030303] text-[#030303] bg-transparent"
              />
              <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Create password"
                isPassword
                required
              />
              <FormInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm password"
                isPassword
                required
              />
            </View>
          </View>
          {/* Button fixed at the bottom */}
          <View className="absolute left-0 right-0 bottom-20 px-6">
            <AppButton
              btnLabel="Change password"
              textStyles="text-[#13E0A0]"
              handlePress={goToSuccess}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyCode;
