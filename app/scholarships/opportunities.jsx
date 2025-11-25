import Confetti from "@/assets/icons/confetti.svg";
import Photo from "@/assets/icons/photo.svg";
import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import SelectInput from "@/components/Forms/SelectInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Opportunities = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Form data
  const [category, setCategory] = useState("");
  const [scholarshipName, setScholarshipName] = useState("");
  const [description, setDescription] = useState("");
  const [fundingAmount, setFundingAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [requirements, setRequirements] = useState("");

  const categories = [
    { label: "Scholarship", value: "scholarship" },
    { label: "Internship", value: "internship" },
    { label: "Grant", value: "grant" },
    { label: "Job", value: "job" },
  ];

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const gotoHome = () => {
    setModalVisible(false);
    router.replace(`/(breakboard)/scholarship`);
  };

  const handleSubmit = () => {
    console.log("Submitting opportunity...");
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-[#F9FAFB] flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <View className="pt-16 px-6 pb-4">
            <ArrowTitlebar title="Upload Opportunity" />
          </View>
          <ScrollView className="flex-1 bg-[#F9FAFB] pt-6 py-4 px-6">
            <View className="gap-6 mb-10">
              <SelectInput
                label="Select Category"
                placeholder="Select scholarship category"
                value={category}
                onValueChange={setCategory}
                options={categories}
                inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                labelStyle="text-[#8E9AAF]"
              />
              <FormInput
                label="Scholarship Name/Company"
                placeholder="Enter scholarship name or company"
                value={scholarshipName}
                onChangeText={setScholarshipName}
                inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                labelStyle="text-[#8E9AAF]"
              />
              <FormInput
                label="Scholarship Description"
                placeholder="Enter scholarship description"
                value={description}
                onChangeText={setDescription}
                inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                labelStyle="text-[#8E9AAF]"
                multiline
              />
              <FormInput
                label="Funding Amount"
                placeholder="Enter funding amount"
                value={fundingAmount}
                onChangeText={setFundingAmount}
                inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                labelStyle="text-[#8E9AAF]"
              />
              <FormInput
                label="Scholarship Deadline"
                placeholder="Enter deadline date"
                value={deadline}
                onChangeText={setDeadline}
                inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                labelStyle="text-[#8E9AAF]"
              />
              <FormInput
                label="Requirements"
                placeholder="Enter scholarship requirements"
                value={requirements}
                onChangeText={setRequirements}
                inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                labelStyle="text-[#8E9AAF]"
                multiline
              />

              {/* Image Upload */}
              <View>
                <TextContainer
                  content="Scholarship Image"
                  textStyles="text-[#8E9AAF] text-[14px] mb-2"
                />
                <View
                  className="w-full h-[200px] justify-center items-center rounded-[12px] gap-3 bg-[#F5F5F5]"
                  style={{
                    borderWidth: 0.5,
                    borderColor: "#99999966",
                    borderStyle: "dashed",
                    overflow: "hidden",
                  }}
                >
                  {selectedImage ? (
                    <Image
                      source={{ uri: selectedImage }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 12,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <>
                      <Photo width={40} height={40} />
                      <TextHeader
                        customLineHeight={20}
                        content="Upload Image"
                        textStyles="text-[14px]"
                      />
                      <TextContainer
                        content="Max size (50mb)"
                        textStyles="text-[#ADADAD] text-[12px]"
                      />
                      <View className="justify-center items-center">
                        <AppButton
                          btnLabel="Select Image"
                          moreStyles="bg-[#13E0A0] w-[150px] px-6"
                          handlePress={handlePickImage}
                        />
                      </View>
                    </>
                  )}
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="px-6 pt-4 pb-8">
            <AppButton
              btnLabel="Upload opportunity"
              textStyles="text-[#000E3A] text-center text-[14px]"
              moreStyles="bg-[#13E0A0]"
              handlePress={handleSubmit}
            />
          </View>

          {/* Success Modal */}
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <BlurView
              intensity={20}
              className="flex-1 justify-center items-center bg-[#ABABAB66]"
            >
              <View className="bg-white w-[340px] rounded-[12px] p-8 items-center">
                <Confetti width={120} height={140} className="mb-4" />
                <TextHeader
                  content="Opportunity Posted!"
                  textStyles="text-[24px] text-[#000000] mb-4 text-center"
                  customLineHeight={30}
                />
                <TextContainer
                  content="Your scholarship opportunity has been posted successfully. Students can now view and apply for it."
                  textStyles="text-[12px] text-[#808080] text-center mb-6"
                />
                <AppButton
                  btnLabel="Back to Home"
                  textStyles="text-[#13E0A0] text-center text-[14px]"
                  moreStyles="bg-[#000E3A] w-full"
                  handlePress={gotoHome}
                />
              </View>
            </BlurView>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Opportunities;
