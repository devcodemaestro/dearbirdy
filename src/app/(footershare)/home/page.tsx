"use client";

import HomeMainSenior from "@/components/home/HomeMainSenior";
import HomeMainYouth from "@/components/home/HomeMainYouth";
import Header from "@/components/ui/Header";
import { getUserInfo } from "@/services/authService";

import React, { useEffect, useState } from "react";

export interface IUserData {
  birdName: string;
  nickname: string;
  quota?: number;
  userRole: string;
  read?: boolean;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);

      try {
        const storedData = sessionStorage.getItem("userData");

        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setUserData(parsedData);
          setLoading(false);
          return;
        }

        // ✅ 서버에서 사용자 정보 가져오기
        const response = await getUserInfo();
        const { data } = response;

        if (data) {
          setUserData(data);
          console.log("home 페이지의 data", data);
          sessionStorage.setItem("userData", JSON.stringify(data)); // ✅ 캐싱
        }
      } catch (error) {
        console.error("❌ 사용자 정보 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  if (!userData) {
    return <p>사용자 정보를 불러오는 데 실패했습니다.</p>;
  }

  return (
    <>
      <Header userData={userData} />

      {userData.roleName === "MENTOR" ? (
        <HomeMainSenior userData={userData} />
      ) : (
        <HomeMainYouth userData={userData} />
      )}
    </>
  );
};

export default Home;
