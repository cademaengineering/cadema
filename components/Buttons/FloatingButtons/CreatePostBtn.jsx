import React from "react";
import { TouchableOpacity } from "react-native";
import PlusIcon from "@/assets/icons/plus.svg";
import { useRouter } from "expo-router";
const CreatePostBtn = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/post/addPost");
  };

  return (
    <TouchableOpacity
      className="p-6 bg-[#13E0A0] justify-center items-center rounded-full"
      onPress={handlePress}
    >
      <PlusIcon width={24} height={24} />
    </TouchableOpacity>
  );
};

export default CreatePostBtn;
