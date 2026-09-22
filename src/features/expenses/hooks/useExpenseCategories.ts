import { useQuery } from "@tanstack/react-query";
import { getExpenseCategories } from "../api/getExpenseCategories";

export const useExpenseCategories = () => {
  return useQuery({
    queryKey: ["expense-categories"],
    queryFn: getExpenseCategories,
    staleTime: 5 * 60 * 1000,
  });
};
