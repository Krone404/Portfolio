/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/Portfolio', // Replace with your repo name
    assetPrefix: '/Portfolio/', // Ensures assets load correctly
  };
  
  export default nextConfig;
  