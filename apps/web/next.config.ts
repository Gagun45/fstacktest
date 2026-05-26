import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@repo/shared"],
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evently45.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
