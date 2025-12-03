import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { supabase } from "./supabase";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Register for push notifications and get token
 */
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#13E0A0",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return null;
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "1e3054f4-221e-4b77-aa69-5e322c49ebfa",
      })
    ).data;

    console.log("Push token:", token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  return token;
}

/**
 * Save push token to user's profile
 */
export async function savePushToken(token) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update({ push_token: token, push_enabled: true })
      .eq("id", user.id);

    if (error) throw error;
    console.log("Push token saved successfully");
  } catch (error) {
    console.error("Error saving push token:", error);
  }
}

/**
 * Remove push token from user's profile (for logout)
 */
export async function removePushToken() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ push_token: null, push_enabled: false })
      .eq("id", user.id);

    if (error) throw error;
  } catch (error) {
    console.error("Error removing push token:", error);
  }
}

/**
 * Send a push notification to a specific user
 */
export async function sendPushNotification({ userId, title, body, data = {} }) {
  try {
    // Get user's push token
    const { data: profile } = await supabase
      .from("profiles")
      .select("push_token, push_enabled")
      .eq("id", userId)
      .single();

    if (!profile?.push_token || !profile?.push_enabled) {
      console.log("User has no push token or push notifications disabled");
      return;
    }

    // Send via Expo Push Notification service
    const message = {
      to: profile.push_token,
      sound: "default",
      title,
      body,
      data,
      badge: 1,
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();
    console.log("Push notification sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
}

/**
 * Send push notifications to multiple users
 */
export async function sendBulkPushNotifications({
  userIds,
  title,
  body,
  data = {},
}) {
  try {
    // Get all push tokens for the users
    const { data: profiles } = await supabase
      .from("profiles")
      .select("push_token")
      .in("id", userIds)
      .eq("push_enabled", true)
      .not("push_token", "is", null);

    if (!profiles || profiles.length === 0) {
      console.log("No users with push notifications enabled");
      return;
    }

    const messages = profiles.map((profile) => ({
      to: profile.push_token,
      sound: "default",
      title,
      body,
      data,
      badge: 1,
    }));

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    const result = await response.json();
    console.log("Bulk push notifications sent:", result);
    return result;
  } catch (error) {
    console.error("Error sending bulk push notifications:", error);
  }
}

/**
 * Setup notification listeners
 */
export function setupNotificationListeners(
  onNotificationReceived,
  onNotificationTapped
) {
  // Handle notifications received while app is foregrounded
  const notificationListener = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log("Notification received:", notification);
      onNotificationReceived?.(notification);
    }
  );

  // Handle notification taps
  const responseListener =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification tapped:", response);
      onNotificationTapped?.(response);
    });

  return {
    notificationListener,
    responseListener,
    remove: () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    },
  };
}

/**
 * Clear badge count
 */
export async function clearBadgeCount() {
  await Notifications.setBadgeCountAsync(0);
}

/**
 * Get notification permissions status
 */
export async function getNotificationPermissions() {
  const { status } = await Notifications.getPermissionsAsync();
  return status;
}

/**
 * Toggle push notifications for current user
 */
export async function togglePushNotifications(enabled) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { error } = await supabase
      .from("profiles")
      .update({ push_enabled: enabled })
      .eq("id", user.id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error toggling push notifications:", error);
    return false;
  }
}
