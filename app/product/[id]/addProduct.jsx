import Photo from "@/assets/icons/photo.svg";
import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import SelectInput from "@/components/Forms/SelectInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import TextContainer from "@/components/Reusables/TextContainer";
import TextHeader from "@/components/Reusables/TextHeader";
import { useCloudinary } from "@/hooks/useCloudinary";
import { createProduct } from "@/lib/supabaseServices";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

const categoryOptions = [
  { label: "Books", value: "Books" },
  { label: "Electronics", value: "Electronics" },
  { label: "Men's", value: "Men" },
  { label: "Women's", value: "Women" },
];

const AddProduct = () => {
  const router = useRouter();
  const { uploadToCloudinary, uploading } = useCloudinary();

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!productName.trim() || !selectedCategory || !price) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      let imageUrls = [];

      // Upload image to Cloudinary if selected
      if (selectedImage) {
        try {
          const uploadResult = await uploadToCloudinary(
            selectedImage,
            "cadema/products"
          );
          imageUrls = [uploadResult.url];
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          Alert.alert("Error", "Failed to upload image. Please try again.");
          setLoading(false);
          return;
        }
      }

      // Create product in Supabase
      await createProduct({
        name: productName.trim(),
        description: description.trim(),
        price: parseFloat(price),
        category: selectedCategory,
        location: location.trim(),
        imageUrls,
      });

      Alert.alert("Success", "Product added successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/shop"),
        },
      ]);
    } catch (error) {
      console.error("Create product error:", error);
      Alert.alert("Error", error.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  const isProcessing = loading || uploading;

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
              value={productName}
              onChangeText={setProductName}
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#8E9AAF]"
            />
            <FormInput
              label="Product Description"
              placeholder=""
              value={description}
              onChangeText={setDescription}
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#8E9AAF]"
            />
            <FormInput
              label="Price"
              placeholder=""
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#8E9AAF]"
            />
            <FormInput
              label="Select Location"
              placeholder=""
              value={location}
              onChangeText={setLocation}
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#8E9AAF]"
            />
          </View>
          {isProcessing && (
            <View className="flex-row items-center justify-center gap-2 mb-4">
              <ActivityIndicator size="small" color="#000E3A" />
              {uploading && (
                <Text className="text-[12px] text-[#ADADAD]">
                  Uploading image...
                </Text>
              )}
            </View>
          )}
          <AppButton
            btnLabel="Add Product"
            textStyles="text-[#000E3A] text-center text-[14px]"
            moreStyles="bg-[#13E0A0]"
            handlePress={handleAddProduct}
            disabled={isProcessing}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default AddProduct;
