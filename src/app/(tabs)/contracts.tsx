import { Text } from "@/components/ui/atoms/Text";
import { Header } from "@/components/ui/Header";
import { colors } from "@/constants/color";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContractsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Contracts" description="Daftar Kontrak Sewa" />
      <View style={{ flex: 1, padding: 16 }}>
        <Text variant="neutral" size="md">
          Halaman Manajemen Kontrak
        </Text>
      </View>
    </SafeAreaView>
  );
}
