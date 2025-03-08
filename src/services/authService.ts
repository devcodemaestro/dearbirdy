import api from "../lib/api";
import { useAuthStore } from "@/store/authStore";

export const getAccessToken = async (code: string) => {
  console.log("✅ 백엔드 요청 시작, code 값:", code);

  try {
    const response = await api.get(`/auth/kakao?code=${code}`);

    console.log("✅ 백엔드 응답 헤더 확인:", response.headers);
    console.log("response : ", response.data);
    // 로그인시 user정보 담기
    sessionStorage.setItem("userData", JSON.stringify(response.data.data));

    // ✅ Axios가 헤더 키를 소문자로 변환할 수 있으므로 소문자 변환을 고려하여 접근
    const accessToken = response.headers["access"];
    const refreshToken = response.headers["refresh"];

    if (!accessToken) {
      throw new Error("❌ access_token이 응답에 없음");
    }

    console.log("✅ 받은 access_token:", accessToken);
    console.log("✅ 받은 refresh_token:", refreshToken);

    // ✅ 백엔드에서 온 `code` 값으로 회원가입 여부 체크
    const isNewUser = response.data.code === 201; // 201이면 신규 회원

    console.log(`✅ ${isNewUser ? "신규 가입" : "기존 회원"} 확인됨`);

    // ✅ Zustand에 저장
    useAuthStore.getState().setAuth(accessToken, refreshToken);

    return { access_token: accessToken, isNewUser };
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
        access: accessToken,
      },
    });

    console.log("✅ 추가 정보 등록 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ 추가 정보 등록 실패:", error);
    throw error;
  }
};
