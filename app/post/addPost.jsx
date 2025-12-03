import Cancel from "@/assets/icons/cancel.svg";
import GalleryIcon from "@/assets/icons/gallery.svg";
import PostTitlebar from "@/components/Reusables/PostTitlebar";
import { useCloudinary } from "@/hooks/useCloudinary";
import { supabase } from "@/lib/supabase";
import { createPost } from "@/lib/supabaseServices";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const AddPost = () => {
  const router = useRouter();
  const { communityId } = useLocalSearchParams();
  const { uploadToCloudinary, uploading } = useCloudinary();

  const [text, setText] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [communityName, setCommunityName] = useState("Everyone");

  useEffect(() => {
    if (communityId) {
      loadCommunity();
    }
  }, [communityId]);

  const loadCommunity = async () => {
    try {
      const { data, error } = await supabase
        .from("communities")
        .select("name")
        .eq("id", communityId)
        .single();

      if (error) throw error;
      if (data) {
        setCommunityName(data.name);
      }
    } catch (error) {
      console.error("Error loading community:", error);
    }
  };

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

  const handlePost = async () => {
    if (!text.trim() && !selectedImage) {
      Alert.alert("Error", "Please add some content or an image");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = null;

      // Upload image to Cloudinary if selected
      if (selectedImage) {
        try {
          const uploadResult = await uploadToCloudinary(
            selectedImage,
            "cadema/posts"
          );
          imageUrl = uploadResult.url;
        } catch (uploadError) {
          console.error("Image upload error:", uploadError);
          Alert.alert("Error", "Failed to upload image. Please try again.");
          setLoading(false);
          return;
        }
      }

      // Create post in Supabase
      await createPost({
        content: text.trim(),
        imageUrl: imageUrl,
        communityId: communityId || null,
      });

      Alert.alert("Success", "Post created successfully!", [
        {
          text: "OK",
          onPress: () => {
            // Navigate back to community feed
            router.replace("/(tabs)/community");
          },
        },
      ]);
    } catch (error) {
      console.error("Create post error:", error);
      Alert.alert("Error", error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const isProcessing = loading || uploading;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="bg-[#000E3A05] flex-1"
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="pt-16 flex-1">
          <View className="px-6 pb-6">
            <PostTitlebar
              title={communityName}
              action
              onPost={handlePost}
              loading={isProcessing}
            />
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
              editable={!isProcessing}
            />
            {/* Show selected image preview */}
            {selectedImage && (
              <View className="my-4">
                <View className="flex-row justify-end pb-2">
                  <TouchableOpacity
                    className="p-3 w-[40px] h-[40px] justify-center items-center rounded-full bg-[#0303031F]"
                    onPress={() => setSelectedImage(null)} // Remove image on click
                    disabled={isProcessing}
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
                disabled={isProcessing}
              >
                <GalleryIcon width={28} height={28} />
              </TouchableOpacity>
              {isProcessing && (
                <View className="flex-row items-center gap-2">
                  <ActivityIndicator size="small" color="#000E3A" />
                  {uploading && (
                    <Text className="text-[12px] text-[#ADADAD]">
                      Uploading image...
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddPost;
