import { colors } from "@/constants/color";
import { ReactNode, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TabItem {
  label: string;
  value: string;
  content: ReactNode;
  count?: number;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const Tabs = ({ items, defaultValue, onChange }: TabsProps) => {
  const [active, setActive] = useState(defaultValue ?? items[0]?.value);
  const handlePress = (value: string) => {
    setActive(value);
    onChange?.(value);
  };

  // const activeContent = items.find((item) => item.value === active)?.content;
  // console.log(activeContent);

  return (
    <View>
      {/* Tab header */}
      <View style={styles.container}>
        {items.map((item) => {
          const isActive = active === item.value;
          return (
            <Pressable
              key={item.value}
              onPress={() => handlePress(item.value)}
              style={[styles.tab, isActive && styles.tabActive]}
            >
              <Text style={[styles.text, isActive && styles.textActive]}>
                {item.label}
              </Text>
              <Text style={[styles.text, isActive && styles.countTextActive]}>
                {item.count !== undefined && item.count > 0 && ` ${item.count}`}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Tab content */}
      {/* <View style={{ flex: 1 }}>{activeContent}</View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    flexDirection: "row",
    // backgroundColor: colors.backgroundLight,
    borderRadius: 10,
    gap: 8,
  },

  tab: {
    flexDirection: "row",
    gap: 4,
    minWidth: 52,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 100,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  tabActive: {
    backgroundColor: colors.primary[700],
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },

  text: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: colors.mutedForeground,
  },

  textActive: {
    color: colors.white,
    fontFamily: "Poppins_600SemiBold",
  },

  countTextActive: {
    color: colors.white,
    opacity: 0.9,
  },
});
