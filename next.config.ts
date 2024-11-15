import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dnm.nflximg.net",
      },
    ],
  },
};

export default nextConfig;
