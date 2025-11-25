import React, { useState } from "react";
import {
  View,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
// import Logo from "@/assets/icons/logo.svg";
import AppButton from "@/components/Buttons/AppButton";
import { Link, useRouter } from "expo-router";
import Confetti from "@/assets/icons/confetti.svg";
import TextHeader from "@/components/Reusables/TextHeader";
import TextContainer from "@/components/Reusables/TextContainer";
import Loader from "@/components/Reusables/Loader";

const ForgotPasswordSuccess = () => {
  const router = useRouter();
  const goToHome = () => {
    router.push("/(auth)/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#000E3A]"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center items-center bg-[#000E3A]">
          <View>
            <View className="justify-center items-center">
              <Loader />
            </View>
            <View className="w-[90%] mx-auto gap-8 pt-6">
              <TextHeader
                content="Your password has been updated successfully. Log in your account with your new password."
                customLineHeight={28}
                textStyles="text-white text-[18px] text-center"
              />
              <View className="justify-center items-center">
                <AppButton
                  handlePress={goToHome}
                  btnLabel="Go to Login"
                  moreStyles="bg-[#13E0A0]"
                  textStyles="text-[#000E3A] text-[14px]"
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordSuccess;
