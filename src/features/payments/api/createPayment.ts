import { axiosInstance } from "@/lib/axiosInstance";
import { CreatePaymentParams } from "../payment.type";

export const createPayment = async (payload: CreatePaymentParams) => {
  const response = await axiosInstance.post("/payment", payload);
  // console.log(response);
  return response;
};
