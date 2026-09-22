import { Text } from "@/components/ui/atoms/Text";
import { colors } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export const FinancePeriodFilter = () => {
  const options = [
    { label: "Bulan Ini", value: "this_month" },
    { label: "Bulan Lalu", value: "last_month" },
    { label: "3 Bulan Terakhir", value: "last_3_months" },
    { label: "Kustom", value: "custom" },
  ];

  const [active, setActive] = useState("this_month");
  const handleChange = (value: string) => {
    setActive(value);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Ionicons name="calendar-sharp" size={20} color={colors.primary[600]} />
        <Text variant="muted" size="md" weight="medium">
          Periode :
        </Text>
      </View>

      <View style={styles.grid}>
        {options.map((item) => {
          const isActive = active === item.value;

          return (
            <Pressable
              key={item.value}
              onPress={() => handleChange(item.value)}
              style={[styles.item, isActive && styles.itemActive]}
            >
              <Text
                size="xs"
                numberOfLines={1}
                style={isActive && { color: colors.white }}
                weight="semibold"
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  item: {
    width: "31.5%",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 6,
    backgroundColor: colors.backgroundLight,
    alignItems: "center",
    justifyContent: "center",
  },

  itemActive: {
    backgroundColor: colors.primary[700],
  },
});
