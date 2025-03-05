import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/auth/kakao",
        destination: "https://dev.dearbirdy.xyz/api/v1/auth/kakao",
      },
    ];
  },
};

export default nextConfig;
