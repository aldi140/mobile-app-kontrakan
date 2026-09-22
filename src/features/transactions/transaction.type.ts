export type TransactionType = "all" | "income" | "expense";

export const transactionTypeLabel: Record<TransactionType, string> = {
  all: "Semua",
  income: "Pemasukan",
  expense: "Pengeluaran",
};

export interface GetTransactionsParams {
  search?: string;
  type?: "all" | "income" | "expense";
  start_date?: string;
  end_date?: string;
  load?: number;
  page?: number;
}
