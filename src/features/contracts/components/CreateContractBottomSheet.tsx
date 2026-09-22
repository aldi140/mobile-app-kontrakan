import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { TextInput } from "@/components/ui/atoms/TextInput";
import { AppBottomSheet } from "@/components/ui/molecules/AppBottomSheet";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import { colors } from "@/constants/color";
import { Room } from "@/features/rooms/room.types";
import { formatDate, formatDateInput, formatRupiah } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useFormik } from "formik";
import { forwardRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useCreateContract } from "../hooks/useCreateContract";
import { createContractSchema } from "../schemas/contract.schema";

interface CreateContractBottomSheetProps {
  selectedRoom: Room | null;
  onClose: () => void;
  onDismiss: () => void;
}

export const CreateContractBottomSheet = forwardRef<
  BottomSheetModal,
  CreateContractBottomSheetProps
>(({ selectedRoom, onClose, onDismiss }, ref) => {
  const today = formatDateInput(new Date());

  const {
    mutateAsync: createContract,
    isPending,
    isError,
    error,
    reset,
    isSuccess,
  } = useCreateContract();

  const formik = useFormik({
    initialValues: {
      room_id: selectedRoom?.id || 0,
      start_date: today,
      monthly_price: selectedRoom?.monthly_price || 0,
      tenant_name: "",
      tenant_email: "",
      tenant_phone: "",
    },
    enableReinitialize: true,

    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: true,

    validationSchema: createContractSchema,
    onSubmit: async (values) => {
      try {
        await createContract(values);
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
      snapPoints={["100%"]}
      onDismiss={handleDismiss}
      showHandle={false}
    >
      <View style={styles.sheetContent}>
        {isSuccess ? (
          <SuccessScreen
            title="Kontrak berhasil dibuat"
            description="Data kontrak telah tersimpan dan kamar kini tercatat sebagai terisi."
            onClose={onClose}
          />
        ) : (
          <BottomSheetScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 70,
              position: "relative",
            }}
          >
            {selectedRoom && (
              <View style={{ gap: 24 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text variant="neutral" size="lg" weight="bold">
                    Buat Kontrak
                  </Text>
                  <TouchableOpacity onPress={onClose}>
                    <Ionicons
                      name="close-outline"
                      size={30}
                      color={colors.mutedForeground}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    gap: 16,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    padding: 12,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                        borderRadius: 16,
                        backgroundColor: colors.primary[50],
                      }}
                    >
                      <Ionicons
                        name="bed"
                        size={20}
                        color={colors.primary[600]}
                      />
                    </View>
                    <View>
                      <Text variant="neutral" size="sm" weight="bold">
                        {selectedRoom.room_number}
                      </Text>
                      <Text variant="neutral" size="md">
                        {selectedRoom.name}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text variant="neutral" size="lg" weight="bold">
                      {formatRupiah(selectedRoom.monthly_price)}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text variant="neutral" size="sm" weight="medium">
                    Tanggal Sewa
                  </Text>
                  <Text variant="neutral" size="md" weight="bold">
                    {formatDate(today, "long")}
                  </Text>
                </View>

                <View style={{ gap: 16 }}>
                  <TextInput
                    label="Nama Penyewa"
                    placeholder="Masukkan nama penyewa"
                    onChangeText={(value) =>
                      formik.setFieldValue("tenant_name", value)
                    }
                    value={formik.values.tenant_name}
                    error={
                      formik.touched.tenant_name
                        ? formik.errors.tenant_name
                        : undefined
                    }
                  />
                  <TextInput
                    label="Email"
                    placeholder="Masukkan email penyewa"
                    onChangeText={(value) =>
                      formik.setFieldValue("tenant_email", value)
                    }
                    value={formik.values.tenant_email}
                    error={
                      formik.touched.tenant_email
                        ? formik.errors.tenant_email
                        : undefined
                    }
                    keyboardType="email-address"
                  />
                  <TextInput
                    label="No. Telepon"
                    placeholder="Masukkan nomor telepon penyewa"
                    onChangeText={(value) =>
                      formik.setFieldValue("tenant_phone", value)
                    }
                    value={formik.values.tenant_phone}
                    error={
                      formik.touched.tenant_phone
                        ? formik.errors.tenant_phone
                        : undefined
                    }
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            )}
          </BottomSheetScrollView>
        )}

        {!isSuccess && (
          <View
            style={{
              position: "absolute",
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
              title="simpan"
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

CreateContractBottomSheet.displayName = "CreateContractBottomSheet";

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
