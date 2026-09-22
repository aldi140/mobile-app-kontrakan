export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}
