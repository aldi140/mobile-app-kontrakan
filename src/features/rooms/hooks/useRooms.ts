import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../api/getRooms";
import { GetRoomsParams } from "../room.types";

export const useRooms = (params?: GetRoomsParams) => {
  return useQuery({
    queryKey: ["rooms", params],
    queryFn: () => getRooms(params),
    placeholderData: (previousData) => {
      if (!previousData) return undefined;

      return {
        ...previousData,

        // summary pakai request sebelumnya
        summary: previousData.summary,

        // card jangan pakai data sebelumnya
        data: [],
      };
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
