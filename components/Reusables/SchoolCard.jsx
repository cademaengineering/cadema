import { Image, View } from "react-native";
import TextContainer from "./TextContainer";

const SchoolCard = ({
  name = "Yale University",
  image = "https://res.cloudinary.com/dtxr92piy/image/upload/v1762546375/ku_damdnc.png",
}) => {
  return (
    <View className="flex-1 justify-center items-center bg-white p-5 rounded-[12px] gap-2">
      <Image
        source={{ uri: image }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      <TextContainer content={name} textStyles="text-center text-[12px]" />
    </View>
  );
};

export default SchoolCard;
