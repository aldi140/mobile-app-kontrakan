import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/molecules/Card";
import { colors } from "@/constants/color";
import { paymentStatusLabel } from "@/features/payments/payment.constants";
import { formatDate, formatRupiah } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Room } from "../room.types";
import { RoomStatusBadge } from "./RoomStatusBadge";

interface RoomCardProps {
  room: Room;
  onCreateContract?: (room: Room) => void;
  onDeleteContract?: (room: Room) => void;
  onCreatePayment?: (room: Room) => void;
}

interface ContentCardAvailableProps {
  onCreateContract?: () => void;
}

const ContentCardOccupied = ({
  room,
  onDeleteContract,
  onCreatePayment,
}: {
  room: Room;
  onDeleteContract?: (room: Room) => void;
  onCreatePayment?: (room: Room) => void;
}) => {
  return (
    <View
      style={{
        flexDirection: "column",
        gap: 24,
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text size="sm" variant="muted" weight="medium">
            Penyewa
          </Text>
          <Text variant="neutral" size="md" weight="bold">
            {room.rental_contract?.tenant?.name ?? "-"}
          </Text>
        </View>
        <View>
          <Text size="sm" variant="muted" weight="medium">
            Tgl. Masuk
          </Text>
          <Text variant="neutral" size="md" weight="semibold">
            {formatDate(room.rental_contract?.start_date, "short")}
          </Text>
        </View>
        <View>
          <Text size="sm" variant="muted" weight="medium">
            Tarif Bulanan
          </Text>
          <Text variant="neutral" size="md" weight="bold">
            {formatRupiah(room.monthly_price)}
          </Text>
        </View>
      </View>
      <View>
        <View>
          <Text size="sm" variant="muted" weight="medium">
            Status Pembayaran
          </Text>
          <Text variant="neutral" size="md" weight="bold">
            {paymentStatusLabel[room.rental_contract?.payment_status]}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 14,
        }}
      >
        <Button
          title="Bayar Tagihan"
          variant="success"
          size="md"
          onPress={() => onCreatePayment?.(room)}
          icon="receipt-outline"
          style={{ flex: 1 }}
        />
        <Button
          title="Akhiri Kontrak"
          variant="outline"
          size="md"
          style={{ flex: 1 }}
          onPress={() => onDeleteContract?.(room)}
          icon="log-out-outline"
        />
      </View>
    </View>
  );
};

const ContentCardAvailable = ({
  onCreateContract,
}: ContentCardAvailableProps) => {
  return (
    <View style={styles.contentAvailable}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          gap: 20,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            gap: 6,
            width: "100%",
          }}
        >
          <Ionicons
            name="bed-outline"
            size={24}
            color={colors.secondary[500]}
          />
          <Text variant="muted" size="sm" weight="regular">
            Kamar tersedia dan siap disewakan
          </Text>
        </View>
        <Button
          title="Buat Kontrak"
          variant="primaryGradient"
          size="md"
          icon="add"
          onPress={onCreateContract}
          style={{ width: "100%" }}
        />
      </View>
    </View>
  );
};

export const RoomCard = ({
  room,
  onCreateContract,
  onDeleteContract,
  onCreatePayment,
}: RoomCardProps) => {
  return (
    <Card style={[styles.card, { marginBottom: 16 }]}>
      <CardHeader style={styles.cardHeader}>
        <View style={styles.headerInfoContainer}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="bed-outline"
              size={20}
              color={colors.primary[500]}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              gap: 2,
            }}
          >
            <CardTitle style={styles.cardTitle}>{room.room_number}</CardTitle>
            <CardDescription style={styles.cardDescrition}>
              Token PLN Mandiri & K.Mandi
            </CardDescription>
          </View>
        </View>
        <RoomStatusBadge status={room.status} />
      </CardHeader>
      <CardContent style={styles.cardContent}>
        {room.status === "terisi" ? (
          <ContentCardOccupied
            room={room}
            onDeleteContract={() => onDeleteContract?.(room)}
            onCreatePayment={() => onCreatePayment?.(room)}
          />
        ) : (
          <ContentCardAvailable
            onCreateContract={() => onCreateContract?.(room)}
          />
        )}
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    width: "100%",
  },
  cardHeader: {
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  headerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardDescrition: {
    fontSize: 12,
    fontWeight: "normal",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    justifyContent: "space-between",
    gap: 24,
  },
  contentAvailable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 16,
    justifyContent: "center",
    width: "100%",
  },
  iconContainer: {
    backgroundColor: colors.primary[50],
    padding: 8,
    borderRadius: 6,
  },
  infoContainer: {
    flexDirection: "column",
    gap: 2,
  },
});
