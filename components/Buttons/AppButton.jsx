import { Text, TouchableOpacity, View } from "react-native";

const AppButton = ({ btnLabel, handlePress, moreStyles, textStyles }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={handlePress}
      className={`rounded-[12px] bg-[#000E3A] w-full py-5 ${moreStyles}`}
    >
      <View className="flex justify-center items-center">
        <Text
          style={{ fontFamily: "CodecCodeBold" }}
          className={`text-[14px] ${textStyles}`}
        >
          {btnLabel}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
