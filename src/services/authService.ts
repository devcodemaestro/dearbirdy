import api from "../lib/api";
import { useAuthStore } from "@/store/authStore";

export const getAccessToken = async (code: string) => {
  console.log("✅ 백엔드 요청 시작, code 값:", code);

  try {
    const response = await api.get(`/auth/kakao?code=${code}`);

    console.log("✅ 백엔드 응답 헤더 확인:", response.headers);
    // console.log("response : ", response.data);
    // 로그인시 user정보 담기
    sessionStorage.setItem("userData", JSON.stringify(response.data.data));

    // ✅ Axios가 헤더 키를 소문자로 변환할 수 있으므로 소문자 변환을 고려하여 접근
    const accessToken =
      response.headers["access"] || response.headers["access".toLowerCase()];

    if (!accessToken) {
      throw new Error("❌ access_token이 응답에 없음");
    }
    console.log("✅ 받은 access_token:", accessToken);

    // ✅ Zustand에 저장
    useAuthStore.getState().setAuth(accessToken, "");

    return { access_token: accessToken };
  } catch (error) {
    console.error("❌ 카카오 로그인 요청 실패:", error);
    throw error;
  }
};

// ✅ 추가 정보 등록 API
export const postAdditionalInfo = async (userData: {
  birdName: string;
  nickname: string;
  userRole: string;
  userCategory: {
    career: boolean;
    mental: boolean;
    relationship: boolean;
    love: boolean;
    life: boolean;
    finance: boolean;
    housing: boolean;
    other: boolean;
  };
}) => {
  console.log("✅ 추가 정보 등록 API 호출");

  try {
    const accessToken = useAuthStore.getState().accessToken;
    if (!accessToken) {
      throw new Error("❌ access_token이 없음. 로그인 필요");
    }

    const response = await api.post("/user/additional-info", userData, {
      headers: {
        Authorization: accessToken,
      },
    });

    console.log("✅ 추가 정보 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 추가 정보 등록 실패:", error);
    throw error;
  }
};
