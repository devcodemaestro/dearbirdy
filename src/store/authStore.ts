import { create } from "zustand";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,

  setAuth: (accessToken, refreshToken) => set({ accessToken, refreshToken }),

  logout: () => {
    localStorage.removeItem("onboardingComplete");
    set({ accessToken: null, refreshToken: null });
  },
}));
