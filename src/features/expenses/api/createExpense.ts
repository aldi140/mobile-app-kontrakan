import { axiosInstance } from "@/lib/axiosInstance";
import { CreateExpensePayload } from "../expense.type";

export const createExpense = async (payload: CreateExpensePayload) => {
  const response = await axiosInstance.post("/expenses", payload);
  return response;
};
