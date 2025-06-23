import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@speakeasy/core'],
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  webpack(config, { dev, isServer }) {
    if (dev) {
      config.watchOptions = {
        poll: 1000,           // check for changes every 1000ms
        aggregateTimeout: 300, // delay before rebuilding
      };
    }
    return config;
  },
};

export default nextConfig;
