import { axiosInstance } from "@/lib/axiosInstance";
import { Contract } from "../contract.types";

export const getContractDetail = async (id: number): Promise<Contract> => {
  const { data } = await axiosInstance.get(`/contracts/${id}`);
  return data;
};
