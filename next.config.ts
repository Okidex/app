import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    resolveAlias: {
      // Conditional aliasing for browser environments
      'fs': { browser: 'next/dist/compiled/browser-fs-noop' },
      'net': { browser: 'next/dist/compiled/browser-fs-noop' },
      'tls': { browser: 'next/dist/compiled/browser-fs-noop' },
      'dns': { browser: 'next/dist/compiled/browser-fs-noop' },
      'http2': { browser: 'next/dist/compiled/browser-fs-noop' },
      'child_process': { browser: 'next/dist/compiled/browser-fs-noop' },
      'readline': { browser: 'next/dist/compiled/browser-fs-noop' },
      'zlib': { browser: 'next/dist/compiled/browser-fs-noop' },
    },
  },
  // Ensure server-only packages aren't bundled for the client
  serverExternalPackages: ['@grpc/grpc-js', '@grpc/proto-loader'],
};

export default nextConfig;
