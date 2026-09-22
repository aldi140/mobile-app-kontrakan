import { getMe } from "../api/getMe";
import { useAuthStore } from "../authStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetMe = () => {
  const setUser = useAuthStore((state) => state.setUser);

  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
    }
    if (query.isError) {
      setUser(null);
    }
  }, [query.data, query.isError]);

  return query;
};
