import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContract } from "../api/createContract";

export const useCreateContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createContract,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
