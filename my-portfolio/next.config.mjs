/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static export
    images: {
      unoptimized: true, // Required for Next.js Image component to work with static export
    },
    basePath: '/Portfolio', // Replace with your GitHub repo name
    assetPrefix: '/Portfolio/', // Prefix for assets
  };
  
  module.exports = nextConfig;
  