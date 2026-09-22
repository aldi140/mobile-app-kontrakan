import { axiosInstance } from "@/lib/axiosInstance";
import { UserResponse } from "../auth.types";

export const getMe = async (): Promise<UserResponse> => {
  const { data } = await axiosInstance.get("/me");
  return data;
};
