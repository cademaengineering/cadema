import { joinCommunity, leaveCommunity } from "@/lib/supabaseServices";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const CommunityCard = ({ community, onRefresh }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggleJoin = async () => {
    setLoading(true);
    try {
      if (isJoined) {
        await leaveCommunity(community.id);
        setIsJoined(false);
        Alert.alert("Success", "You left the community");
      } else {
        await joinCommunity(community.id);
        setIsJoined(true);
        Alert.alert("Success", "You joined the community!");
      }
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Toggle join error:", error);
      Alert.alert("Error", error.message || "Failed to update membership");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View className="flex-row justify-between items-center p-5 bg-white border border-[#F2F2F2] rounded-[12px]">
        <View className="flex-row justify-start items-center gap-4">
          <Image
            source={{
              uri:
                community.imageUrl ||
                "https://res.cloudinary.com/dtxr92piy/image/upload/v1761860766/use_i5jqsi.png",
            }}
            width={32}
            height={32}
            className="rounded-full"
          />
          <View>
            <TextHeader
              content={community.name}
              textStyles="text-[#030303] text-[14px]"
              customLineHeight="20"
            />
            <TextContainer
              content={`${community.members.toLocaleString()} members`}
              textStyles="text-[#ADADAD] text-[12px]"
            />
          </View>
        </View>
        <TouchableOpacity
          className={`${
            isJoined ? "bg-[#F2F2F2]" : "bg-[#13E0A0]"
          } justify-center items-center rounded-[8px] h-[35px] px-6`}
          onPress={handleToggleJoin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000E3A" />
          ) : (
            <TextHeader
              content={isJoined ? "Joined" : "Add"}
              customLineHeight="20"
              textStyles={`${
                isJoined ? "text-[#ADADAD]" : "text-[#000E3A]"
              } text-[14px]`}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommunityCard;
