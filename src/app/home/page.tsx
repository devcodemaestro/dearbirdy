"use client";

import HomeMainSenior from "@/components/home/HomeMainSenior";
import HomeMainYouth from "@/components/home/HomeMainYouth";
import Header from "@/components/ui/Header";

import React, { useEffect, useState } from "react";

export interface IUserData {
  birdName: string;
  nickname: string;
  quota: number;
  roleName: string;
}

const Home: React.FC = () => {
  const [userData, setUserData] = useState<IUserData>();

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      console.log(parsedData);

      setUserData(parsedData);
    }
  }, []);

  if (!userData) {
    return <p>로딩 중...</p>;
  }

  return (
    <>
      <Header />
      {userData.roleName === "MENTOR" ? (
        <HomeMainSenior userData={userData} />
      ) : (
        <HomeMainYouth userData={userData} />
      )}
    </>
  );
};

export default Home;
