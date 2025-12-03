import { AuthProvider } from "@/contexts/AuthContext";
import {
  clearBadgeCount,
  registerForPushNotificationsAsync,
  savePushToken,
  setupNotificationListeners,
} from "@/lib/pushNotificationService";
import toastConfig from "@/utils/toastConfig";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const notificationListener = useRef();
  const responseListener = useRef();

  const [loaded] = useFonts({
    Abeatbykai: require("../assets/fonts/AbeatbyKai.ttf"),
    CodecCodeBold: require("../assets/fonts/Codec-Cold-Bold-trial.ttf"),
    Inter: require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        savePushToken(token);
      }
    });

    // Setup notification listeners
    const listeners = setupNotificationListeners(
      // On notification received while app is open
      (notification) => {
        console.log("Notification received in foreground:", notification);
        // Optionally show an in-app notification banner
      },
      // On notification tapped
      (response) => {
        const data = response.notification.request.content.data;

        // Clear badge when notification is tapped
        clearBadgeCount();

        // Navigate based on notification type
        if (data.type === "chat_message" && data.chat_id) {
          router.push(`/chat/${data.chat_id}`);
        } else if (data.type === "post_comment" && data.post_id) {
          router.push(`/post/singlePost?id=${data.post_id}`);
        } else if (data.type === "product_sold" && data.product_id) {
          router.push(`/product/${data.product_id}`);
        } else {
          router.push("/(notifications)/all");
        }
      }
    );

    return () => {
      listeners.remove();
    };
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </AuthProvider>
        <StatusBar style="dark" />
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
}
