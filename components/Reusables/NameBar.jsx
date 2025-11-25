import BellIcon from "@/assets/icons/bell-icon.svg";
import CartIcon from "@/assets/icons/cartIcon.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import MessageIcon from "@/assets/icons/message-icon.svg";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import SearchInput from "../Forms/SearchInput";
const avatar = require("@/assets/icons/avatar.png");

const NameBar = ({ shop, courses, filter }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const goToNotifications = () => {
    router.push("/(notifications)/all");
  };

  return (
    <View className="flex-row items-center bg-transparent gap-3 px-6 w-full py-3 border-b border-[#F2F2F2]">
      {/* Avatar */}
      <TouchableOpacity>
        <Image source={avatar} className="w-[44px] h-[44px] rounded-full" />
      </TouchableOpacity>

      {/* Search Input - Takes remaining space */}
      <View className="flex-1">
        <SearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search here"
          onSearchPress={handleSearch}
          containerStyle="-mt-1"
          inputStyle=""
        />
      </View>

      {/* Notification Icons */}
      <View>
        {shop ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goToNotifications}
            className="bg-[#13E0A0] justify-center items-center w-[40px] h-[40px] rounded-full"
          >
            <CartIcon width={16} height={16} fill="#030303" />
          </TouchableOpacity>
        ) : courses ? (
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={filter}
              className="bg-[#000E3A] justify-center items-center w-[40px] h-[40px] rounded-full"
            >
              <FilterIcon width={20} height={20} fill="" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-row items-center gap-2">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={goToNotifications}
              className="bg-[#13E0A01A] justify-center items-center w-[32px] h-[32px] rounded-full"
            >
              <BellIcon width={14} height={16} fill="#030303" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              className="bg-[#13E0A01A] justify-center items-center w-[32px] h-[32px] rounded-full"
            >
              <MessageIcon width={16} height={14} fill="#030303" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default NameBar;
