"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLetterDetail } from "@/services/letterDetail";
import { useBookMarkStore } from "@/store/bookMarkStore";
import MenteeLetterDetail from "./MenteeLetterDetail";
import MentoLetterDetail from "./MentoLetterDetail";

export interface ILetter {
  letterSeq: number;
  replyUserBird: string;
  replyUser: string;
  letterTitle: string;
  categoryName: string;
  letter: string;
  creatAt: string;
  sendUserBird: string;
  sendUser: string;
}

export interface IData {
  replyLetter: ILetter;
  sendLetter: ILetter;
  saved: boolean;
  letterStatusSeq: number;
  thanksToMentor: string;
}

const LetterDetailContainer: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [userData, setUserData] = useState<{ roleName: string } | null>(null);
  const [letter, setLetter] = useState<IData | null>(null);
  const { bookMark } = useBookMarkStore();

  useEffect(() => {
    // 세션에서 사용자 역할 가져오기
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }

    // 편지 상세 정보 가져오기
    const fetchLetterDetail = async () => {
      if (!id) return;
      try {
        const data = await getLetterDetail(id);
        setLetter(data);
      } catch (error) {
        console.error("편지 상세 정보 가져오기 실패:", error);
      }
    };

    fetchLetterDetail();
  }, [id, bookMark]);

  if (!letter) return <div>Loading...</div>;

  return userData?.roleName === "MENTEE" ? (
    <MenteeLetterDetail letter={letter} />
  ) : (
    <MentoLetterDetail letter={letter} />
  );
};

export default LetterDetailContainer;
