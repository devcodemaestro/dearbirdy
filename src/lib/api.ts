import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // HTTP Only 쿠키를 통한 인증을 고려
});

// ✅ 요청 인터셉터 - 모든 요청에 Access Token 추가
api.interceptors.request.use(
  (config) => {
    const accessToken = useAuthStore.getState().accessToken;
    if (accessToken) {
      config.headers.access = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ 응답 인터셉터 - 새 Access Token 갱신
api.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["access"];
    const refreshToken = useAuthStore.getState().refreshToken;

    if (newAccessToken) {
      useAuthStore.getState().setAuth(newAccessToken, refreshToken ?? "");
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // ✅ 401 Unauthorized && 리프레시 토큰 갱신 시도 한 번만 하기
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 플래그 설정

      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error("❌ Refresh Token 없음");
        }

        // ✅ Refresh API 요청 (withCredentials 필요)
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refresh_token: refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = response.data.access_token ?? "";
        const newRefreshToken = response.data.refresh_token ?? "";

        // ✅ 새 토큰을 Zustand 스토어에 업데이트
        useAuthStore.getState().setAuth(newAccessToken, newRefreshToken);

        // ✅ 원래 요청을 새 토큰으로 재시도
        originalRequest.headers.access = newAccessToken;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh Token 갱신 실패:", refreshError);

        // ✅ 로그아웃 처리 및 로그인 페이지로 이동
        useAuthStore.getState().logout();
        window.location.href = "/"; // 로그인 페이지로 이동
      }
    }
    return Promise.reject(error);
  }
);

export default api;
