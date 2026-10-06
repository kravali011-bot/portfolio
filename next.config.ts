import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
