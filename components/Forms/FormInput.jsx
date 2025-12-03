import TextContainer from "@/components/Reusables/TextContainer";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const FormInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  keyboardType = "default",
  autoCapitalize = "none",
  autoCorrect = false,
  editable = true,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  dynamicHeight,
  onFocus,
  onBlur,
  error,
  required = false,
  containerStyle = "",
  labelStyle = "",
  inputStyle = "",
  errorStyle = "",
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getBorderColor = () => {
    // Check if custom border is applied via inputStyle
    if (inputStyle.includes("border-white")) {
      if (error) return "border-red-500";
      if (isFocused) return "border-white";
      return "border-white";
    }

    // Default colors
    if (error) return "border-[#D00000]";
    if (isFocused) return "border-[#030303]";
    return "border-[#808080]";
  };

  const getIconColor = () => {
    // Check if this is for white theme (login page)
    if (inputStyle.includes("text-white")) {
      return "#FFFFFF";
    }
    return "#6B7280";
  };

  return (
    <View className={` ${containerStyle}`}>
      {/* Label */}
      {label && (
        <TextContainer
          content={`${label}`}
          textStyles={`text-[12px] mb-2 ${labelStyle || "text-gray-700"}`}
        />
      )}

      {/* Input Container */}
      <View className={`relative ${multiline ? "min-h-[100px]" : "h-12"}`}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isPassword && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`
            w-full h-[50px] ${dynamicHeight} px-4 rounded-[10px] border
            ${getBorderColor()}
            ${multiline ? "py-3 text-top" : "py-3"}
            ${!editable ? "bg-gray-100 text-gray-500" : ""}
            ${inputStyle || "bg-white text-gray-900"}
          `}
          style={{
            fontFamily: "Abeatbykai",
            fontSize: 14,
            textAlignVertical: multiline ? "top" : "center",
          }}
          placeholderTextColor={
            inputStyle.includes("text-white") ? "#CCCCCC" : "#9CA3AF"
          }
          {...props}
        />

        {/* Password Toggle Button */}
        {isPassword && (
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={togglePasswordVisibility}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={getIconColor()}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <TextContainer
          content={error}
          textStyles={`text-xs text-red-500 mt-1 ${errorStyle}`}
        />
      )}
    </View>
  );
};

export default FormInput;
