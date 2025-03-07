import { senior_token } from "@/lib/token";
// import { youth_token } from "@/lib/token";

import axios from "axios";

const BASE_URL = "https://dev.dearbirdy.xyz";
// const token = youth_token;
const token = senior_token;

// 편지 상세보기
export const getLetterDetail = async (letterStatusSeq: string | string[]) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/letter/details?letterStatusSeq=${letterStatusSeq}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("Detail Info:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
