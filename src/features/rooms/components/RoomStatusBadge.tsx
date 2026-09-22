import { Badge } from "@/components/ui/atoms/Badge";
import { RoomStatus } from "@/features/rooms/room.types";

export const RoomStatusBadge = ({ status }: { status: RoomStatus }) => {
  if (status === "tersedia") {
    return <Badge title="Tersedia" variant="success" icon="checkmark-circle" />;
  }
  return <Badge title="Terisi" variant="error" icon="people" />;
};
