import { axiosInstance } from "@/lib/axiosInstance";

export const getExpenseCategories = async () => {
  const { data } = await axiosInstance.get("/expense-categories");
  return data;
};
