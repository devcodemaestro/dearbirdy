import { test_token } from "@/lib/token";
import axios from "axios";

const BASE_URL = "https://dev.dearbirdy.xyz";
const token = test_token;

// 유저 정보 (홈)
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/user/info`, {
      headers: {
        "Content-Type": "application/json",
        access: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log("User Info:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 홈화면 전체 알림

export const getNotificationList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/notification/list`, {
      headers: {
        "Content-Type": "application/json",
        access: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    console.log("알림내역:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
