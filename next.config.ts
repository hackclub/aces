import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true
};


module.exports = {
	images: {
		remotePatterns: [
			new URL('https://hc-cdn.hel1.your-objectstorage.com/**'),
			new URL('https://ui-avatars.com/api/')
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
}

export default nextConfig;
