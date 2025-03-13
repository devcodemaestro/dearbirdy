"use client";

import HomeMainSenior from "@/components/home/HomeMainSenior";
import HomeMainYouth from "@/components/home/HomeMainYouth";
import Header from "@/components/ui/Header";

import React, { useEffect, useState } from "react";

export interface IUserData {
  birdName?: string;
  nickname?: string;
  quota?: number;
  roleName?: string;
  read?: boolean;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<IUserData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      setUserData(parsedData);
    }
  }, []);

  if (!userData) {
    return <p>로딩 중...</p>;
  }

  if (!userData) {
    return <p>사용자 정보를 불러오는 데 실패했습니다.</p>;
  }

  return (
    <div className="justify-center items-center">
      <Header userData={userData} />

      {userData.roleName === "MENTOR" ? (
        <HomeMainSenior userData={userData} />
      ) : (
        <HomeMainYouth userData={userData} />
      )}
    </div>
  );
};

export default Home;
