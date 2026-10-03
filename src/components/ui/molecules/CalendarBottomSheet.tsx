import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

import { colors } from "@/constants/color";
import { forwardRef, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { Text } from "../atoms/Text";

interface CalendarBottomSheetProps {
  onDismiss?: () => void;
  onClose?: () => void;
  onSelectDate: (date: string) => void;
  minDate?: string;
  value?: string;
}

export const CalendarBottomSheet = forwardRef<
  BottomSheetModal,
  CalendarBottomSheetProps
>(({ onDismiss, onSelectDate, minDate, value }, ref) => {
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.25}
        pressBehavior="close"
      />
    ),
    [],
  );

  const handleSelectDate = (day: DateData) => {
    onSelectDate(day.dateString);
  };

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={["50%"]}
      stackBehavior="push"
      enablePanDownToClose
      enableDismissOnClose
      enableDynamicSizing={false}
      backdropComponent={renderBackdrop}
      onDismiss={onDismiss}
      handleIndicatorStyle={styles.indicator}
      style={styles.sheet}

    >
      <View style={{ paddingHorizontal: 16 }}>
        <Text size="sm" weight="semibold">
          Pilih Tanggal
        </Text>

        <Calendar
          minDate={minDate}
          onDayPress={handleSelectDate}
          markedDates={
            value
              ? {
                [value]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedColor: colors.primary[600],
                },
              }
              : {}
          }
        />
      </View>
    </BottomSheetModal>
  );
});


const styles = StyleSheet.create({
  sheet: {
    elevation: 24,
  },
  background: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  indicator: {
    width: 40,
    height: 3,
    borderRadius: 10,
    backgroundColor: "#bdbdbdff",
  },

});