import axios from "axios";

const API_BASE_URL = "https://dev.dearbirdy.xyz/api/v1";

export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get(`${API_BASE_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
