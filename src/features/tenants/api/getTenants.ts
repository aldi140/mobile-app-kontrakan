import { axiosInstance } from "@/lib/axiosInstance";
import { GetTenantsParams } from "../tenant.type";

export const getTenants = async (params: GetTenantsParams) => {
    const { data } = await axiosInstance.get("/tenants", {
        params,
    });
    return data;
};