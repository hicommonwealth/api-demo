import { create } from "zustand"

interface AuthState {
  address: string | null
  setAddress: (address: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  address: null,
  setAddress: (address: string) => set({ address }),
}))
