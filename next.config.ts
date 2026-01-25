import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on Node.js modules by telling webpack
    // to stub them out for the client-side bundle.
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        net: false,
        tls: false,
        dns: false,
        readline: false,
        perf_hooks: false,
      };
    }

    return config;
  },
};

export default nextConfig;
