import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PostTitlebar from "@/components/Reusables/PostTitlebar";
import GalleryIcon from "@/assets/icons/gallery.svg";
import Cancel from "@/assets/icons/cancel.svg";

const AddPost = () => {
  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-[#000E3A05] flex-1"
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="pt-16 flex-1">
          <View className="px-6 pb-6">
            <PostTitlebar title="Everyone" action />
          </View>
          <View className="bg-white border border-[#F2F2F2] flex-1 p-6">
            {/* Full TextArea */}
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="| Share your post..."
              multiline
              className="flex-1 text-[16px] text-[#030303] px-4 py-3"
              style={{
                minHeight: 180,
                textAlignVertical: "top",
                fontFamily: "Abeatbykai",
              }}
              placeholderTextColor="#ADADAD"
            />
            {/* Show selected image preview */}
            {selectedImage && (
              <View className="my-4">
                <View className="flex-row justify-end pb-2">
                  <TouchableOpacity
                    className="p-3 w-[40px] h-[40px] justify-center items-center rounded-full bg-[#0303031F]"
                    onPress={() => setSelectedImage(null)} // Remove image on click
                  >
                    <Cancel width={11} height={11} />
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: selectedImage }}
                  style={{ width: "100%", height: 342, borderRadius: 12 }}
                  resizeMode="cover"
                />
              </View>
            )}
            {/* Post action icons */}
            <View className="flex-row items-center gap-4 mt-4">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={pickImageFromGallery}
              >
                <GalleryIcon width={28} height={28} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddPost;
