import React from "react";
import { Text, View } from "react-native";

const TextHeader = ({ textStyles, content, viewStyles, customLineHeight }) => {
  return (
    <View className={`${viewStyles}`}>
      <Text
        style={{
          fontFamily: "CodecCodeBold",
          lineHeight: customLineHeight || 46,
        }}
        className={`${textStyles}`}
      >
        {content}
      </Text>
    </View>
  );
};

export default TextHeader;
