import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { TextInput } from "@/components/ui/atoms/TextInput";
import { ErrorModal } from "@/components/ui/ErrorModal";
import { Header } from "@/components/ui/Header";
import { CalendarBottomSheet } from "@/components/ui/molecules/CalendarBottomSheet";
import { LoadingOverlay } from "@/components/ui/molecules/LoadingOverlay";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import { colors } from "@/constants/color";
import { useCreatePayment } from "@/features/payments/hooks/useCreatePayment";
import { useRooms } from "@/features/rooms/hooks/useRooms";
import { Room } from "@/features/rooms/room.types";
import { useErrorModal } from "@/hooks/useErrorModal";
import { AppError } from "@/lib/AppError";
import { formatDate, formatRupiah } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

export default function CreateIncomeScreen() {
  const { data: rooms, isLoading } = useRooms({
    status: "terisi",
  });

  const {
    mutateAsync: createPayment,
    isPending,
    isSuccess,
    error,
    reset,
  } = useCreatePayment();
  const errorModal = useErrorModal();

  const now = new Date();
  const formatToday = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

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

  const formik = useFormik({
    initialValues: {
      rental_contract_id: "",
      payment_date: formatToday(now),
      period_start: "",
      period_end: "",
      amount: 0,
      notes: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        console.log("payload", values);
        await createPayment(values);
      } catch (error: any) {
        if (error instanceof AppError) {
          errorModal.showError(error.message);
        } else {
          errorModal.showError("Terjadi kesalahan.");
        }
      }
    },
    validationSchema: Yup.object({
      rental_contract_id: Yup.number().required("Pilih Kamar Terlebih Dahulu"),
      period_start: Yup.string().required("Tanggal Awal harus diisi"),
      period_end: Yup.string().required("Tanggal Akhir harus diisi"),
      amount: Yup.number().required("Jumlah harus diisi"),
    }),
  });

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  return (
    <>
      {isSuccess ? (
        <SuccessScreen
          title="Pemasukan berhasil dibuat"
          description="Pemasukan sudah berhasil dibuat, Cek kembali di halaman keuangan"
          onClose={() => {
            reset();
            router.replace("/finances");
          }}
        />
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <Header title="Tambah Pemasukan" showBack />
          {isPending && <LoadingOverlay />}
          <View style={{ flex: 1, padding: 16, gap: 16 }}>
            <View style={{ gap: 16 }}>
              <View>
                <Text variant="foreground" size="md" weight="semibold">
                  Pilih Kamar
                </Text>

                <Text variant="mutedForeground" size="sm">
                  Pilih kamar untuk mencatat pemasukan
                </Text>
              </View>
              <View style={styles.listRoom}>
                {rooms?.data?.map((room: Room) => (
                  <Pressable
                    key={room.id}
                    style={({ pressed }) => [
                      styles.card,
                      pressed && styles.cardPressed,
                      selectedRoom?.id === room.id && {
                        borderColor: colors.primary[700],
                        backgroundColor: colors.primary[50],
                      },
                    ]}
                    onPress={() => {
                      setSelectedRoom(room);
                      formik.setFieldValue(
                        "rental_contract_id",
                        room.rental_contract?.id,
                      );
                      formik.setFieldValue("amount", room.monthly_price);
                    }}
                  >
                    <View style={styles.cardContent}>
                      <View
                        style={{
                          ...styles.boxIcon,
                          backgroundColor:
                            selectedRoom?.id === room.id
                              ? colors.primary[600]
                              : colors.neutral[100],
                        }}
                      >
                        <Ionicons
                          name="bed-outline"
                          size={22}
                          color={
                            selectedRoom?.id === room.id
                              ? colors.primary[100]
                              : colors.mutedForeground
                          }
                        />
                      </View>

                      <View style={styles.roomInfo}>
                        <Text
                          variant="foreground"
                          size="sm"
                          weight="semibold"
                          numberOfLines={1}
                        >
                          {room.room_number}
                        </Text>

                        <Text
                          variant="mutedForeground"
                          size="sm"
                          numberOfLines={1}
                        >
                          {room.rental_contract?.tenant?.name ?? "-"}
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                ))}
              </View>
              {formik.errors.rental_contract_id &&
                formik.touched.rental_contract_id && (
                  <Text variant="danger" size="sm">
                    {formik.errors.rental_contract_id}
                  </Text>
                )}
            </View>

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
                    s/d
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

                  {formik.errors.period_end && formik.touched.period_end && (
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

            {/* {selectedRoom && (
            <View style={styles.formContainer}>
              <Text variant="foreground" size="md" weight="semibold">
                Detail Sewa Kamar {selectedRoom.room_number}
              </Text>
              <Text variant="mutedForeground" size="sm">
                Lengkapi form di bawah untuk mencatat pemasukan
              </Text>
            </View>
          )} */}

            <Button
              variant="primaryGradient"
              title="Simpan"
              size="lg"
              onPress={formik.handleSubmit}
              // disabled={formik.values.period_start === "" || formik.values.period_end === "" || !selectedRoom}
            />
          </View>
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
              dateField === "period_end"
                ? formik.values.period_start
                : undefined
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
        </SafeAreaView>
      )}
      <ErrorModal
        visible={errorModal.visible}
        message={errorModal.message}
        onClose={errorModal.hideError}
      />
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  listRoom: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },

  card: {
    width: "48%",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },

  cardPressed: {
    opacity: 0.7,
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  boxIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral[100],
  },

  roomInfo: {
    flex: 1,
    gap: 2,
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
});
