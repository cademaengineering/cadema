import PlusIcon from "@/assets/icons/plus.svg";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

const CreatePostBtn = ({ communityId }) => {
  const router = useRouter();

  const handlePress = () => {
    if (communityId) {
      router.push(`/post/addPost?communityId=${communityId}`);
    } else {
      router.push("/post/addPost");
    }
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
