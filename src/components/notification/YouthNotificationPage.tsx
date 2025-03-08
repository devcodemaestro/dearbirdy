import { INotification } from "@/app/notification-box/page";
import Image from "next/image";
import React from "react";

interface IProps {
  notifications: INotification[];
}

const YouthNotificationPage: React.FC<IProps> = ({ notifications }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-2">
      <div className="flex w-screen h-[40px] px-4 py-2 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          읽지 않음
        </span>
      </div>
      {/* 읽지 않은 알림 */}
      {notifications
        .filter((notification) => !notification.read)
        .map((notification, index) => (
          <div
            key={index}
            className="flex w-screen px-4 py-2.5 border-b border-[#F0F1EC] bg-[#F3F0EA]"
          >
            <div className="flex items-start min-w-[40px] ">
              <Image
                src={`/images/birds/${notification.birdName}_40.svg`}
                alt="알림함 보낸 새 프로필 40"
                width={40}
                height={40}
              />
            </div>
            <div className="ml-4">
              <div className="flex items-center justify-between h-6">
                <p className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                  답장이 도착했어요
                </p>
                <Image
                  src="/images/icons/reddot_icon.svg"
                  alt="빨간점 아이콘"
                  width={24}
                  height={24}
                  className=""
                />
              </div>
              <p className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
                <span className="font-bold leading-[20px] ">
                  {notification.nickname}
                </span>
                {notification.message}
              </p>
              <span className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                {new Date(notification.createAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      <div className="flex w-screen h-10 px-4 py-2.5 bg-[#F4F5EF]">
        <span className="text-[#6B7178] text-[16px] font-medium leading-[24px] tracking-[-0.064px]">
          이전 알림
        </span>
      </div>
      {/* 이전 알림 */}
      {notifications
        .filter((notification) => notification.read)
        .map((notification, index) => (
          <div
            key={index}
            className="flex w-screen px-4 py-2.5 border-b border-[#F0F1EC]"
          >
            <div className="flex items-start min-w-[40px] ">
              <Image
                src={`/images/birds/${notification.birdName}_40.svg`}
                alt="알림함 보낸 새 프로필 40"
                width={40}
                height={40}
              />
            </div>
            <div className="ml-4">
              <div className="flex items-center justify-between h-6">
                <p className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                  답장이 도착했어요
                </p>
              </div>
              <p className="text-[#292D32] text-[14px] font-normal leading-[22px] tracking-[-0.056px]">
                <span className="font-bold leading-[20px] ">
                  {notification.nickname}
                </span>
                {notification.message}
              </p>
              <span className="text-[#6B7178] text-[12px] font-normal leading-[16px] tracking-[-0.048px]">
                {new Date(notification.createAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default YouthNotificationPage;
