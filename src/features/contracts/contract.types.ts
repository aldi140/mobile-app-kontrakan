export interface Tenant {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Contract {
  id: number;
  room_id: number;
  start_date: string;
  end_date?: string;
  status?: "active" | "ended";
  tenant?: Tenant;
}

export interface CreateContractPayload {
  room_id: number;
  tenant_name: string;
  tenant_email: string;
  tenant_phone: string;
  start_date: string;
  monthly_price: number;
}

export interface EndContractPayload {
  end_date?: string;
  notes?: string;
}
