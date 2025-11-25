import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import SearchIcon from "@/assets/icons/search-icon.svg";

const SearchInput = ({
  value,
  onChangeText,
  placeholder = "Search...",
  onSearchPress,
  onFocus,
  onBlur,
  containerStyle = "",
  inputStyle = "",
  iconStyle = "",
  editable = true,
  autoFocus = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleSearchPress = () => {
    if (onSearchPress) {
      onSearchPress(value);
    }
  };

  return (
    <View className={`relative ${containerStyle}`}>
      {/* Text Input */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={editable}
        autoFocus={autoFocus}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          w-full h-[36px] pl-10 pr-4 rounded-[18px] border
          ${isFocused ? "border-[#13E0A0]" : "border-[#E5E5E5]"}
          ${!editable ? "bg-gray-100 text-gray-500" : ""}
          ${inputStyle}
        `}
        style={{
          fontFamily: "Abeatbykai",
          fontSize: 12,
          color: "#030303",
        }}
        placeholderTextColor="#9CA3AF"
        returnKeyType="search"
        onSubmitEditing={handleSearchPress}
        {...props}
      />

      {/* Search Icon - Positioned absolutely over the input */}
      <View className="absolute left-3 top-1 bottom-0 justify-center z-10">
        <TouchableOpacity
          onPress={handleSearchPress}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <SearchIcon
            width={16}
            height={16}
            fill={isFocused ? "#13E0A0" : "#9CA3AF"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchInput;
