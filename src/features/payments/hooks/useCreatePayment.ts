import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "../api/createPayment";
import { CreatePaymentParams } from "../payment.type";

export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePaymentParams) => createPayment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
      });
    },
  });
};
