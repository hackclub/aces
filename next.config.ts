import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hc-cdn.hel1.your-objectstorage.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/404',
        destination: '/?404',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
