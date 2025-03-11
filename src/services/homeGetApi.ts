import api from "@/lib/api";
import { test_token } from "@/lib/token";

const token = test_token;

// 유저 정보 (홈)
export const getUserInfo = async () => {
  try {
    const response = await api.get(`user/info`, {
      headers: {
        "Content-Type": "application/json",
        access: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    // console.log("User Info:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 홈화면 실시간 알림

export const getNotification = async () => {
  try {
    const response = await api.get(`/notification/subscribe`, {
      headers: {
        "Content-Type": "application/json",
        access: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// 홈화면 전체 알림 리스트

export const getNotificationList = async () => {
  try {
    const response = await api.get(`/notification/list`, {
      headers: {
        "Content-Type": "application/json",
        access: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    // console.log("알림내역:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
