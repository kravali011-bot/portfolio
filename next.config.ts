import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // static HTML export for GitHub Pages (the site has no server-side features)
  output: "export",
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  images: { unoptimized: true },
};

export default nextConfig;
