/** @type {import('next').NextConfig} */
const nextConfig = {
  // NEXT.JS 16: Top-level property for Cloud origins
  allowedDevOrigins: [
    '6000-firebase-studio-1757674892721.cluster-73qgvk7hjjadkrjeyexca5ivva.cloudworkstations.dev',
    '9000-firebase-studio-1757674892721.cluster-73qgvk7hjjadkrjeyexca5ivva.cloudworkstations.dev'
  ],

  // Stable in Next.js 16: Enables automatic memoization
  reactCompiler: true,

  // NEXT.JS 16: Enables stable component-level caching and PPR
  cacheComponents: true,

  // Remove experimental block entirely if no other flags are needed
  // esmExternals: "loose" MUST be removed to prevent Turbopack panics
};

export default nextConfig;
