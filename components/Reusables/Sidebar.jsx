import BookmarkWhite from "@/assets/icons/bookmark-white.svg";
import CartIcon from "@/assets/icons/side-cart-white.svg";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import TextHeader from "./TextHeader";

const Sidebar = ({ visible, onClose, children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (visible) {
      loadUser();
    }
  }, [visible]);

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

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  if (!visible) {
    return children;
  }

  return (
    <View className="flex-1 flex-row">
      {/* Sidebar */}
      <View className="w-[220px] bg-[#000E3A] h-full p-6">
        <View className="pt-24">
          {/* Profile Section */}
          <View className="mb-8">
            {user?.avatar_url ? (
              <Image
                source={{ uri: user.avatar_url }}
                className="w-[50px] h-[50px] rounded-full mb-4"
              />
            ) : (
              <View className="w-[50px] h-[50px] rounded-full bg-[#13E0A0] justify-center items-center mb-4">
                <Text className="text-[#000E3A] text-[18px] font-bold">
                  {getInitials(user?.full_name)}
                </Text>
              </View>
            )}
            <TextHeader
              content={user?.full_name || "User"}
              textStyles="text-[#13E0A0] text-[18px]"
            />
          </View>

          {/* Menu Items */}
          <View className="gap-4 mb-8">
            <TouchableOpacity
              className="flex-row justify-start items-center gap-2 py-3"
              onPress={() => {
                router.push("/(tabs)/community");
                onClose();
              }}
            >
              <BookmarkWhite width={16} height={16} />
              <TextHeader
                content="Home"
                textStyles="text-white text-[16px]"
                customLineHeight={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-start items-center gap-2 py-3"
              onPress={onClose}
            >
              <BookmarkWhite width={16} height={16} />
              <TextHeader
                content="Bookmarks"
                textStyles="text-white text-[16px]"
                customLineHeight={20}
              />
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-row justify-start items-center gap-2 py-3"
              onPress={onClose}
            >
              <CartIcon width={16} height={16} />
              <TextHeader
                content="Cart"
                textStyles="text-white text-[16px]"
                customLineHeight={20}
              />
            </TouchableOpacity>
          </View>

          <View className="gap-2 mt-40 pt-6 border-t border-[#ADADAD]">
            <TouchableOpacity
              className="flex-row justify-start items-center gap-2 py-3"
              onPress={onClose}
            >
              <BookmarkWhite width={16} height={16} />
              <TextHeader
                content="Settings"
                textStyles="text-white text-[16px]"
                customLineHeight={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-start items-center gap-2 py-3"
              onPress={onClose}
            >
              <BookmarkWhite width={16} height={16} />
              <TextHeader
                content="Help Center"
                textStyles="text-white text-[16px]"
                customLineHeight={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-start items-center gap-2 py-3"
              onPress={onClose}
            >
              <BookmarkWhite width={16} height={16} />
              <TextHeader
                content="Privacy policy"
                textStyles="text-white text-[16px]"
                customLineHeight={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-row justify-start items-center gap-2 py-3"
              onPress={onClose}
            >
              <BookmarkWhite width={16} height={16} />
              <TextHeader
                content="Rate Us"
                textStyles="text-white text-[16px]"
                customLineHeight={20}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Backdrop */}
      <TouchableOpacity
        className="flex-1 bg-black/50"
        activeOpacity={1}
        onPress={onClose}
      />
    </View>
  );
};

export default Sidebar;
