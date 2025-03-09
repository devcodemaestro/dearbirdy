"use client";

import api from "../lib/api";
import { useAuthStore } from "@/store/authStore";

export const getAccessToken = async (code: string) => {
  console.log("✅ 백엔드 요청 시작, code 값:", code);

  try {
    const response = await api.get(`/auth/kakao?code=${code}`);

    console.log("✅ 백엔드 응답 확인:", response);
    console.log("response data:", response.data);

    const accessToken = response.headers["access"];
    const refreshToken = response.headers["refresh"];

    if (!accessToken) {
      throw new Error("❌ access_token이 응답에 없음");
    }

    console.log("✅ 받은 access_token:", accessToken);
    console.log("✅ 받은 refresh_token:", refreshToken);

    // ✅ 백엔드 응답 메시지를 기반으로 신규 회원 여부 판단
    const isNewUser = response.data.message !== "로그인 성공"; // 로그인 성공이 아니면 신규 회원으로 처리

    console.log(`✅ ${isNewUser ? "신규 가입" : "기존 회원"} 확인됨`);

    // ✅ Zustand에 저장
    useAuthStore.getState().setAuth(accessToken, refreshToken);

    return { access_token: accessToken, isNewUser };
  } catch (error) {
    console.error("❌ 카카오 로그인 요청 실패:", error);
    throw error;
  }
};
