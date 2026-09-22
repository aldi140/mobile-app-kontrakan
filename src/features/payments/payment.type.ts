export type PaymentStatus = "paid" | "unpaid";

export interface CreatePaymentParams {
  rental_contract_id: number | string;
  payment_date: string;
  period_start: string;
  period_end: string;
  amount: number;
  notes?: string;
}
