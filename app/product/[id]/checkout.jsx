import React, { useState } from "react";
import { ScrollView, View, Modal, Text } from "react-native";
import { BlurView } from "expo-blur";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import OrderSuccessful from "@/components/Reusables/OrderSuccessful";

const Checkout = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="bg-[#000E3A05] flex-1">
      <View className="flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Checkout" />
        </View>
        <ScrollView className="flex-1 bg-[#F9FAFB] pt-6 py-4 px-6">
          <View className="gap-6">
            <FormInput
              label="Card Holder Name"
              placeholder=""
              inputStyle="border-[#ADADAD] text-[#ADADAD] bg-transparent"
              labelStyle="text-[#ADADAD]"
            />
            <FormInput
              label="Card Number"
              placeholder=""
              keyboardType="number-pad"
              inputStyle="border-[#ADADAD] text-[#ADADAD] bg-transparent mt-4"
              labelStyle="text-[#ADADAD]"
            />
            <View className="flex-row gap-4 mt-4 mb-14">
              <View className="w-[48%]">
                <FormInput
                  label="CVV"
                  placeholder=""
                  keyboardType="number-pad"
                  inputStyle="border-[#ADADAD] text-[#ADADAD] bg-transparent"
                  labelStyle="text-[#ADADAD]"
                />
              </View>
              <View className="w-[48%]">
                <FormInput
                  label="Expiry Date"
                  placeholder=""
                  inputStyle="border-[#ADADAD] text-[#ADADAD] bg-transparent"
                  labelStyle="text-[#ADADAD]"
                />
              </View>
            </View>
          </View>
          <AppButton
            btnLabel="Checkout"
            textStyles="text-[#000E3A] text-center text-[14px]"
            moreStyles="bg-[#13E0A0]"
            handlePress={() => setModalVisible(true)}
          />
        </ScrollView>
        {/* Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <BlurView
            intensity={20}
            className="flex-1 justify-center items-center bg-[#ABABAB66]"
          >
            <View className="bg-white w-[340px] p-8 items-center">
              <OrderSuccessful />
            </View>
          </BlurView>
        </Modal>
      </View>
    </View>
  );
};

export default Checkout;
