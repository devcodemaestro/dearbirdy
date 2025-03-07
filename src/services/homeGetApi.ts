// import { senior_token } from "@/lib/token";
import { youth_token } from "@/lib/token";
import axios from "axios";

const BASE_URL = "https://dev.dearbirdy.xyz";

const token = youth_token;
// const token = senior_token;

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

export const testNick = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/user/check-nickname?nickname=123123`,
      {
        headers: {
          "Content-Type": "application/json",
          access: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    console.log("닉네임:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};
