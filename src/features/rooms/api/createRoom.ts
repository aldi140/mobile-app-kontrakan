import { axiosInstance } from "@/lib/axiosInstance";

export interface RoomApiItem {
  id: string;
  name: string;
  price: number;
  description: string;
  status: string;
  created_at: string;
}

export interface CreateRoomPayload {
  name: string;
  price: number;
  description: string;
}

export interface CreateRoomResponse {
  message: string;
  room: RoomApiItem;
}

export const createRoom = async (
  payload: CreateRoomPayload,
): Promise<CreateRoomResponse> => {
  const { data } = await axiosInstance.post("/rooms", payload);
  return data.data;
};
