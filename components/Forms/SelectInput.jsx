import React, { useState } from "react";
import { View, TouchableOpacity, Modal, FlatList, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TextContainer from "@/components/Reusables/TextContainer";

const SelectInput = ({
  label,
  value,
  options = [],
  onSelect,
  placeholder = "Select...",
  containerStyle = "",
  labelStyle = "",
  inputStyle = "",
  errorStyle = "",
  error,
  required = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (inputStyle.includes("border-white")) {
      if (error) return "border-red-500";
      if (isFocused) return "border-white";
      return "border-white";
    }
    if (error) return "border-[#D00000]";
    if (isFocused) return "border-[#030303]";
    return "border-[#808080]";
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

      {/* Select Input */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setModalVisible(true)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          w-full h-[50px] px-4 rounded-[10px] border
          flex-row items-center justify-between
          ${getBorderColor()}
          ${inputStyle || "bg-white text-gray-900"}
        `}
        style={{
          fontFamily: "Abeatbykai",
          fontSize: 14,
        }}
      >
        <Text
          className={`flex-1 ${value ? "text-[#030303]" : "text-[#9CA3AF]"}`}
          style={{
            fontFamily: "Abeatbykai",
            fontSize: 14,
          }}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#8E9AAF" />
      </TouchableOpacity>

      {/* Error Message */}
      {error && (
        <TextContainer
          content={error}
          textStyles={`text-xs text-red-500 mt-1 ${errorStyle}`}
        />
      )}

      {/* Modal for options */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-center items-center bg-[#00000066]"
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View className="bg-white w-[90%] rounded-[10px] p-4">
            <FlatList
              data={options}
              keyExtractor={(item) => item.value || item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="py-3 px-2"
                  onPress={() => {
                    onSelect(item.value || item);
                    setModalVisible(false);
                  }}
                >
                  <Text
                    className="text-[14px] text-[#030303]"
                    style={{ fontFamily: "Abeatbykai" }}
                  >
                    {item.label || item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SelectInput;
