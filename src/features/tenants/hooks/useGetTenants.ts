import { useInfiniteQuery } from "@tanstack/react-query";
import { getTenants } from "../api/getTenants";
import { GetTenantsParams } from "../tenant.type";

export const useGetTenants = (params: GetTenantsParams) => {
    return useInfiniteQuery({
        queryKey: ["tenants", params],
        queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
            getTenants({
                ...params,
                page: Number(pageParam),
                load: 5
            }),
        initialPageParam: 1,
        getNextPageParam: (lastPage: any) => {
            if (lastPage.meta.current_page < lastPage.meta.last_page) {
                return lastPage.meta.current_page + 1;
            }

            return undefined;
        }
    });
}