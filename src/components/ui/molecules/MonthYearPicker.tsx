import { useMemo, useRef, useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, View } from "react-native";

import { Text } from "@/components/ui/atoms/Text";

interface MonthYearPickerProps {
  visible: boolean;
  value?: Date;
  minYear?: number;
  maxYear?: number;
  onClose: () => void;
  onConfirm: (date: Date) => void;
}

const ITEM_HEIGHT = 44;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

export const MonthYearPicker = ({
  visible,
  value = new Date(),
  minYear = 2020,
  maxYear = 2035,
  onClose,
  onConfirm,
}: MonthYearPickerProps) => {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(value.getMonth());
  const [selectedYear, setSelectedYear] = useState(value.getFullYear());

  const currentMonth = now.getMonth(); // 0 - 11
  const currentYear = now.getFullYear();

  const monthRef = useRef<FlatList>(null);
  const yearRef = useRef<FlatList>(null);

  const availableMonths = useMemo(() => {
    return months
      .map((label, index) => ({
        label,
        value: index,
      }))
      .filter((month) => {
        if (selectedYear === currentYear) {
          return month.value <= currentMonth;
        }

        return true;
      });
  }, [selectedYear, currentYear]);

  const years = useMemo(
    () =>
      Array.from(
        { length: maxYear - minYear + 1 },
        (_, index) => minYear + index,
      ),
    [minYear, maxYear],
  );

  const yearIndex = Math.max(
    0,
    years.findIndex((year) => year === selectedYear),
  );

  const handleConfirm = () => {
    const date = new Date(selectedYear, selectedMonth, 1);

    onConfirm(date);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container} onPress={() => {}}>
          {/* Wheel */}
          <View style={styles.wheelContainer}>
            {/* Selected Indicator */}
            <View style={styles.selectedIndicator} />

            {/* Month */}
            <FlatList
              ref={monthRef}
              data={availableMonths}
              keyExtractor={(item) => item.value.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              initialScrollIndex={Math.min(
                selectedMonth,
                availableMonths.length - 1,
              )}
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              contentContainerStyle={styles.listContent}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.y / ITEM_HEIGHT,
                );

                const month = availableMonths[index];

                if (month) {
                  setSelectedMonth(month.value);
                }
              }}
              renderItem={({ item, index }) => (
                <Pressable
                  style={styles.item}
                  onPress={() => {
                    setSelectedMonth(item.value);

                    monthRef.current?.scrollToIndex({
                      index,
                      animated: true,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.itemText,
                      item.value === selectedMonth && styles.selectedItemText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />

            {/* Year */}
            <FlatList
              ref={yearRef}
              data={years}
              keyExtractor={(item) => item.toString()}
              showsVerticalScrollIndicator={false}
              snapToInterval={ITEM_HEIGHT}
              decelerationRate="fast"
              initialScrollIndex={yearIndex}
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              contentContainerStyle={styles.listContent}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.y / ITEM_HEIGHT,
                );

                setSelectedYear(years[index]);
              }}
              renderItem={({ item, index }) => (
                <Pressable
                  style={styles.item}
                  onPress={() => {
                    setSelectedYear(item);

                    yearRef.current?.scrollToIndex({
                      index,
                      animated: true,
                    });
                  }}
                >
                  <Text
                    style={[
                      styles.itemText,
                      item === selectedYear && styles.selectedItemText,
                    ]}
                  >
                    {item}
                  </Text>
                </Pressable>
              )}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Pressable onPress={onClose} hitSlop={10}>
              <Text style={styles.buttonText}>BATAL</Text>
            </Pressable>

            <Pressable onPress={handleConfirm} hitSlop={10}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  container: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingTop: 20,
    overflow: "hidden",
  },

  wheelContainer: {
    height: ITEM_HEIGHT * 3,
    flexDirection: "row",
    position: "relative",
    paddingHorizontal: 20,
  },

  listContent: {
    paddingVertical: ITEM_HEIGHT,
  },

  selectedIndicator: {
    position: "absolute",
    top: ITEM_HEIGHT,
    left: 20,
    right: 20,
    height: ITEM_HEIGHT,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
  },

  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },

  itemText: {
    fontSize: 16,
    color: "#B0B0B0",
  },

  selectedItemText: {
    color: "#222222",
    fontWeight: "500",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 28,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },
});
