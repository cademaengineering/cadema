import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import BackButton from "@/components/Reusables/BackButton";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, View } from "react-native";

const VerifyCode = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      router.push("/(auth)/forgotPasswordSuccess");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
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
                content="Create new password"
              />
              <TextContainer
                content="Enter your new password below."
                textStyles="text-[12px] text-[#808080] mt-2"
              />
            </View>
            <View className="mt-8 gap-6">
              <FormInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Create password"
                isPassword
                required
                labelStyle="text-[#030303]"
                inputStyle="border-[#030303] text-[#030303] bg-transparent"
              />
              <FormInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm password"
                isPassword
                required
                labelStyle="text-[#030303]"
                inputStyle="border-[#030303] text-[#030303] bg-transparent"
              />
            </View>
          </View>
          <View className="absolute left-0 right-0 bottom-20 px-6">
            <AppButton
              btnLabel={loading ? "Changing..." : "Change password"}
              textStyles="text-[#13E0A0]"
              handlePress={handleChangePassword}
              disabled={loading}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VerifyCode;
