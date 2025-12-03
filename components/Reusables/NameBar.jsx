import BellIcon from "@/assets/icons/bell-icon.svg";
import CartIcon from "@/assets/icons/cartIcon.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import MessageIcon from "@/assets/icons/message-icon.svg";
import { getUnreadNotificationCount } from "@/lib/notificationService";
import { supabase } from "@/lib/supabase";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import SearchInput from "../Forms/SearchInput";
import Sidebar from "./Sidebar";

const NameBar = ({ shop, courses, filter }) => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadUser();
    loadUnreadCount();

    // Refresh unread count every 30 seconds
    const interval = setInterval(() => {
      loadUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadUser = async () => {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single();

        setUser(profile);
      }
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };

  const loadUnreadCount = async () => {
    try {
      const count = await getUnreadNotificationCount();
      setUnreadCount(count);
    } catch (error) {
      console.error("Error loading unread count:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  const goToNotifications = () => {
    router.push("/(notifications)/all");
    // Refresh count when returning from notifications
    setTimeout(() => {
      loadUnreadCount();
    }, 1000);
  };

  const goToCart = () => {
    router.push(`/product/${id}/cart`);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <>
      <View className="flex-row items-center bg-transparent gap-3 px-6 w-full py-3 border-b border-[#F2F2F2]">
        {/* Avatar */}
        <TouchableOpacity onPress={toggleSidebar}>
          {user?.avatar_url ? (
            <Image
              source={{ uri: user.avatar_url }}
              className="w-[44px] h-[44px] rounded-full"
            />
          ) : (
            <View className="w-[44px] h-[44px] rounded-full bg-[#000E3A] justify-center items-center">
              <Text className="text-[#13E0A0] text-[16px] font-bold">
                {getInitials(user?.full_name)}
              </Text>
            </View>
          )}
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
              onPress={goToCart}
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
                className="bg-[#13E0A01A] justify-center items-center w-[32px] h-[32px] rounded-full relative"
              >
                <BellIcon width={14} height={16} fill="#030303" />
                {unreadCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-[#FF3B30] w-[18px] h-[18px] rounded-full justify-center items-center border-2 border-white">
                    <Text className="text-white text-[10px] font-bold">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </Text>
                  </View>
                )}
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

      {/* Sidebar Modal */}
      <Modal
        visible={sidebarVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleSidebar}
      >
        <Sidebar visible={sidebarVisible} onClose={toggleSidebar} />
      </Modal>
    </>
  );
};

export default NameBar;
