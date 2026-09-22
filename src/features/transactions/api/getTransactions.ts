import { axiosInstance } from "@/lib/axiosInstance";
import { GetTransactionsParams } from "../transaction.type";

export const getTransactions = async (params: GetTransactionsParams) => {
  const response = await axiosInstance.get("/transactions", {
    params,
  });
  return response.data;
};
