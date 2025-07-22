import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // This disables ESLint checks during `next build`
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.devServer = {
        https: true, // Enable HTTPS for development server (required for secure WebSockets)
        port: 3000,
        headers: {
          "Access-Control-Allow-Origin": "*", // Enable CORS for WebSocket connections
        },
      };
    }
    return config;
  },
};

export default nextConfig;
