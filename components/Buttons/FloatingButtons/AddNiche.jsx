import PlusIcon from "@/assets/icons/target-icon.svg";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
const CreatePostBtn = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push("/post/addPost");
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
