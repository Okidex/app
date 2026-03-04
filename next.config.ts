import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Restoration: Use standard extensions to ensure page.tsx files are found.
  // This resolves the 404 error caused by restricted extensions.
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  turbopack: {
    resolveAlias: {
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
  serverExternalPackages: ['@grpc/grpc-js', '@grpc/proto-loader'],
};

export default nextConfig;
