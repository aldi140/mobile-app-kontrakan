import { axiosInstance } from "@/lib/axiosInstance";
import { LoginPayload, LoginResponse } from "../auth.types";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post("/login", payload);
    console.log("login API success response:", data);
    return data;
  } catch (error: any) {
    console.log(
      "login API error response:",
      error?.response?.data || error.message,
    );
    throw error;
  }
};
