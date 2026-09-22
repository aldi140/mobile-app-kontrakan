import { axiosInstance } from "@/lib/axiosInstance";
import { EndContractPayload } from "../contract.types";

export const endContract = async (
  contract_id: number,
  payload: EndContractPayload,
) => {
  console.log(contract_id);
  console.log(payload);

  const { data } = await axiosInstance.patch(
    `/rental-contracts/${contract_id}/end-contract`,
    payload,
  );
  return data;
};
