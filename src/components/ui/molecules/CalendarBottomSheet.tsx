import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

import { colors } from "@/constants/color";
import { forwardRef, useCallback } from "react";
import { View } from "react-native";
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
    >
      <View style={{ padding: 16 }}>
        <Text size="lg" weight="semibold">
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
