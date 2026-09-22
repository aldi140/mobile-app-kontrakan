import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../api/createExpense";
import { CreateExpensePayload } from "../expense.type";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateExpensePayload) => createExpense(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
