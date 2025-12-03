import AppleIcon from "@/assets/icons/apple-icon.svg";
import FacebookIcon from "@/assets/icons/facebook-icon.svg";
import GoogleIcon from "@/assets/icons/google-icon.svg";
import Line from "@/assets/icons/line.svg";
import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import PhoneInput from "@/components/Forms/PhoneInput";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { supabase } from "@/lib/supabase";
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

const Index = () => {
  const router = useRouter();

  // Form state management
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+1 ");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/\s/g, "");
    return cleanPhone.length >= 10;
  };

  const handleCreateAccount = async () => {
    // Form validation
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your full name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!validateEmail(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!phoneNumber || phoneNumber === "+1 ") {
      Alert.alert("Error", "Please enter your phone number");
      return;
    }

    if (!validatePhone(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Please create a password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const trimmedEmail = email.trim().toLowerCase();

      // Check if user already exists
      const { data: existingUser } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", trimmedEmail)
        .single();

      if (existingUser) {
        Alert.alert(
          "Account Exists",
          "An account with this email already exists. Please log in instead."
        );
        router.push("/(auth)/login");
        return;
      }

      // Store user info for later
      await AsyncStorage.setItem("pendingUserEmail", trimmedEmail);
      await AsyncStorage.setItem("pendingUserName", name.trim());
      await AsyncStorage.setItem("pendingUserPhone", phoneNumber.trim());
      await AsyncStorage.setItem("pendingUserPassword", password);

      // Send OTP for verification (this creates the user too)
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: trimmedEmail,
        options: {
          shouldCreateUser: true,
          data: {
            full_name: name.trim(),
            phone: phoneNumber.trim(),
          },
          // Add email redirect URL to avoid password change emails
          emailRedirectTo: undefined,
        },
      });

      if (otpError) throw otpError;

      Alert.alert(
        "Verification Code Sent",
        "Please check your email for the 6-digit verification code.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(auth)/otpverification"),
          },
        ]
      );
    } catch (error) {
      console.error("Signup error:", error);

      // Handle rate limiting error
      if (
        error.message?.includes("60 seconds") ||
        error.message?.includes("58 seconds")
      ) {
        Alert.alert(
          "Too Many Attempts",
          "Please wait a moment before trying again. If you already have an account, try logging in instead."
        );
      } else {
        Alert.alert("Error", error.message || "Failed to create account");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "cadema://auth/callback",
        },
      });

      if (error) throw error;
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to sign up with Google");
    }
  };

  const handleAppleSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: "cadema://auth/callback",
        },
      });

      if (error) throw error;
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to sign up with Apple");
    }
  };

  const handleFacebookSignup = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "facebook",
        options: {
          redirectTo: "cadema://auth/callback",
        },
      });

      if (error) throw error;
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to sign up with Facebook");
    }
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
                placeholder="Enter your full name"
                required
                editable={!loading}
              />

              <FormInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                required
                editable={!loading}
              />

              <PhoneInput
                label="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                required
                editable={!loading}
              />

              <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Create password"
                isPassword
                required
                editable={!loading}
              />
            </View>
            <View className="mt-6">
              <AppButton
                btnLabel={loading ? "Creating Account..." : "Create Account"}
                handlePress={handleCreateAccount}
                textStyles="text-[#13E0A0]"
                disabled={loading}
              />
            </View>
            <View className="flex-row justify-center items-center pt-3">
              <TextContainer
                content="Already have an account? "
                textStyles="text-[14px] text-[#808080]"
              />
              <Link href="/(auth)/login" asChild>
                <TouchableOpacity disabled={loading}>
                  <TextHeader
                    content="Log In"
                    textStyles="text-[14px] text-[#13E0A0] font-bold"
                  />
                </TouchableOpacity>
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
              <TouchableOpacity
                onPress={handleAppleSignup}
                disabled={loading}
                activeOpacity={0.7}
              >
                <AppleIcon width={50} height={50} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleGoogleSignup}
                disabled={loading}
                activeOpacity={0.7}
              >
                <GoogleIcon width={50} height={50} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleFacebookSignup}
                disabled={loading}
                activeOpacity={0.7}
              >
                <FacebookIcon width={50} height={50} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
};

export default Index;
