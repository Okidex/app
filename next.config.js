/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // 2025 Fix: Allows Project IDX / Firebase Studio preview domains
    allowedDevOrigins: [
      '*.cloudworkstations.dev',
      '*.idxdev.google.com.au',
      '*.firebase.google.com'
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevents bundling issues with handlebars in server components
      config.externals.push('handlebars');
    }
    return config;
  },
};

module.exports = nextConfig;
