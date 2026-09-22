import { axiosInstance } from "@/lib/axiosInstance";
import { GetRoomsParams } from "../room.types";

export const getRooms = async (params?: GetRoomsParams) => {
  // console.log("params", params);

  const { data } = await axiosInstance.get("/rooms", {
    params,
  });
  return data;
};
