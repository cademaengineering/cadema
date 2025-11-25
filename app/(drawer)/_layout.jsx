import CustomDrawerContent from "@/components/Reusables/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#000E3A",
            width: 220,
          },
          drawerType: "slide",
          overlayColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
    </GestureHandlerRootView>
  );
}
