import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
    optimizePackageImports: ['@chakra-ui/react'],
    externalDir: true,
  },
};

export default nextConfig;
