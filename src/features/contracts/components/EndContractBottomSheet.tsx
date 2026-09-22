import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { TextInput } from "@/components/ui/atoms/TextInput";
import { AppBottomSheet } from "@/components/ui/molecules/AppBottomSheet";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import { colors } from "@/constants/color";
import { Room } from "@/features/rooms/room.types";
import { formatDate } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useFormik } from "formik";
import { forwardRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEndContract } from "../hooks/useEndContract";

interface CreateContractBottomSheetProps {
  selectedRoom: Room | null;
  onClose: () => void;
  onDismiss: () => void;
}

export const EndContractBottomSheet = forwardRef<
  BottomSheetModal,
  CreateContractBottomSheetProps
>(({ selectedRoom, onClose, onDismiss }, ref) => {
  const {
    mutateAsync: endContract,
    isPending,
    isError,
    error,
    reset,
    isSuccess,
  } = useEndContract();

  const formik = useFormik({
    initialValues: {
      notes: "",
    },
    enableReinitialize: true,

    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      try {
        await endContract({
          contract_id: selectedRoom?.rental_contract?.id || 0,
          payload: { ...values },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleDismiss = () => {
    formik.resetForm();
    onDismiss();
    reset();
  };

  return (
    <AppBottomSheet
      ref={ref}
      snapPoints={["75%"]}
      onDismiss={handleDismiss}
      //   footer={

      //   }
    >
      <View style={styles.sheetContent}>
        {isSuccess ? (
          <SuccessScreen
            title="Pemberhentian Kontrak "
            description="Kontrak kamar telah berakhir. Kamar ini sekarang tersedia untuk disewakan."
            onClose={onClose}
          />
        ) : (
          <BottomSheetScrollView
            contentContainerStyle={{
              padding: 16,
            }}
          >
            {selectedRoom && (
              <View style={{ gap: 24 }}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: 32,
                  }}
                >
                  <Image
                    source={require("@/assets/images/confirm-illustration.png")}
                    style={{
                      width: 200,
                      height: 200,
                    }}
                  />
                  <Text variant="neutral" size="lg" weight="bold">
                    Pemberhentian Kontrak
                  </Text>

                  <Text
                    variant="neutral"
                    size="sm"
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Apakah Anda yakin ingin mengakhiri masa kontrak kamar{" "}
                    {selectedRoom?.name}?
                  </Text>

                  <View
                    style={{
                      marginTop: 16,
                      flexDirection: "column",
                      gap: 16,
                      width: "100%",
                    }}
                  >
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
                        <Ionicons
                          name="bed"
                          size={24}
                          color={colors.primary[600]}
                        />
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
                    <TextInput
                      placeholder="Masukkan alasan pemberhentian kontrak..."
                      multiline
                      numberOfLines={4}
                      textAlignVertical="top"
                      label="Alasan"
                      optional={true}
                      value={formik.values.notes}
                      onChangeText={formik.handleChange("notes")}
                      onBlur={formik.handleBlur("notes")}
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
              </View>
            )}
          </BottomSheetScrollView>
        )}
        {!isSuccess && (
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
              title="Ya, akhiri"
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
  );
});

EndContractBottomSheet.displayName = "EndContractBottomSheet";

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    position: "relative",
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
