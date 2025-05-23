import api from "@/lib/api";
import { test_token } from "@/lib/token";

const token = test_token;

// 편지 상세보기
export const getLetterDetail = async (letterStatusSeq: string | string[]) => {
  try {
    const response = await api.get(
      `/letter/details?letterStatusSeq=${letterStatusSeq}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    // console.log("Detail Info:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
// 편지 고마움 전달
export const getThanks = async (letterSeq: number, type: string) => {
  try {
    const response = await api.get(
      `/letter/thanks?letterSeq=${letterSeq}&type=${type}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    // console.log("고마움 전달:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 편지 넘기기
export const getThrow = async (letterStatusSeq: number) => {
  try {
    const response = await api.get(
      `/letter/throw?letterStatusSeq=${letterStatusSeq}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    // console.log("편지 던지기:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
