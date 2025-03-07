import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

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

api.interceptors.response.use(
  (response) => {
    const newAccessToken = response.headers["access"];
    const refreshToken = useAuthStore.getState().refreshToken;
    if (newAccessToken) {
      useAuthStore.getState().setAuth(newAccessToken ?? "", refreshToken ?? "");
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) {
          throw new Error("❌ Refresh Token 없음");
        }

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {
            refresh_token: refreshToken,
          }
        );

        const newAccessToken = response.data.access_token ?? "";
        const newRefreshToken = response.data.refresh_token ?? "";

        useAuthStore.getState().setAuth(newAccessToken, newRefreshToken);

        originalRequest.headers.access = newAccessToken;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("❌ Refresh Token 갱신 실패:", refreshError);
        useAuthStore.getState().logout();
        window.location.href = "/"; // 로그인 페이지로 이동
      }
    }
    return Promise.reject(error);
  }
);

export default api;
