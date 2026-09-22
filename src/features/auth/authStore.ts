import { create } from "zustand";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user: UserType | null) => set({ user }),
  clearUser: () => set({ user: null }),
}));
