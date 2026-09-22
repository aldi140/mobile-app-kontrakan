import { PaymentStatus } from "../payments/payment.type";

export type RoomStatus = "terisi" | "tersedia";
export interface GetRoomsParams {
  search?: string;
  status?: RoomStatus;
}

export interface Room {
  id: number;
  room_number: string;
  name: string;
  monthly_price: number;
  status: RoomStatus;
  rental_contract: {
    id: number;
    start_date: string;
    status: string;
    payment_status: PaymentStatus;
    tenant: {
      name: string;
    };
  };
}
