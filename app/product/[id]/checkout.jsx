import AppButton from "@/components/Buttons/AppButton";
import FormInput from "@/components/Forms/FormInput";
import ArrowTitlebar from "@/components/Reusables/ArrowTitlebar";
import OrderSuccessful from "@/components/Reusables/OrderSuccessful";
import { createOrder, getCartItems } from "@/lib/supabaseServices";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  View,
} from "react-native";

const Checkout = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
    deliveryAddress: "",
  });

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    try {
      const data = await getCartItems();
      if (!data || data.length === 0) {
        Alert.alert("Empty Cart", "Your cart is empty", [
          { text: "OK", onPress: () => router.back() },
        ]);
        return;
      }
      setCartItems(data);
    } catch (error) {
      console.error("Error loading cart:", error);
      Alert.alert("Error", "Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.cardHolderName.trim()) {
      Alert.alert("Validation Error", "Please enter card holder name");
      return false;
    }
    if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) {
      Alert.alert("Validation Error", "Please enter a valid card number");
      return false;
    }
    if (!formData.cvv.trim() || formData.cvv.length < 3) {
      Alert.alert("Validation Error", "Please enter a valid CVV");
      return false;
    }
    if (!formData.expiryDate.trim()) {
      Alert.alert("Validation Error", "Please enter expiry date");
      return false;
    }
    if (!formData.deliveryAddress.trim()) {
      Alert.alert("Validation Error", "Please enter delivery address");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      // In a real app, you'd process payment here first
      // For now, we'll just create the order
      await createOrder({
        deliveryAddress: formData.deliveryAddress,
        cartItems: cartItems,
      });

      setModalVisible(true);

      // Navigate after showing success modal
      setTimeout(() => {
        setModalVisible(false);
        router.push("/(tabs)/shop");
      }, 2000);
    } catch (error) {
      console.error("Error creating order:", error);
      Alert.alert("Error", error.message || "Failed to complete order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View className="bg-[#000E3A05] flex-1">
        <View className="pt-16 px-6 pb-4">
          <ArrowTitlebar title="Checkout" />
        </View>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#000E3A" />
        </View>
      </View>
    );
  }

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
              placeholder="John Doe"
              value={formData.cardHolderName}
              onChangeText={(text) => handleInputChange("cardHolderName", text)}
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
              labelStyle="text-[#ADADAD]"
            />
            <FormInput
              label="Card Number"
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChangeText={(text) => handleInputChange("cardNumber", text)}
              keyboardType="number-pad"
              maxLength={16}
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent mt-4"
              labelStyle="text-[#ADADAD]"
            />
            <View className="flex-row gap-4 mt-4">
              <View className="w-[48%]">
                <FormInput
                  label="CVV"
                  placeholder="123"
                  value={formData.cvv}
                  onChangeText={(text) => handleInputChange("cvv", text)}
                  keyboardType="number-pad"
                  maxLength={4}
                  secureTextEntry
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#ADADAD]"
                />
              </View>
              <View className="w-[48%]">
                <FormInput
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChangeText={(text) => handleInputChange("expiryDate", text)}
                  maxLength={5}
                  inputStyle="border-[#ADADAD] text-[#030303] bg-transparent"
                  labelStyle="text-[#ADADAD]"
                />
              </View>
            </View>
            <FormInput
              label="Delivery Address"
              placeholder="Enter your delivery address"
              value={formData.deliveryAddress}
              onChangeText={(text) =>
                handleInputChange("deliveryAddress", text)
              }
              multiline
              numberOfLines={3}
              inputStyle="border-[#ADADAD] text-[#030303] bg-transparent mt-4 h-[80px]"
              labelStyle="text-[#ADADAD]"
            />
          </View>
          <AppButton
            btnLabel={submitting ? "Processing..." : "Checkout"}
            textStyles="text-[#000E3A] text-center text-[14px]"
            moreStyles={`bg-[#13E0A0] mt-8 ${submitting ? "opacity-50" : ""}`}
            handlePress={handleCheckout}
            disabled={submitting}
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
