"use client";
import React, { useEffect, useState } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import { test_token } from "@/lib/token";

const NotificationComponent = () => {
  const token = test_token;
  const EventSource = EventSourcePolyfill;

  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    try {
      const fetchSse = async () => {
        const eventSource = new EventSource(
          `https://dev.dearbirdy.xyz/api/v1/notification/subscribe`,
          {
            headers: {
              access: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        eventSource.onmessage = (event) => {
          // console.log("새 알림:", event.data);
          setNotifications((prev) => [...prev, event.data]); // 알림 리스트 추가
        };

        eventSource.onerror = (error) => {
          console.error("SSE 에러 발생:", error);
          eventSource.close();
        };
      };
      fetchSse();
    } catch (error) {
      throw error;
    }
  });
  console.log(notifications);

  return (
    <div>
      <h2>실시간 알림</h2>
    </div>
  );
};

export default NotificationComponent;
