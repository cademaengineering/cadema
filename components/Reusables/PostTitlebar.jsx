import BackIcon from "@/assets/icons/arrow-back.svg";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const PostTitlebar = ({ action, title, onPost, loading }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadUser();
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

  const getInitials = (name) => {
    if (!name) return "U";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row justify-start items-center gap-4">
        <TouchableOpacity activeOpacity={0.7} onPress={() => router.back()}>
          <BackIcon width={28} height={28} />
        </TouchableOpacity>

        {user?.avatar_url ? (
          <Image
            source={{ uri: user.avatar_url }}
            width={36}
            height={36}
            className="rounded-full"
          />
        ) : (
          <View className="w-[36px] h-[36px] rounded-full bg-[#000E3A] justify-center items-center">
            <Text className="text-[#13E0A0] text-[14px] font-bold">
              {getInitials(user?.full_name)}
            </Text>
          </View>
        )}

        <TextContainer
          content={title}
          textStyles="text-[12px] text-[#999999]"
        />
      </View>
      <View className="">
        {action ? (
          <TouchableOpacity
            activeOpacity={0.7}
            className={`rounded-full px-4 py-2 ${
              loading ? "bg-[#ADADAD]" : "bg-[#000E3A]"
            }`}
            onPress={onPost}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#13E0A0" />
            ) : (
              <TextHeader
                content="Post"
                customLineHeight={20}
                textStyles="text-[14px] text-[#13E0A0]"
              />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default PostTitlebar;
