import AppButton from "@/components/Buttons/AppButton";
import BackButton from "@/components/Reusables/BackButton";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import Timer from "@/components/Reusables/Timer";
import { supabase } from "@/lib/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { OtpInput } from "react-native-otp-entry";

const OtpVerification = () => {
  const router = useRouter();
  const [otpCode, setOtpCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    loadEmail();
  }, []);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [resendTimer]);

  const loadEmail = async () => {
    try {
      const savedEmail = await AsyncStorage.getItem("pendingUserEmail");
      if (savedEmail) {
        setEmail(savedEmail);
      }
    } catch (error) {
      console.error("Error loading email:", error);
    }
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    if (name.length <= 2) return email;
    const masked =
      name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
    return `${masked}@${domain}`;
  };

  const handleOtpChange = (text) => {
    setOtpCode(text);
  };

  const handleVerify = async () => {
    if (otpCode.length !== 8) {
      Alert.alert("Error", "Please enter the complete 8-digit code");
      return;
    }

    setLoading(true);
    try {
      // Get stored credentials
      const name = await AsyncStorage.getItem("pendingUserName");
      const phone = await AsyncStorage.getItem("pendingUserPhone");
      const password = await AsyncStorage.getItem("pendingUserPassword");

      // Verify the OTP
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email: email,
        token: otpCode,
        type: "email",
      });

      if (verifyError) throw verifyError;

      if (!data.user) {
        throw new Error("Verification failed. Please try again.");
      }

      // Now set the password (user is verified and logged in)
      if (password) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: password,
        });
        if (passwordError) {
          console.error("Password update error:", passwordError);
          throw passwordError;
        }
      }

      // Create or update profile (use upsert to handle duplicates)
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email: email,
          full_name: name,
          phone: phone,
          updated_at: new Date().toISOString(),
        },
        {
          onConflict: "id",
          ignoreDuplicates: false,
        }
      );

      if (profileError) {
        console.error("Profile creation error:", profileError);
        throw profileError;
      }

      // Clear stored data
      await AsyncStorage.multiRemove([
        "pendingUserEmail",
        "pendingUserName",
        "pendingUserPhone",
        "pendingUserPassword",
      ]);

      // Navigate to success page
      Alert.alert("Success!", "Your account has been created successfully!", [
        {
          text: "Continue",
          onPress: () => router.replace("/(auth)/success"),
        },
      ]);
    } catch (error) {
      console.error("Verification error:", error);
      Alert.alert(
        "Verification Failed",
        error.message || "Invalid verification code. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendDisabled) return;

    setResendDisabled(true);
    setResendTimer(60);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          shouldCreateUser: false,
        },
      });

      if (error) throw error;

      Alert.alert(
        "Code Resent",
        "A new verification code has been sent to your email."
      );
    } catch (error) {
      console.error("Resend error:", error);
      Alert.alert(
        "Error",
        error.message || "Failed to resend code. Please try again."
      );
      setResendDisabled(false);
      setResendTimer(0);
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
                content={`Enter the 8 digit code sent to your email address ${maskEmail(
                  email
                )} below.`}
                textStyles="text-[12px] text-center text-[#808080] mt-2"
              />
            </View>
            <View className="mt-8">
              <OtpInput
                numberOfDigits={8}
                onTextChange={handleOtpChange}
                theme={{
                  containerStyle: {
                    marginHorizontal: 0,
                    gap: 3,
                  },
                  pinCodeContainerStyle: {
                    width: 40,
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
                content="Didn't get the code? "
                textStyles="text-[14px] text-[#7F8C8D]"
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleResendCode}
                disabled={resendDisabled}
              >
                <TextHeader
                  content={
                    resendDisabled ? `Resend (${resendTimer}s)` : "Resend Code"
                  }
                  textStyles={`text-[14px] ${
                    resendDisabled ? "text-[#7F8C8D]" : "text-[#000E3A]"
                  }`}
                />
              </TouchableOpacity>
            </View>
            <View className="gap-6 pt-8">
              <AppButton
                btnLabel={loading ? "Verifying..." : "Verify"}
                textStyles="text-[#13E0A0]"
                handlePress={handleVerify}
                disabled={loading || otpCode.length !== 8}
              />
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;
