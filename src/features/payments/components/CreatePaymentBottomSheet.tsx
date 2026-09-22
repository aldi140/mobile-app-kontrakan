import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { TextInput } from "@/components/ui/atoms/TextInput";
import { AppBottomSheet } from "@/components/ui/molecules/AppBottomSheet";
import { colors } from "@/constants/color";
import { Room } from "@/features/rooms/room.types";
import { formatDate, formatRupiah } from "@/utils/format";

import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";

import { CalendarBottomSheet } from "@/components/ui/molecules/CalendarBottomSheet";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import { useFormik } from "formik";
import { forwardRef, useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { useCreatePayment } from "../hooks/useCreatePayment";

import * as Yup from "yup";

interface CreatePaymentBottomSheetProps {
  selectedRoom: Room | null;
  onClose: () => void;
  onDismiss: () => void;
}

const getNextPeriod = (year: number, month: number, billingDay: number) => {
  const nextMonth = new Date(year, month, 1);
  const lastDayOfNextMonth = new Date(
    nextMonth.getFullYear(),
    nextMonth.getMonth() + 1,
    0,
  ).getDate();

  const day = Math.min(billingDay, lastDayOfNextMonth);

  return `${nextMonth.getFullYear()}-${String(
    nextMonth.getMonth() + 1,
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

export const CreatePaymentBottomSheet = forwardRef<
  BottomSheetModal,
  CreatePaymentBottomSheetProps
>(({ selectedRoom, onClose, onDismiss }, ref) => {
  // console.log(selectedRoom);
  const calendarRef = useRef<BottomSheetModal>(null);
  const [dateField, setDateField] = useState<
    "period_start" | "period_end" | null
  >(null);

  const handleOpenCalendar = (field: "period_start" | "period_end") => {
    setDateField(field);
    calendarRef.current?.present();
  };
  const handleCloseCalendar = () => {
    calendarRef.current?.dismiss();
  };

  const {
    mutateAsync: createPayment,
    isPending,
    isSuccess: isSuccessCreatePayment,
    reset,
  } = useCreatePayment();

  const [billingDate, setBillingDate] = useState(new Date());
  // const [showPicker, setShowPicker] = useState(false);
  const now = new Date();
  const formatToday = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // console.log(start_period);
  // console.log(next_period);
  const formik = useFormik({
    initialValues: {
      rental_contract_id: selectedRoom?.rental_contract?.id ?? 0,
      payment_date: formatToday(now),
      period_start: "",
      period_end: "",
      amount: selectedRoom?.monthly_price ?? 0,
      notes: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await createPayment(values);
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: Yup.object({
      period_start: Yup.string().required("Tanggal Awal harus diisi"),
      period_end: Yup.string().required("Tanggal Akhir harus diisi"),
    }),
  });

  const handleDismiss = () => {
    formik.resetForm();
    onDismiss();
    reset();
  };

  return (
    <>
      <AppBottomSheet ref={ref} snapPoints={["75%"]} onDismiss={handleDismiss}>
        <View style={styles.container}>
          {isSuccessCreatePayment ? (
            <SuccessScreen
              title="Pembayaran berhasil"
              description="Data pembayaran telah tersimpan."
              onClose={onClose}
            />
          ) : (
            <BottomSheetScrollView
              contentContainerStyle={{
                padding: 16,
                gap: 16,
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  paddingBottom: 16,
                }}
              >
                <Text size="lg" weight="semibold">
                  Pilih Periode Tagihan
                </Text>
                <Text size="sm" weight="regular" variant="muted">
                  Lanjutkan pembayaran sewa untuk periode tagihan
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: 16,
                  borderRadius: 16,
                  backgroundColor: colors.primary[50],
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 16,
                  }}
                >
                  <Ionicons name="bed" size={24} color={colors.primary[600]} />
                  <View>
                    <Text variant="neutral" size="sm" weight="bold">
                      {selectedRoom?.room_number}
                    </Text>
                    <Text variant="neutral" size="md">
                      {selectedRoom?.name}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Text variant="neutral" size="sm" weight="semibold">
                    Tgl. Masuk
                  </Text>
                  <Text variant="neutral" size="md">
                    {formatDate(
                      selectedRoom?.rental_contract?.start_date,
                      "short",
                    )}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Text variant="neutral" size="sm" weight="semibold">
                    Penyewa
                  </Text>
                  <Text
                    variant="neutral"
                    size="md"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      maxWidth: 100,
                    }}
                  >
                    {selectedRoom?.rental_contract?.tenant?.name}
                  </Text>
                </View>
              </View>

              <View style={{ gap: 16 }}>
                <View style={{ gap: 4 }}>
                  <Text size="sm" weight="medium">
                    Periode Tagihan
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    {/* START DATE */}
                    <View style={{ gap: 4, flex: 1 }}>
                      <Pressable
                        onPress={() => handleOpenCalendar("period_start")}
                        style={styles.dateInput}
                      >
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color={colors.mutedForeground}
                        />

                        {formik.values.period_start ? (
                          <Text variant="neutral" size="sm">
                            {formatDate(formik.values.period_start, "short")}
                          </Text>
                        ) : (
                          <Text variant="neutral" size="sm">
                            Pilih Tanggal
                          </Text>
                        )}
                      </Pressable>

                      {formik.errors.period_start &&
                        formik.touched.period_start && (
                          <Text variant="danger" size="sm">
                            {formik.errors.period_start}
                          </Text>
                        )}
                    </View>

                    {/* SAMPAI */}
                    <View
                      style={{
                        height: 48,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text variant="neutral" size="xs">
                        sampai
                      </Text>
                    </View>

                    {/* END DATE */}
                    <View style={{ gap: 4, flex: 1 }}>
                      <Pressable
                        onPress={() => handleOpenCalendar("period_end")}
                        style={styles.dateInput}
                      >
                        <Ionicons
                          name="calendar-outline"
                          size={20}
                          color={colors.mutedForeground}
                        />

                        {formik.values.period_end ? (
                          <Text variant="neutral" size="sm">
                            {formatDate(formik.values.period_end, "short")}
                          </Text>
                        ) : (
                          <Text variant="neutral" size="sm">
                            Pilih Tanggal
                          </Text>
                        )}
                      </Pressable>

                      {formik.errors.period_end &&
                        formik.touched.period_end && (
                          <Text variant="danger" size="sm">
                            {formik.errors.period_end}
                          </Text>
                        )}
                    </View>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    // justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  {/* <View style={{ gap: 4, flex: 1 }}>
                    <Text size="sm" variant="mutedForeground" weight="regular">
                      Jatuh Tempo
                    </Text>
                    <Text size="md" variant="foreground" weight="medium">
                      Setiap tanggal {Number(billingDay)}
                    </Text>
                  </View> */}
                  <View style={{ gap: 4, flex: 1 }}>
                    <Text size="sm" variant="mutedForeground" weight="regular">
                      Tagihan Bulanan
                    </Text>
                    <Text size="lg" variant="primary" weight="semibold">
                      {formatRupiah(selectedRoom?.monthly_price || 0)}
                    </Text>
                  </View>
                </View>
                <View style={{ gap: 4 }}>
                  <Text size="sm" weight="regular">
                    Keterangan Tambahan (optional)
                  </Text>
                  <TextInput
                    placeholder="contoh: bayar bulan september, dll"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    // value={formik.values.notes}
                    // onChangeText={formik.handleChange("notes")}
                    // onBlur={formik.handleBlur("notes")}
                    style={{
                      minHeight: 120,
                      borderWidth: 1,
                      borderColor: "#ddd",
                      borderRadius: 12,
                      padding: 12,
                    }}
                  />
                </View>
              </View>
            </BottomSheetScrollView>
          )}
          {!isSuccessCreatePayment && (
            <View
              style={{
                position: "absolute",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                bottom: 40,
                width: "100%",
                paddingHorizontal: 16,
                paddingTop: 24,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                backgroundColor: colors.white,
              }}
            >
              <Button
                title="Tutup"
                variant="outline"
                onPress={onClose}
                style={{
                  flex: 1,
                }}
              />
              <Button
                title="Simpan"
                variant="primaryGradient"
                onPress={() => formik.handleSubmit()}
                style={{
                  flex: 1,
                }}
              />
            </View>
          )}

          {isPending && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={colors.primary[600]} />
            </View>
          )}
        </View>
      </AppBottomSheet>
      <CalendarBottomSheet
        ref={calendarRef}
        value={
          dateField === "period_start"
            ? formik.values.period_start
            : dateField === "period_end"
              ? formik.values.period_end
              : ""
        }
        minDate={
          dateField === "period_end" ? formik.values.period_start : undefined
        }
        onDismiss={() => {
          setDateField(null);
        }}
        onSelectDate={(date) => {
          if (!dateField) return;

          formik.setFieldValue(dateField, date);

          handleCloseCalendar();
        }}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    gap: 16,
    flex: 1,
    position: "relative",
  },

  dateInput: {
    minHeight: 48,
    maxHeight: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 32,
    zIndex: 10,
  },
});
