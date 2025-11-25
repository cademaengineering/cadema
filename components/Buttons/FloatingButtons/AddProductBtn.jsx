import React from "react";
import { TouchableOpacity } from "react-native";
import PlusIcon from "@/assets/icons/add-product-icon.svg";
import { useRouter, useLocalSearchParams } from "expo-router";
const CreatePostBtn = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const handlePress = () => {
    router.push(`/product/${id}/addProduct`);
  };

  return (
    <TouchableOpacity
      className="p-6 bg-[#000E3A] justify-center items-center rounded-full"
      onPress={handlePress}
    >
      <PlusIcon width={24} height={24} />
    </TouchableOpacity>
  );
};

export default CreatePostBtn;
