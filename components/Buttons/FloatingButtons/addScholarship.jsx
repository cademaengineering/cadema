import PlusIcon from "@/assets/icons/add-product-icon.svg";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
const AddScholarship = () => {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/scholarships/opportunities`);
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

export default AddScholarship;
