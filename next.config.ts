import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    logging: {
      level: 'verbose',
    },
  },
  images: {
    domains: ['example.com'], // Add your image domains here
    formats: ['image/avif', 'image/webp'],
  },
  // Enable detailed hydration error messages
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;
