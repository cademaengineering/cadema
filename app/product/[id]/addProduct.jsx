import React, { useState } from "react";
import { ScrollView, View, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import Photo from "@/assets/icons/photo.svg";
import TextHeader from "@/components/Reusables/TextHeader";
import TextContainer from "@/components/Reusables/TextContainer";
import SelectInput from "@/components/Forms/SelectInput";

const categoryOptions = [
  { label: "Books", value: "Books" },
  { label: "Electronics", value: "Electronics" },
  { label: "Men", value: "Men" },
  { label: "Women", value: "Women" },
];

const AddProduct = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Add Product" />
        </View>
        <ScrollView className="flex-1 bg-[#F9FAFB] pt-6 py-4 px-6">
          <View className="gap-6 mb-10">
            <SelectInput
              label="Select Category"
              value={selectedCategory}
              options={categoryOptions}
              onSelect={setSelectedCategory}
              placeholder=""
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#8E9AAF]"
            />
            <View>
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
                      content="File type (JPG, Png, Jpg)"
                      textStyles="text-[#ADADAD] text-[12px]"
                    />
                    <AppButton
                      btnLabel="Select image"
                      moreStyles="bg-[#13E0A0] w-[150px]"
                      handlePress={handlePickImage}
                    />
                  </>
                )}
              </View>
            </View>
            <FormInput
              label="Product Name"
              placeholder=""
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#8E9AAF]"
            />
            <FormInput
              label="Product Description"
              placeholder=""
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#8E9AAF]"
            />
            <FormInput
              label="Select Location"
              placeholder=""
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#8E9AAF]"
            />
          </View>
          <AppButton
            btnLabel="Add Product"
            textStyles="text-[#000E3A] text-center text-[14px]"
            moreStyles="bg-[#13E0A0]"
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddProduct;
