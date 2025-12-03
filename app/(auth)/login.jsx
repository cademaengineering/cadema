import Logo from "@/assets/icons/logo.svg";
import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import {
  registerForPushNotificationsAsync,
  savePushToken,
} from "@/lib/pushNotificationService";
import { supabase } from "@/lib/supabase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      // Store remember me preference
      if (rememberMe) {
        await AsyncStorage.setItem("rememberMe", "true");
        await AsyncStorage.setItem("userEmail", email);
      } else {
        await AsyncStorage.removeItem("rememberMe");
        await AsyncStorage.removeItem("userEmail");
      }

      // After successful login, register for push notifications
      const token = await registerForPushNotificationsAsync();
      if (token) {
        await savePushToken(token);
      }

      Alert.alert("Success", "Logged in successfully!");
      router.replace("/(tabs)/community");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToForgotPassword = () => {
    router.push("/(auth)/forgotPassword");
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

          <View className="absolute bottom-14 left-0 right-0 p-6 bg-[#000E3A]">
            <View>
              <AppButton
                handlePress={handleLogin}
                btnLabel={loading ? "Logging in..." : "Log in"}
                moreStyles="bg-[#13E0A0]"
                textStyles="text-[#000E3A] text-[14px]"
                disabled={loading}
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
