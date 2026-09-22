import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { AppBottomSheet } from "@/components/ui/molecules/AppBottomSheet";
import { colors } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { forwardRef } from "react";
import { Pressable, View } from "react-native";

interface CreateTransactionSheetProps {
  onIncomePress: () => void;
  onExpensePress: () => void;
  onClose: () => void;
}

export const CreateTransactionSheet = forwardRef<
  BottomSheetModal,
  CreateTransactionSheetProps
>(({ onIncomePress, onExpensePress, onClose }, ref) => {
  return (
    <AppBottomSheet ref={ref} snapPoints={["45%"]}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <Text variant="neutral" size="lg" weight="semibold">
          Jenis Transaksi
        </Text>
        <Text variant="muted" size="sm" weight="regular">
          Tentukan pencatatan buku kas Kontrakan Hj Wiwi
        </Text>
      </View>
      <View style={{ padding: 16, flexDirection: "column", flex: 1, gap: 16 }}>
        <Pressable
          onPress={onIncomePress}
          style={{
            backgroundColor: colors.success[50],
            borderWidth: 1,
            borderColor: colors.success[200],
            borderRadius: 12,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: 16,
            padding: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.success[100],
                justifyContent: "center",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <Ionicons
                name="trending-up"
                size={24}
                color={colors.success[600]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="neutral" weight="semibold">
                Pemasukan
              </Text>
              <Text
                variant="mutedForeground"
                size="sm"
                style={{
                  flexShrink: 1,
                }}
              >
                Catat uang masuk dari penyewa atau pengontrak
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={colors.secondary[400]}
          />
        </Pressable>
        <Pressable
          style={{
            backgroundColor: colors.error[50],
            borderWidth: 1,
            borderColor: colors.error[200],
            borderRadius: 12,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            gap: 16,
            padding: 16,
          }}
          onPress={onExpensePress}
        >
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              alignItems: "center",
              flex: 1,
            }}
          >
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.error[100],
                justifyContent: "center",
                borderRadius: 12,
                padding: 16,
              }}
            >
              <Ionicons
                name="trending-down"
                size={24}
                color={colors.error[600]}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="neutral" weight="semibold">
                Pengeluaran
              </Text>
              <Text
                variant="mutedForeground"
                size="sm"
                style={{
                  flexShrink: 1,
                }}
              >
                Catat biaya operasional atau perawatan
              </Text>
            </View>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color={colors.secondary[400]}
          />
        </Pressable>
        <Button title="Batal" size="lg" variant="outline" onPress={onClose} />
      </View>
    </AppBottomSheet>
  );
});
