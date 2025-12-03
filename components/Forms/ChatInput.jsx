import SendIcon from "@/assets/icons/send.svg";
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChatInput = ({
  value,
  onChangeText,
  onSend,
  loading,
  placeholder = "Write a comment...",
}) => {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-[#F2F2F2] px-6 py-4">
      <View className="flex-row items-center gap-3">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#ADADAD"
          className="flex-1 bg-[#F9FAFB] rounded-[8px] px-4 py-3 text-[14px]"
          style={{ fontFamily: "Abeatbykai" }}
          editable={!loading}
        />
        <TouchableOpacity
          onPress={onSend}
          disabled={loading || !value?.trim()}
          className={`w-[40px] h-[40px] rounded-full justify-center items-center ${
            loading || !value?.trim() ? "bg-[#ADADAD]" : "bg-[#13E0A0]"
          }`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#000E3A" />
          ) : (
            <SendIcon width={20} height={20} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatInput;
