/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  serverExternalPackages: ['@grpc/grpc-js', '@grpc/proto-loader'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      }
    ],
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /@protobufjs\/inquire/ },
      { module: /require-in-the-middle/ },
    ];
    return config;
  }
};

export default nextConfig;
