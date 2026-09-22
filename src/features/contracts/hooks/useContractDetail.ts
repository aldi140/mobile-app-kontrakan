import { useQuery } from "@tanstack/react-query";
import { getContractDetail } from "../api/getContractDetail";

export const useContractDetail = (id: number) => {
  return useQuery({
    queryKey: ["contracts", id],
    queryFn: () => getContractDetail(id),
    enabled: Boolean(id),
  });
};
