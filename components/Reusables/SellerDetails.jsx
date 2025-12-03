import Message from "@/assets/icons/black-message.svg";
import Location from "@/assets/icons/location.svg";
import { Image, Text, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";

const SellerDetails = ({ seller, location }) => {
  const getInitials = (name) => {
    if (!name) return "S";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <View
      className="flex-row justify-between items-center bg-[#FFFFFF] p-4 rounded-[12px]"
      style={{
        shadowColor: "#F2F2F2",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 8, // blur
        elevation: 2, // for Android shadow
      }}
    >
      <View className="flex-row justify-start gap-3 items-center">
        {seller?.avatar_url ? (
          <Image
            source={{ uri: seller.avatar_url }}
            className="w-[40px] h-[40px] rounded-full"
          />
        ) : (
          <View className="w-[40px] h-[40px] rounded-full bg-[#000E3A] justify-center items-center">
            <Text className="text-[#13E0A0] text-[14px] font-bold">
              {getInitials(seller?.full_name)}
            </Text>
          </View>
        )}
        <View>
          <TextContainer
            content={seller?.full_name || "Unknown Seller"}
            textStyles="text-[14px] text-[#000000]"
          />
          <View className="flex-row justify-start items-center">
            <Location width={14} height={14} />
            <TextContainer
              content={location || "Location not specified"}
              textStyles="text-[#ADADAD] text-[12px]"
            />
          </View>
        </View>
      </View>
      <TouchableOpacity className="bg-[#F5F5F5] p-3 rounded-full justify-center items-center">
        <Message width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

export default SellerDetails;
