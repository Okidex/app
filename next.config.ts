import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Stabilized in Next.js 16 - No longer under experimental
  serverExternalPackages: [
    "require-in-the-middle",
    "import-in-the-middle",
    "@genkit-ai/core",
    "@genkit-ai/ai",
    "genkit",
    "fsevents"
  ],

  // 2. Enable the stable React Compiler for v16+
  reactCompiler: true,

  // 3. Webpack fallback logic (Note: This forces Webpack and disables Turbopack)
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
    ignoreBuildErrors: true, // Only use if you're handling types via separate CI step
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' }
    ],
  },
};

export default nextConfig;
