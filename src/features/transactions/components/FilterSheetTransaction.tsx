import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { AppBottomSheet } from "@/components/ui/molecules/AppBottomSheet";
import { CalendarBottomSheet } from "@/components/ui/molecules/CalendarBottomSheet";
import { colors } from "@/constants/color";
import { formatDate } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useRef, useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";

export interface TransactionFilter {
  type?: "all" | "income" | "expense";
  start_date?: string;
  end_date?: string;
}

interface FilterSheetTransactionProps {
  onClose: () => void;

  // kirim filter ke parent
  onApply: (filter: TransactionFilter) => void;

  // filter yang sedang aktif di parent
  value?: TransactionFilter;
}

const transactionTypeOptions: {
  label: string;
  value: TransactionFilter["type"];
}[] = [
  // {
  //   label: "Semua",
  //   value: "all",
  // },
  {
    label: "Pemasukan",
    value: "income",
  },
  {
    label: "Pengeluaran",
    value: "expense",
  },
];

const defaultFilter: TransactionFilter = {};

export const FilterSheetTransaction = forwardRef<
  BottomSheetModal,
  FilterSheetTransactionProps
>(({ onClose, onApply, value = defaultFilter }, ref) => {
  const [transactionType, setTransactionType] = useState<
    TransactionFilter["type"]
  >(value.type);

  const [startDate, setStartDate] = useState(value.start_date);
  const [endDate, setEndDate] = useState(value.end_date);

  const [dateField, setDateField] = useState<"start_date" | "end_date" | null>(
    null,
  );

  const calendarRef = useRef<BottomSheetModal>(null);

  // useEffect(() => {
  //   setTransactionType(value.type);
  //   setStartDate(value.start_date);
  //   setEndDate(value.end_date);
  // }, [value]);

  const handleOpenCalendar = useCallback((field: "start_date" | "end_date") => {
    setDateField(field);

    calendarRef.current?.present();
  }, []);

  const handleCloseCalendar = useCallback(() => {
    calendarRef.current?.dismiss();
  }, []);

  const handleApplyFilter = () => {
    const filterData: TransactionFilter = {
      ...(transactionType && {
        type: transactionType,
      }),

      ...(startDate && {
        start_date: startDate,
      }),

      ...(endDate && {
        end_date: endDate,
      }),
    };

    // console.log(filterData);

    onApply(filterData);
    onClose();
  };

  const handleResetFilter = () => {
    setTransactionType("all");
    setStartDate("");
    setEndDate("");

    onApply(defaultFilter);

    onClose();
  };

  return (
    <>
      <AppBottomSheet ref={ref} snapPoints={["100%"]} showHandle={false}>
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <View style={{ gap: 4, flex: 1 }}>
              <Text variant="white" size="lg" weight="medium">
                Filter
              </Text>

              <Text variant="white" size="sm" weight="regular">
                Tentukan filter untuk menampilkan transaksi
              </Text>
            </View>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-outline" size={30} color={colors.white} />
            </TouchableOpacity>
          </View>

          {/* CONTENT */}
          <View style={styles.content}>
            {/* TIPE TRANSAKSI */}
            <View style={styles.section}>
              <Text variant="foreground" size="md" weight="semibold">
                Tipe Transaksi
              </Text>

              <View style={styles.transactionTypeContainer}>
                {transactionTypeOptions.map((item) => {
                  const isActive = transactionType === item.value;

                  return (
                    <Pressable
                      key={item.value}
                      style={[
                        styles.transactionTypeButton,
                        isActive && styles.transactionTypeButtonActive,
                      ]}
                      onPress={() => {
                        setTransactionType(item.value);
                      }}
                    >
                      <Text
                        variant={isActive ? "primary" : "neutral"}
                        size="sm"
                        weight={isActive ? "semibold" : "regular"}
                      >
                        {item.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* PERIODE */}
            <View style={styles.section}>
              <Text variant="foreground" size="md" weight="semibold">
                Periode Transaksi
              </Text>

              <View style={styles.dateContainer}>
                {/* START DATE */}
                <View style={{ flex: 1 }}>
                  <Pressable
                    onPress={() => handleOpenCalendar("start_date")}
                    style={styles.dateInput}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={colors.mutedForeground}
                    />

                    {startDate ? (
                      <Text variant="neutral" size="sm">
                        {formatDate(startDate, "short")}
                      </Text>
                    ) : (
                      <Text variant="neutral" size="sm">
                        Pilih Tanggal
                      </Text>
                    )}
                  </Pressable>
                </View>

                {/* SAMPAI */}
                <View style={styles.dateSeparator}>
                  <Text variant="neutral" size="xs">
                    s/d
                  </Text>
                </View>

                {/* END DATE */}
                <View style={{ flex: 1 }}>
                  <Pressable
                    onPress={() => handleOpenCalendar("end_date")}
                    style={styles.dateInput}
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={colors.mutedForeground}
                    />

                    {endDate ? (
                      <Text variant="neutral" size="sm">
                        {formatDate(endDate, "short")}
                      </Text>
                    ) : (
                      <Text variant="neutral" size="sm">
                        Pilih Tanggal
                      </Text>
                    )}
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
          {/* ACTION */}
          <View style={styles.action}>
            <Button
              title="Reset"
              variant="outline"
              onPress={handleResetFilter}
              style={{ flex: 1 }}
            />

            <Button
              title="Terapkan Filter"
              onPress={handleApplyFilter}
              style={{ flex: 1 }}
              variant="primary"
            />
          </View>
        </View>
      </AppBottomSheet>

      {/* CALENDAR */}
      <CalendarBottomSheet
        ref={calendarRef}
        value={
          dateField === "start_date"
            ? startDate
            : dateField === "end_date"
              ? endDate
              : ""
        }
        minDate={dateField === "end_date" && startDate ? startDate : undefined}
        onDismiss={() => {
          setDateField(null);
        }}
        onSelectDate={(date) => {
          if (!dateField) return;

          if (dateField === "start_date") {
            setStartDate(date);

            /**
             * Kalau user mengganti start date
             * dan start date lebih besar dari end date,
             * reset end date.
             */
            if (endDate && date > endDate) {
              setEndDate("");
            }
          }

          if (dateField === "end_date") {
            setEndDate(date);
          }

          handleCloseCalendar();
        }}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 24,

    borderBottomWidth: 1,
    borderBottomColor: colors.border,

    backgroundColor: colors.primary[700],
  },

  content: {
    padding: 16,
    gap: 24,
  },

  section: {
    gap: 12,
  },

  transactionTypeContainer: {
    flexDirection: "row",
    gap: 8,
  },

  transactionTypeButton: {
    flex: 1,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingVertical: 10,
    paddingHorizontal: 8,

    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,

    backgroundColor: colors.background,
  },

  transactionTypeButtonActive: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },

  dateContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  dateInput: {
    height: 48,

    paddingHorizontal: 12,

    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,

    gap: 8,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.background,
  },

  dateSeparator: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  action: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    gap: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
