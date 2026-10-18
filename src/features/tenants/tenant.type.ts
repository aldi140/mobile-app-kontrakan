export interface Tenant {
    id: number;
    name: string;
    phone: string;
    email: string;
    created_at: string;
}

export interface GetTenantsParams {
    search?: string;
    page?: number;
    load?: number;
}