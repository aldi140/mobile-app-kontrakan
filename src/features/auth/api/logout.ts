import { axiosInstance } from "@/lib/axiosInstance";

export const logout = async (): Promise<any> => {
  const { data } = await axiosInstance.post("/logout");
  return data;
};
