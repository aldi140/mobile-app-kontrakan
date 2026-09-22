import { axiosInstance } from "@/lib/axiosInstance";
import { Contract } from "../contract.types";

export const getContracts = async (): Promise<Contract[]> => {
  const { data } = await axiosInstance.get("/contracts");
  return data;
};
