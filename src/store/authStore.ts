"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,

      setAuth: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      logout: () => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("userData"); // ✅ 세션스토리지에서 직접 삭제
          localStorage.removeItem("onboardingComplete");
        }
        set({ accessToken: null, refreshToken: null });
      },
    }),
    {
      name: "token", // 스토리지에 저장될 키 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용
    }
  )
);
