import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["hc-cdn.hel1.your-objectstorage.com", "ui-avatars.com"],
  },
  async redirects() {
    return [
      {
        source: "/404",
        destination: "/?404",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
