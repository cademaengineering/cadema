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
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import Logo from "@/assets/icons/logo.svg";
import Line from "@/assets/icons/line.svg";
import AppleIcon from "@/assets/icons/apple-icon.svg";
import GoogleIcon from "@/assets/icons/google-icon.svg";
import FacebookIcon from "@/assets/icons/facebook-icon.svg";
import AppButton from "@/components/Buttons/AppButton";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import FormInput from "@/components/Forms/FormInput";
import Logo from "@/assets/icons/logo.svg";

const Login = () => {
  const router = useRouter();
  const goToHome = () => {
    router.push("/(tabs)/community");
  };

  const goToForgotPassword = () => {
    router.push("/(auth)/forgotPassword");
  };
  // Form state management
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-[#000E3A]"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-[#000E3A]">
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 p-6">
              <View className="flex-row items-center justify-start border-b border-[#ADADAD] pb-6 mt-16">
                <Logo width={32} height={32} />
                <TextHeader
                  textStyles="text-[20px] text-white font-bold ml-2"
                  content="Cadema"
                />
              </View>
              <View className="mt-16">
                <TextHeader
                  textStyles="text-[24px] text-white text-center font-bold"
                  content="Welcome back!"
                  viewStyles="mb-4"
                />
              </View>
              <View className="my-6 gap-6">
                <FormInput
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder=""
                  keyboardType="email-address"
                  autoCapitalize="none"
                  required
                  labelStyle="text-white"
                  inputStyle="border-white text-white bg-transparent"
                />

                <FormInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  isPassword
                  required
                  labelStyle="text-white"
                  inputStyle="border-white text-white bg-transparent"
                />
              </View>
              <View className="flex-row justify-between items-center mb-6">
                <TouchableOpacity
                  className="flex-row items-center"
                  onPress={toggleRememberMe}
                  activeOpacity={0.7}
                >
                  <View
                    className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                      rememberMe
                        ? "bg-[#13E0A0] border-[#13E0A0]"
                        : "border-[#ADADAD] bg-transparent"
                    }`}
                  >
                    {rememberMe && (
                      <MaterialCommunityIcons
                        name="check"
                        size={12}
                        color="white"
                      />
                    )}
                  </View>
                  <TextContainer
                    content="Remember me"
                    textStyles="text-[12px] text-[#ADADAD]"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={goToForgotPassword}>
                  <TextContainer
                    content="Forgot password?"
                    textStyles="text-[12px] text-[#13E0A0]"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Fixed bottom section */}
          <View className="absolute bottom-14 left-0 right-0 p-6 bg-[#000E3A]">
            <View>
              <AppButton
                handlePress={goToHome}
                btnLabel="Log in"
                moreStyles="bg-[#13E0A0]"
                textStyles="text-[#000E3A] text-[14px]"
              />
            </View>
            <View className="flex-row justify-center items-center">
              <TextContainer
                content="Don't have an account? "
                textStyles="text-[14px] text-[#F2F2F2]"
              />
              <Link href="/(auth)/">
                <TextHeader
                  content="Sign Up"
                  textStyles="text-[14px] text-[#13E0A0] font-bold"
                />
              </Link>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <StatusBar style="light" />
    </KeyboardAvoidingView>
  );
};

export default Login;
