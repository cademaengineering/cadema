import NotificationCard from "@/components/Reusables/NotificationCard";
import { getUnreadNotifications } from "@/lib/notificationService";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Unread = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getUnreadNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  if (loading) {
    return (
      <View className="flex-1 bg-[#F9FAFB] justify-center items-center">
        <ActivityIndicator size="large" color="#000E3A" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#F9FAFB] px-4 pt-28">
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <NotificationCard notification={item} onRead={loadNotifications} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-3" />}
        contentContainerStyle={{ paddingBottom: 24 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#000E3A"]}
          />
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-[#999999] text-[16px]">
              No unread notifications
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default Unread;
