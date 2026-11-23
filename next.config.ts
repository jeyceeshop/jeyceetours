import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    qualities: [75, 85],
  },
};

export default config;
