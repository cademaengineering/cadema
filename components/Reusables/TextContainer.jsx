import React from "react";
import { Text, View } from "react-native";

const TextContainer = ({ textStyles, content, viewStyles, customHeight }) => {
  return (
    <View className={`${viewStyles}`}>
      <Text
        style={{
          fontFamily: "Abeatbykai",
          lineHeight: customHeight || 18,
        }}
        className={`${textStyles}`}
      >
        {content}
      </Text>
    </View>
  );
};

export default TextContainer;
