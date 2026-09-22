import { useQuery } from "@tanstack/react-query";
import { getFinances } from "../api/getFinance";

export const useFinance = (period: string) => {
  return useQuery({
    queryKey: ["finance", period],
    queryFn: () => getFinances(period),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
