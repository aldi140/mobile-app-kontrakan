import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { TextInput } from "@/components/ui/atoms/TextInput";
import { Header } from "@/components/ui/Header";
import { CalendarBottomSheet } from "@/components/ui/molecules/CalendarBottomSheet";
import { InputGroup } from "@/components/ui/molecules/InputGroup";
import { LoadingOverlay } from "@/components/ui/molecules/LoadingOverlay";
import { SuccessScreen } from "@/components/ui/SuccessScreen";
import { colors } from "@/constants/color";
import { useCreateExpense } from "@/features/expenses/hooks/useCreateExpense";
import { useExpenseCategories } from "@/features/expenses/hooks/useExpenseCategories";
import { formatDate } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

const expenseSchema = Yup.object({
  expense_category_id: Yup.string().required("Kategori wajib dipilih"),
  amount: Yup.string().required("Nominal wajib diisi"),
  expense_date: Yup.string().required("Tanggal wajib dipilih"),
  description: Yup.string(),
});

const SkeletonBadgeCategory = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity]);

  return (
    <Animated.View
      style={{
        width: 90,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.border,
        opacity,
      }}
    />
  );
};

export default function CreateExpenseScreen() {
  const { data: categories, isLoading } = useExpenseCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const calendarRef = useRef<BottomSheetModal>(null);

  const {
    mutateAsync: createExpense,
    isPending,
    error,
    reset,
    isSuccess,
  } = useCreateExpense();

  const handleOpenCalendar = () => {
    calendarRef.current?.present();
  };
  const handleCloseCalendar = () => {
    calendarRef.current?.dismiss();
  };

  const formik = useFormik({
    initialValues: {
      expense_category_id: "",
      amount: "",
      expense_date: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        await createExpense(values);
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: error,
          position: "bottom",
        });
      }
    },
    validationSchema: expenseSchema,
  });
  return (
    <>
      {isSuccess ? (
        <SuccessScreen
          title="Pengeluaran berhasil dibuat"
          description="Pengeluaran sudah berhasil dibuat, Cek kembali di halaman keuangan"
          onClose={() => {
            reset();
            router.replace("/finances");
          }}
        />
      ) : (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
          <Header title="Tambah Pengeluaran" showBack />
          <View
            style={{ flex: 1, padding: 16, flexDirection: "column", gap: 16 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text variant="neutral" size="md" weight="bold">
                Pilih Kategori Pengeluaran
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Toast.show({
                    type: "success",
                    text1: "Kategori berhasil ditambahkan",
                    position: "bottom",
                  });
                }}
              >
                <Text style={{ color: colors.primary[600] }}>+ Kategori</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              {isLoading ? (
                <>
                  <SkeletonBadgeCategory />
                  <SkeletonBadgeCategory />
                  <SkeletonBadgeCategory />
                  <SkeletonBadgeCategory />
                </>
              ) : (
                categories?.data?.map((item: any, index: number) => (
                  <Pressable
                    key={index}
                    style={[
                      styles.badge,
                      selectedCategory === item.id && styles.badgeActive,
                    ]}
                    onPress={() => {
                      setSelectedCategory(item.id);
                      formik.setFieldValue("expense_category_id", item.id);
                    }}
                  >
                    <Text
                      style={[
                        selectedCategory === item.id && styles.badgeActiveText,
                        { fontSize: 14, fontWeight: "600" },
                      ]}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                ))
              )}
              {formik.errors.expense_category_id &&
                formik.touched.expense_category_id && (
                  <Text variant="danger" size="xs">
                    {formik.errors.expense_category_id}
                  </Text>
                )}
            </View>

            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text variant="foreground" size="sm" weight="semibold">
                Nominal Transaksi
              </Text>
              <InputGroup
                prefix="Rp"
                placeholder="0"
                keyboardType="numeric"
                value={formik.values.amount}
                onChangeText={(val) => {
                  const numericValue = val.replace(/[^0-9]/g, "");
                  formik.setFieldValue("amount", numericValue);
                }}
              />
              {formik.errors.amount && formik.touched.amount && (
                <Text variant="danger" size="xs">
                  {formik.errors.amount}
                </Text>
              )}
            </View>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text variant="foreground" size="sm" weight="semibold">
                Tanggal Transaksi
              </Text>
              <Pressable
                onPress={handleOpenCalendar}
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 10,
                  backgroundColor: colors.white,
                  width: "100%",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: colors.foreground }}>
                  {formik.values.expense_date
                    ? formatDate(formik.values.expense_date, "short")
                    : "Pilih Tanggal"}
                </Text>
                <Ionicons name="calendar" size={20} color={colors.foreground} />
              </Pressable>
              {formik.errors.expense_date && formik.touched.expense_date && (
                <Text variant="danger" size="xs">
                  {formik.errors.expense_date}
                </Text>
              )}
            </View>
            <View style={{ gap: 4 }}>
              <Text variant="foreground" size="sm" weight="semibold">
                Keterangan Tambahan (optional)
              </Text>
              <TextInput
                placeholder="Contoh: bayar air"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                style={{
                  minHeight: 120,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 12,
                  padding: 12,
                }}
                value={formik.values.description}
                onChangeText={(val) => formik.setFieldValue("description", val)}
              />
            </View>
            <Button
              title="Simpan"
              size="lg"
              variant="primaryGradient"
              onPress={formik.handleSubmit}
            />
          </View>
          {isPending && <LoadingOverlay />}

          <CalendarBottomSheet
            ref={calendarRef}
            value={formik.values.expense_date}
            onSelectDate={(date) => {
              formik.setFieldValue("expense_date", date);
              handleCloseCalendar();
            }}
          />
        </SafeAreaView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badgeActive: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[400],
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderWidth: 2,
  },
  badgeActiveText: {
    color: colors.primary[600],
    fontSize: 14,
  },
});
