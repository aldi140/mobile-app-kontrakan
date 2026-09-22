import { useInfiniteQuery } from "@tanstack/react-query";
import { getTransactions } from "../api/getTransactions";
import { GetTransactionsParams } from "../transaction.type";

export const useTransactions = (params: GetTransactionsParams) => {
  return useInfiniteQuery({
    queryKey: ["transactions", params],

    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      getTransactions({
        ...params,
        page: Number(pageParam),
        load: 5,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage: any) => {
      if (lastPage.meta.current_page < lastPage.meta.last_page) {
        return lastPage.meta.current_page + 1;
      }

      return undefined;
    },
  });
};
