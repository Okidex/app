/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Critical for Firebase Admin & AI stability in Next.js 14/15
  experimental: {
    serverComponentsExternalPackages: [
      '@genkit-ai/core',
      '@genkit-ai/ai',
      'genkit',
      '@opentelemetry/sdk-node',
      'require-in-the-middle',
      'import-in-the-middle',
      'firebase-admin'
    ],
  },

  // 2. Build resilience
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 3. Remote Image Patterns
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
