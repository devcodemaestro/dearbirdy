"use client";

import React, { useEffect, useState } from "react";
import SeniorLetterStorage from "@/components/letter-storage/SeniorLetterStorage";
import YouthLetterStorage from "@/components/letter-storage/YouthLetterStorage";
import { IUserData } from "@/app/(footershare)/home/page";

export interface IDataListItem {
  letterStatusSeq: number;
  birdName: string;
  nickname: string;
  title: string;
  read: boolean;
  saved: boolean;
}

export interface IData {
  pageNumber: number;
  totalPage: number;
  totalData: number;
  dataList: IDataListItem[];
}

const LetterStorage: React.FC = () => {
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
  console.log(userData);

  return (
    <div className="px-4 ">
      {userData.roleName === "MENTEE" ? (
        <YouthLetterStorage />
      ) : userData.roleName === "MENTOR" ? (
        <SeniorLetterStorage />
      ) : null}
    </div>
  );
};

export default LetterStorage;
