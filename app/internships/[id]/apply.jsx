import Confetti from "@/assets/icons/confetti.svg";
import Photo from "@/assets/icons/photo.svg";
import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import ProgressBar from "@/components/Reusables/ProgressBar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { BlurView } from "expo-blur";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Modal, ScrollView, View } from "react-native";

const Apply = () => {
  const router = useRouter();
  const gotoHome = () => {
    setModalVisible(false);
    router.replace(`/(breakboard)/scholarship`);
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Step 1 form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Step 2 form data
  const [institutionName, setInstitutionName] = useState("");
  const [courseOfStudy, setCourseOfStudy] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [portfolioLink, setPortfolioLink] = useState("");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handlePickSchoolId = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedSchoolId(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Handle form submission
      console.log("Submitting application...");
      setModalVisible(true);
    }
  };

  const getProgress = () => {
    return currentStep === 1 ? 0.5 : 1;
  };

  const getProgressPercentage = () => {
    return currentStep === 1 ? "50%" : "100%";
  };

  return (
    <View className="bg-[#F9FAFB] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Apply for internships" />
        </View>
        <ScrollView className="flex-1 bg-[#F9FAFB] pt-6 py-4 px-6">
          <View className="gap-6 mb-10">
            <View>
              <View className="flex-row justify-between items-center mb-1">
                <TextContainer
                  content={`Step ${currentStep} of 2`}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
                <TextContainer
                  content={getProgressPercentage()}
                  textStyles={`text-[#ADADAD] text-[12px]`}
                />
              </View>
              <ProgressBar progress={getProgress()} fillerColor="#13E0A0" />
            </View>

            {/* Step 1 */}
            {currentStep === 1 && (
              <>
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChangeText={setFullName}
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#8E9AAF]"
                />
                <FormInput
                  label="Email address"
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#8E9AAF]"
                />
                <FormInput
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#8E9AAF]"
                />
                <FormInput
                  label="Linkedin Profile"
                  placeholder="Enter your profile"
                  value={linkedinProfile}
                  onChangeText={setLinkedinProfile}
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#8E9AAF]"
                />
                <View>
                  <TextContainer
                    content="Upload 5min video"
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
                          content="Upload Video"
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
              </>
            )}

            {/* Step 2 */}
            {currentStep === 2 && (
              <>
                <FormInput
                  label="Years of Experience"
                  placeholder="Enter years of experience"
                  value={yearsOfExperience}
                  onChangeText={setYearsOfExperience}
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#8E9AAF]"
                />
                <FormInput
                  label="Expected Salary"
                  placeholder="Enter expected salary"
                  value={expectedSalary}
                  onChangeText={setExpectedSalary}
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#8E9AAF]"
                />
                <FormInput
                  label="Portfolio Link"
                  placeholder="Enter portfolio link"
                  value={portfolioLink}
                  onChangeText={setPortfolioLink}
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#8E9AAF]"
                />
                <View>
                  <TextContainer
                    content="School ID"
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
                    {selectedSchoolId ? (
                      <Image
                        source={{ uri: selectedSchoolId }}
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
                          content="Upload School ID"
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
                            handlePress={handlePickSchoolId}
                          />
                        </View>
                      </>
                    )}
                  </View>
                </View>
              </>
            )}
          </View>

          <AppButton
            btnLabel={currentStep === 1 ? "Next" : "Submit Application"}
            textStyles="text-[#000E3A] text-center text-[14px]"
            moreStyles="bg-[#13E0A0]"
            handlePress={handleNext}
          />
        </ScrollView>

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
                content="Application Submitted!"
                textStyles="text-[24px] text-[#000000] mb-4 text-center"
                customLineHeight={30}
              />
              <TextContainer
                content="Your internship application was successful. Kindly check your mail or notification for updates."
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
    </View>
  );
};

export default Apply;
