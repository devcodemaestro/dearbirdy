import { test_token } from "@/lib/token";
import axios from "axios";

const BASE_URL = "https://dev.dearbirdy.xyz";
const token = test_token;

// 편지 보관함 전체
export const getLetterAll = async (pageNum: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/letter/list/all?pageNumber=${pageNum}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("편지 전체 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 편지 보관함 답장 기다리는 편지
export const getLetterWait = async (pageNum: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/letter/list/pending?pageNumber=${pageNum}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 편지 보관함 저장한 편지
export const getLetterSaved = async (pageNum: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/letter/list/archive?pageNumber=${pageNum}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 편지 보관함 저장
export const LetterSave = async (letterStatusSeq: number) => {
  try {
    console.log("letterStatusSeq: ", letterStatusSeq);

    const response = await axios.get(
      `${BASE_URL}/api/v1/letter/archive?letterStatusSeq=${letterStatusSeq}`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log("저장", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 버디팁
export const birdyTip = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/birdy/tip`, {
      headers: {
        "Content-Type": "application/json",
        access: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
