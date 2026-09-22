import { useMutation, useQueryClient } from "@tanstack/react-query";
import { endContract } from "../api/endContract";
import { EndContractPayload } from "../contract.types";

interface EndContractVariables {
  contract_id: number;
  payload: EndContractPayload;
}

export const useEndContract = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["endContract"],
    mutationFn: ({ contract_id, payload }: EndContractVariables) =>
      endContract(contract_id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contracts"] });
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};
