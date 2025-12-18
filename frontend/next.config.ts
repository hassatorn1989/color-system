import type { NextConfig } from "next";
const path = require('path');
const nextConfig: NextConfig = {
  turbopack: {},
  output: "standalone",
  webpack: (config) => {
    // Resolve the `@` alias to the `lib` directory
    config.resolve.alias["@"] = path.join(__dirname);
    return config;
  },
};

export default nextConfig;
