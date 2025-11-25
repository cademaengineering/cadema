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

const Success = () => {
  const router = useRouter();
  const goToHome = () => {
    router.push("/(tabs)/community");
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
              <Confetti width={200} height={233} />
            </View>
            <View className="w-[90%] mx-auto gap-8">
              <TextHeader
                content="Account created successfully!"
                textStyles="text-white text-[30px] text-center"
              />
              <TextContainer
                content="Congratulations! Your path to success begins here with our exciting features"
                textStyles="text-white text-[14px] text-center"
              />
              <View className="justify-center items-center">
                <AppButton
                  handlePress={goToHome}
                  btnLabel="Go to homepage"
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

export default Success;
