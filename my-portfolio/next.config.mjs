/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enable static export
    images: {
      unoptimized: true, // Required for static images on GitHub Pages
    },
    basePath: '/Portfolio', // Replace with your repository name (case-sensitive)
    assetPrefix: '/Portfolio/', // Ensures assets load correctly
  };
  
  export default nextConfig;
  