import BookmarkWhite from "@/assets/icons/bookmark-white.svg";
import CommunityIcon from "@/assets/icons/community-white.svg";
import CartIcon from "@/assets/icons/side-cart-white.svg";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextHeader from "./TextHeader";
const avatar = require("@/assets/icons/avatar.png");

export default function CustomDrawerContent(props) {
  const router = useRouter();

  const closeDrawer = () => {
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View className="flex-1 p-6 pt-10">
        {/* Profile Section */}
        <View className="mb-8">
          <Image
            source={avatar}
            className="w-[50px] h-[50px] rounded-full mb-4"
          />
          <TextHeader
            content="John Doe"
            textStyles="text-[#13E0A0] text-[18px]"
          />
        </View>

        {/* Menu Items */}
        <View className="gap-4 mb-8">
          <TouchableOpacity
            className="flex-row justify-start items-center gap-2 py-3"
            onPress={closeDrawer}
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
            onPress={closeDrawer}
          >
            <CommunityIcon width={16} height={16} />
            <TextHeader
              content="Communities"
              textStyles="text-white text-[16px]"
              customLineHeight={20}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-start items-center gap-2 py-3"
            onPress={closeDrawer}
          >
            <CartIcon width={16} height={16} />
            <TextHeader
              content="Cart"
              textStyles="text-white text-[16px]"
              customLineHeight={20}
            />
          </TouchableOpacity>
        </View>

        <View className="gap-2">
          <TouchableOpacity
            className="flex-row justify-start items-center gap-2 py-3"
            onPress={closeDrawer}
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
            onPress={closeDrawer}
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
            onPress={closeDrawer}
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
            onPress={closeDrawer}
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
    </DrawerContentScrollView>
  );
}
