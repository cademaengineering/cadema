import BreakboardIcon from "@/assets/icons/breakboard.svg";
import HomeActiveIcon from "@/assets/icons/home-active.svg";
import HomeIcon from "@/assets/icons/home.svg";
import LearnIcon from "@/assets/icons/learn.svg";
import LifestyleIcon from "@/assets/icons/lifestyle.svg";
import ShopActiveIcon from "@/assets/icons/shop-active.svg";
import ShopIcon from "@/assets/icons/shop.svg";
import { Tabs, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";

const TabsLayout = () => {
  const router = useRouter();

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#13E0A0",
          tabBarInactiveTintColor: "#9C9C9D",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#000E3A",
            borderTopWidth: 1,
            borderTopColor: "#E5E5E5",
            height: 100,
            paddingBottom: 10,
            paddingTop: 20,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Abeatbykai",
            marginTop: 8, // Increase space between icon and label
          },
          tabBarIconStyle: {
            marginBottom: 1, // Additional spacing for icons
          },
        }}
      >
        <Tabs.Screen
          name="community"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <HomeActiveIcon
                  width={28}
                  height={28}
                  fill="#13E0A0"
                  stroke="none"
                  strokeWidth={0}
                />
              ) : (
                <HomeIcon
                  width={28}
                  height={28}
                  fill=""
                  stroke="none"
                  strokeWidth={0}
                />
              ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: "Shop",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ShopActiveIcon
                  width={24}
                  height={24}
                  fill="#13E0A0"
                  stroke="none"
                />
              ) : (
                <ShopIcon width={24} height={24} fill="" stroke="none" />
              ),
          }}
        />
        <Tabs.Screen
          name="learn"
          options={{
            title: "Learn",
            tabBarIcon: ({ color, focused }) => (
              <LearnIcon
                width={24}
                height={24}
                fill={focused ? "#13E0A0" : ""}
                stroke="none"
              />
            ),
            tabBarButton: (props) => (
              <View {...props}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.replace("/(learning)/courses")}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LearnIcon width={24} height={24} stroke="none" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Abeatbykai",
                      color: props.accessibilityState?.selected
                        ? "#13E0A0"
                        : "#9C9C9D",
                      marginTop: 12,
                    }}
                  >
                    Learn
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="breakboard"
          options={{
            title: "Breakboard",
            tabBarIcon: ({ color, focused }) => (
              <BreakboardIcon
                width={24}
                height={24}
                fill={focused ? "#13E0A0" : ""}
                stroke="none"
              />
            ),
            tabBarButton: (props) => (
              <View {...props}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.replace("/(breakboard)/scholarship")}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BreakboardIcon width={24} height={24} stroke="none" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Abeatbykai",
                      color: props.accessibilityState?.selected
                        ? "#13E0A0"
                        : "#9C9C9D",
                      marginTop: 12,
                    }}
                  >
                    Breakboard
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="lifestyle"
          options={{
            title: "Lifestyle",
            tabBarIcon: ({ color, focused }) => (
              <LifestyleIcon
                width={24}
                height={24}
                fill={focused ? "#13E0A0" : ""}
                stroke="none"
              />
            ),
            tabBarButton: (props) => (
              <View {...props}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.replace("/(lifestyle)/roommates")}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LifestyleIcon width={24} height={24} stroke="none" />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: "Abeatbykai",
                      color: props.accessibilityState?.selected
                        ? "#13E0A0"
                        : "#9C9C9D",
                      marginTop: 12,
                    }}
                  >
                    Lifestyle
                  </Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
