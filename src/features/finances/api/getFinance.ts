import { axiosInstance } from "@/lib/axiosInstance";

export const getFinances = async (period: string) => {
  const [year, month] = period.split("-");

  const { data } = await axiosInstance.get("/finance", {
    params: {
      month: Number(month),
      year: Number(year),
    },
  });

  return data;
};
