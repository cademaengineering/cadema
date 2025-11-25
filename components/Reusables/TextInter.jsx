import React from "react";
import { Text, View } from "react-native";

const TextInter = ({ textStyles, content, viewStyles, customLineHeight }) => {
  return (
    <View className={`${viewStyles}`}>
      <Text
        style={{
          fontFamily: "Inter",
          lineHeight: customLineHeight || 46,
          fontWeight: "700",
        }}
        className={`${textStyles}`}
      >
        {content}
      </Text>
    </View>
  );
};

export default TextInter;
