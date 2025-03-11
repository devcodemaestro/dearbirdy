// import api from "@/lib/api";
import { BASE_URL, test_token } from "@/lib/token";
import axios from "axios";
// import { useAuthStore } from "@/store/authStore";

const token = test_token;
// export const postReply = async (formData: {
//   letterStatusSeq?: number;
//   categoryName?: string;
//   title?: string;
//   content?: string;
// }) => {
//   console.log("데이터 전송:", formData);

//   try {
//     // const accessToken = useAuthStore.getState().accessToken;
//     // if (!accessToken) {
//     //   throw new Error("❌ access_token이 없음. 로그인 필요");
//     // }

//     const response = await api.post(
//       `/api/v1/letter/reply`,
//       formData, // ✅ Body에 데이터 추가
//       {
//         headers: {
//           access: token,
//           "Content-Type": "application/json", // ✅ JSON 데이터 전송 시 필수
//         },
//       }
//     );

//     console.log("답장 성공:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("답장 실패:", error);

//     // 에러 발생 시 기본 데이터 반환 (예외 처리)
//     return {};
//   }
// };

export const postReply = async (formData: {
  letterStatusSeq?: number;
  categoryName?: string;
  title?: string;
  letter?: string;
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/letter/reply`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    // console.log("답장 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("답장 실패:", error);
    return null;
  }
};
