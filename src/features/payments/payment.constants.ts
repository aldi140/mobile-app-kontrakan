import { PaymentStatus } from "./payment.type";

export const paymentStatusLabel: Record<PaymentStatus, string> = {
  paid: "Sudah Bayar",
  unpaid: "Belum Bayar",
};
