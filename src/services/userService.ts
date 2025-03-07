import api from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export const checkNickname = async (nickname: string): Promise<boolean> => {
  try {
    const accessToken = useAuthStore.getState().accessToken;

    // 토큰이 없으면 API 호출 중단
    if (!accessToken) {
      console.error("❌ 닉네임 중복 확인 API 호출 실패: 액세스 토큰이 없음");
      return false;
    }

    console.log("✅ 액세스 토큰:", accessToken ? "토큰 있음" : "토큰 없음");

    const response = await api.get(`user/check-nickname?nickname=${nickname}`, {
      headers: {
        access: accessToken, // 토큰을 헤더에 추가
      },
    });

    console.log("✅ 닉네임 중복 확인 응답:", response.data);

    // API 응답 구조를 확인하고 적절히 처리
    if (response.data.code === 200) {
      // data가 false면 중복이 없다는 의미 (사용 가능)
      // data가 true면 중복이 있다는 의미 (사용 불가)
      return !response.data.data; // 중복이 없으면 true 반환 (available)
    }

    return false; // 응답 코드가 200이 아니면 중복으로 처리
  } catch (error) {
    console.error("❌ 닉네임 중복 확인 실패:", error);
    return false; // 오류 발생 시 중복된 것으로 처리
  }
};
