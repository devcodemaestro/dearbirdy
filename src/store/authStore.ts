"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null; // ✅ 추가됨
  setAuth: (accessToken: string, refreshToken: string) => void;
  updateAccessToken: (newAccessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null, // ✅ 초기값 추가

      // ✅ 로그인 시 액세스 토큰 & 리프레시 토큰 저장
      setAuth: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      // ✅ 액세스 토큰 갱신 (리프레시 토큰은 유지)
      updateAccessToken: (newAccessToken) =>
        set((state) => ({
          accessToken: newAccessToken,
          refreshToken: state.refreshToken,
        })),

      // ✅ 로그아웃 (온보딩 기록 유지)
      logout: () => {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("userData"); // ✅ 세션스토리지 삭제
          localStorage.removeItem("token"); // ✅ 토큰 삭제 (쿠키 기반 변경)
        }
        set({ accessToken: null, refreshToken: null });
      },
    }),
    {
      name: "token", // ✅ sessionStorage에 저장
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
