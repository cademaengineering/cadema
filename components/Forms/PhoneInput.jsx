import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TextContainer from "@/components/Reusables/TextContainer";

const PhoneInput = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  required = false,
  containerStyle = "",
  labelStyle = "",
  inputStyle = "",
  error,
  errorStyle = "",
  onFocus,
  onBlur,
  ...props
}) => {
  const [isCountryModalVisible, setIsCountryModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "🇺🇸",
  });

  // Common countries list - you can expand this
  const countries = [
    { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
    { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
    { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
    { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
    { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
    { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
    { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
    { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
    { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬" },
    { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
    { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
    { name: "Mexico", code: "MX", dialCode: "+52", flag: "🇲🇽" },
    { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
    { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  ];

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryModalVisible(false);

    // Update the phone number with new country code
    const phoneWithoutCode = value.replace(/^\+\d+\s?/, "");
    const newPhoneNumber = `${country.dialCode} ${phoneWithoutCode}`;
    onChangeText(newPhoneNumber);
  };

  const handlePhoneChange = (text) => {
    // Ensure the country code is always present
    if (!text.startsWith(selectedCountry.dialCode)) {
      text = `${selectedCountry.dialCode} ${text}`;
    }
    onChangeText(text);
  };

  const getBorderColor = () => {
    if (error) return "border-[#D00000]";
    if (isFocused) return "border-[#030303]";
    return "border-[#808080]";
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center py-4 px-4 border-b border-gray-100"
      onPress={() => handleCountrySelect(item)}
    >
      <Text className="text-2xl mr-3">{item.flag}</Text>
      <View className="flex-1">
        <Text className="text-gray-900 font-medium">{item.name}</Text>
        <Text className="text-gray-500 text-sm">{item.dialCode}</Text>
      </View>
      {selectedCountry.code === item.code && (
        <MaterialCommunityIcons name="check" size={20} color="#13E0A0" />
      )}
    </TouchableOpacity>
  );

  return (
    <View className={` ${containerStyle}`}>
      {/* Label */}
      {label && (
        <TextContainer
          content={`${label}`}
          textStyles={`text-[12px] text-gray-700 mb-2 ${labelStyle}`}
        />
      )}

      {/* Input Container */}
      <View className="relative h-12">
        <View
          className={`
            flex-row items-center h-[50px] bg-white rounded-[10px] border
            ${getBorderColor()}
          `}
        >
          {/* Country Code Selector */}
          <TouchableOpacity
            className="flex-row items-center px-3 py-3 border-r border-[#808080]"
            onPress={() => setIsCountryModalVisible(true)}
          >
            <Text className="text-lg mr-2">{selectedCountry.flag}</Text>
            <Text className="text-gray-700 mr-1 text-sm">
              {selectedCountry.dialCode}
            </Text>
            <MaterialCommunityIcons
              name="chevron-down"
              size={16}
              color="#6B7280"
            />
          </TouchableOpacity>

          {/* Phone Input */}
          <TextInput
            value={value.replace(selectedCountry.dialCode, "").trim()}
            onChangeText={(text) => handlePhoneChange(text)}
            placeholder={placeholder}
            keyboardType="phone-pad"
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`flex-1 px-3 py-3 text-gray-900 ${inputStyle}`}
            style={{
              fontFamily: "Abeatbykai",
              fontSize: 14,
            }}
            placeholderTextColor="#9CA3AF"
            {...props}
          />
        </View>
      </View>

      {/* Error Message */}
      {error && (
        <TextContainer
          content={error}
          textStyles={`text-xs text-red-500 mt-1 ${errorStyle}`}
        />
      )}

      {/* Country Selection Modal */}
      <Modal
        visible={isCountryModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsCountryModalVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[70%]">
            {/* Modal Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold">Select Country</Text>
              <TouchableOpacity onPress={() => setIsCountryModalVisible(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Countries List */}
            <FlatList
              data={countries}
              renderItem={renderCountryItem}
              keyExtractor={(item) => item.code}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default PhoneInput;
