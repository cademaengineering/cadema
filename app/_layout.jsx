import toastConfig from "@/utils/toastConfig";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import "../global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Abeatbykai: require("../assets/fonts/AbeatbyKai.ttf"),
    CodecCodeBold: require("../assets/fonts/Codec-Cold-Bold-trial.ttf"),
    Inter: require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="dark" />
      </GestureHandlerRootView>
      <Toast config={toastConfig} />
    </>
  );
}
