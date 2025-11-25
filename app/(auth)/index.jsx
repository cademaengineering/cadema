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
} from "react-native";
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
import PhoneInput from "@/components/Forms/PhoneInput";

const Index = () => {
  const router = useRouter();

  // Form state management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+1 "); // Default with US code
  const [password, setPassword] = useState("");

  const handleCreateAccount = () => {
    // Add form validation here if needed
    if (!name || !email || !phoneNumber || !password) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    // Navigate to verification page
    router.push("/(auth)/verification");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          className="flex-1 bg-[#FCFCFC]"
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 p-6">
            {/* <View className="flex-row items-center justify-center mt-16">
              <Logo width={66} height={66} />
            </View> */}
            <View className="mt-16">
              <TextHeader
                textStyles="text-[24px] text-[#030303] text-center font-bold"
                content="Create account"
                viewStyles="mb-4"
              />
              <TextContainer
                textStyles="text-[12px] text-center text-[#808080]"
                content="Please kindly enter your correct details below to sign up with us and get started"
              />
            </View>
            <View className="my-6 gap-6">
              <FormInput
                label="Full Name"
                value={name}
                onChangeText={setName}
                placeholder=""
                required
              />

              <FormInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder=""
                keyboardType="email-address"
                autoCapitalize="none"
                required
              />

              <PhoneInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder=""
                required
              />

              <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Create password"
                isPassword
                required
              />
            </View>
            <View className="mt-6">
              <AppButton
                btnLabel="Create Account"
                handlePress={handleCreateAccount}
                textStyles="text-[#13E0A0]"
              />
            </View>
            <View className="flex-row justify-center items-center pt-3">
              <TextContainer
                content="Already have an account? "
                textStyles="text-[14px] text-[#808080]"
              />
              <Link href="/(auth)/login">
                <TextHeader
                  content="Log In"
                  textStyles="text-[14px] text-[#13E0A0] font-bold"
                />
              </Link>
            </View>
            {/* Or Signup with Section */}
            <View className="flex-row items-center justify-center my-6">
              <Line width={100} height={1} />
              <TextContainer
                content="Or Signup with"
                textStyles="text-[12px] text-[#808080] mx-4"
              />
              <Line width={100} height={1} />
            </View>
            <View className="flex-row gap-6 justify-center items-center">
              <AppleIcon width={50} height={50} />
              <GoogleIcon width={50} height={50} className="mt-4" />
              <FacebookIcon width={50} height={50} className="mt-4" />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Index;
