import CommunityIcon from "@/assets/icons/community-group.svg";
import Globe from "@/assets/icons/globe.svg";
import Private from "@/assets/icons/private.svg";
import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { createCommunity } from "@/lib/supabaseServices";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, View } from "react-native";

const CreateCommunity = () => {
  const router = useRouter();
  const { category } = useLocalSearchParams();

  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState("");
  const [privacySetting, setPrivacySetting] = useState("public");
  const [loading, setLoading] = useState(false);

  const handleCreateCommunity = async () => {
    // Validation
    if (!communityName.trim()) {
      Alert.alert("Error", "Please enter a community name");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Error", "Please enter a description");
      return;
    }

    setLoading(true);
    try {
      const newCommunity = await createCommunity({
        name: communityName.trim(),
        description: description.trim(),
        category: category || "General",
        privacySetting: privacySetting,
        rules: rules.trim() || null,
      });

      Alert.alert("Success", "Community created successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Navigate back to addCommunity with refresh trigger
            router.back();
          },
        },
      ]);
    } catch (error) {
      console.error("Create community error:", error);
      Alert.alert("Error", error.message || "Failed to create community");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-[#F2F2F2] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Create community" />
        </View>
        <ScrollView className="flex-1 bg-[#F9FAFB] pt-6 py-4 px-6">
          <View>
            <View className="flex-row justify-center items-center">
              <CommunityIcon />
            </View>
            <View>
              <TextHeader
                content="Start Your Community"
                textStyles="text-[18px] text-center"
                customLineHeight={20}
              />
              <TextContainer
                content="Connect with like-minded students"
                textStyles="text-[#ADADAD] text-[12px] text-center"
              />
            </View>
            <View className="gap-4 my-6">
              <FormInput
                label="Community Name"
                placeholder="Enter community name"
                value={communityName}
                onChangeText={setCommunityName}
              />
              <FormInput
                label="Description"
                placeholder="Enter community description"
                value={description}
                dynamicHeight={`h-[100px]`}
                onChangeText={setDescription}
                multiline
              />
              <View>
                <TextHeader
                  content={`Privacy Settings`}
                  textStyles={`text-[16px]`}
                />
                <View className="gap-5 mt-3">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPrivacySetting("public")}
                    className="flex-row justify-start items-center"
                  >
                    <View className="w-5 h-5 border border-gray-400 rounded-full justify-center items-center mr-3">
                      {privacySetting === "public" && (
                        <View className="w-3 h-3 bg-[#000E3A] rounded-full" />
                      )}
                    </View>
                    <View>
                      <View className="flex-row justify-start items-center gap-2">
                        <Globe />
                        <TextHeader
                          content={`Public`}
                          textStyles={`text-[14px]`}
                          customLineHeight={20}
                        />
                      </View>
                      <TextContainer
                        content={`Anyone can find and join this community`}
                        textStyles={`text-[12px] text-[#ADADAD]`}
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setPrivacySetting("private")}
                    className="flex-row justify-start items-center"
                  >
                    <View className="w-5 h-5 border border-gray-400 rounded-full justify-center items-center mr-3">
                      {privacySetting === "private" && (
                        <View className="w-3 h-3 bg-[#000E3A] rounded-full" />
                      )}
                    </View>
                    <View>
                      <View className="flex-row justify-start items-center gap-2">
                        <Private />
                        <TextHeader
                          content={`Private`}
                          textStyles={`text-[14px]`}
                          customLineHeight={20}
                        />
                      </View>
                      <TextContainer
                        content={`Only invited members can join`}
                        textStyles={`text-[12px] text-[#ADADAD]`}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <FormInput
                label="Community Rules"
                placeholder="Enter community rules (optional)"
                value={rules}
                onChangeText={setRules}
                dynamicHeight={`h-[100px]`}
                multiline
              />
            </View>
          </View>
          <AppButton
            btnLabel={loading ? "Creating..." : "Create community"}
            textStyles="text-[#000E3A] text-center text-[14px]"
            moreStyles="bg-[#13E0A0]"
            handlePress={handleCreateCommunity}
            disabled={loading}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default CreateCommunity;
