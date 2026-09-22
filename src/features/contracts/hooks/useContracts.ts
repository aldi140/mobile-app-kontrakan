import { useQuery } from "@tanstack/react-query";
import { getContracts } from "../api/getContracts";

export const useContracts = () => {
  return useQuery({
    queryKey: ["contracts"],
    queryFn: getContracts,
    staleTime: 1000 * 60 * 5,
  });
};
