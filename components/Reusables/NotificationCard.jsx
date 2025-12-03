import { markNotificationAsRead } from "@/lib/notificationService";
import { useRouter } from "expo-router";
import { Image, TouchableOpacity, View } from "react-native";
import TextContainer from "./TextContainer";
import TextHeader from "./TextHeader";

const notificationIcons = {
  account_created:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  product_created:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  product_sold:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  community_joined:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  post_comment:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  post_reaction:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  chat_message:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  connection_request:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  connection_accepted:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  course_enrolled:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  past_question_access:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  quiz_completed:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
  order_status:
    "https://res.cloudinary.com/dtxr92piy/image/upload/v1761919285/talenthub_bf9dqk.png",
};

const NotificationCard = ({ notification, onRead }) => {
  const router = useRouter();

  const handlePress = async () => {
    try {
      // Mark as read if unread
      if (!notification.read) {
        await markNotificationAsRead(notification.id);
        onRead?.();
      }

      // Navigate based on notification type
      const { type, data } = notification;
      switch (type) {
        case "product_created":
        case "product_sold":
          if (data?.product_id) {
            router.push(`/product/${data.product_id}`);
          }
          break;
        case "community_joined":
          if (data?.community_id) {
            router.push(`/communities/${data.community_id}`);
          }
          break;
        case "post_comment":
        case "post_reaction":
          if (data?.post_id) {
            router.push(`/post/singlePost?id=${data.post_id}`);
          }
          break;
        case "chat_message":
          if (data?.chat_id) {
            router.push(`/chat/${data.chat_id}`);
          }
          break;
        case "connection_request":
        case "connection_accepted":
          if (data?.requester_id || data?.accepter_id) {
            router.push(`/profile/${data.requester_id || data.accepter_id}`);
          }
          break;
        case "course_enrolled":
          if (data?.course_id) {
            router.push(`/courses/${data.course_id}`);
          }
          break;
        case "past_question_access":
          if (data?.question_id) {
            router.push(`/past-questions/${data.question_id}`);
          }
          break;
        case "quiz_completed":
          if (data?.quiz_id) {
            router.push(`/quiz/${data.quiz_id}`);
          }
          break;
        case "order_status":
          if (data?.order_id) {
            router.push(`/orders/${data.order_id}`);
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Error handling notification:", error);
    }
  };

  const formatTime = (timestamp) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffInMs = now - date;
      const diffInMins = Math.floor(diffInMs / 60000);
      const diffInHours = Math.floor(diffInMs / 3600000);
      const diffInDays = Math.floor(diffInMs / 86400000);

      if (diffInMins < 1) return "just now";
      if (diffInMins < 60) return `${diffInMins} min ago`;
      if (diffInHours < 24)
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
      if (diffInDays < 7)
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;

      return date.toLocaleDateString();
    } catch {
      return "recently";
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`w-full rounded-[8px] p-4 shadow-md mb-3 ${
        notification.read ? "bg-white" : "bg-[#13E0A00D]"
      }`}
      onPress={handlePress}
    >
      <View className="flex-row justify-start items-center gap-4">
        <Image
          source={{
            uri:
              notificationIcons[notification.type] ||
              notificationIcons.account_created,
          }}
          width={40}
          height={40}
          className="rounded-full"
        />
        <View className="flex-1">
          <TextHeader
            content={notification.title}
            textStyles="text-[#030303] text-[16px]"
            customLineHeight={20}
          />
          <TextContainer
            content={notification.message}
            textStyles="text-[#999999] text-[14px] mt-1"
          />
        </View>
        {!notification.read && (
          <View className="w-2 h-2 bg-[#13E0A0] rounded-full" />
        )}
      </View>
      <TextContainer
        content={formatTime(notification.created_at)}
        textStyles="text-[#030303] text-[10px] italic"
        viewStyles="flex-row justify-end mt-2"
      />
    </TouchableOpacity>
  );
};

export default NotificationCard;
