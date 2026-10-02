import { axiosInstance } from "@/lib/axiosInstance";

export const getDashboard = async () => {
  const { data } = await axiosInstance.get("/dashboard");
  return data;
};
