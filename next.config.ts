import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Critical for Genkit/AI SDKs to work in Server Components
  experimental: {
    serverComponentsExternalPackages: [
      "require-in-the-middle",
      "import-in-the-middle",
      "@genkit-ai/core",
      "@genkit-ai/ai",
      "genkit",
      "fsevents"
    ],
  },
  
  // 2. Fixes "Critical dependency" and "Unexpected Token" browser errors
  // by preventing Node.js-only modules from being bundled into the client build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        perf_hooks: false,
        dns: false,
        readline: false,
      };
    }
    return config;
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com', pathname: '/**' }
    ],
  },
};

export default nextConfig;
