import { colors } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.active,
        tabBarInactiveTintColor: colors.inactive,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rooms"
        options={{
          title: "Kamar",
          tabBarIcon: ({ color }) => (
            <Ionicons name="bed-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finances"
        options={{
          title: "Keuangan",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contracts"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
