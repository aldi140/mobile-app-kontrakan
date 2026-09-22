import { axiosInstance } from "@/lib/axiosInstance";
import { Contract, CreateContractPayload } from "../contract.types";

export const createContract = async (
  payload: CreateContractPayload,
): Promise<Contract> => {
  const { data } = await axiosInstance.post("/rental-contracts", payload);
  return data;
};
