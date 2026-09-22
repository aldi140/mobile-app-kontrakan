import { Text } from "@/components/ui/atoms/Text";
import { Room } from "@/features/rooms/room.types";
import LottieView from "lottie-react-native";
import { View } from "react-native";

interface ContractSuccessProps {
  room: Room | null;
  loop: boolean;
}

export default function ContractSuccess({ room, loop }: ContractSuccessProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
      }}
    >
      <LottieView
        source={require("@/assets/animations/Done.json")}
        autoPlay
        loop={loop}
        style={{
          width: 350,
          height: 350,
        }}
      />

      <Text variant="neutral" size="xl" weight="bold">
        Kontrak Berhasil Dibuat
      </Text>

      <Text
        variant="muted"
        size="sm"
        style={{
          marginTop: 8,
          textAlign: "center",
        }}
      >
        Kontrak untuk kamar {room?.room_number} berhasil disimpan.
      </Text>
    </View>
  );
}
