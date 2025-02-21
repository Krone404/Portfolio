const nextConfig = {
    output: 'export',
    images: {
      unoptimized: true,
    },
    basePath: '/Portfolio', // Replace with your repo name
    assetPrefix: '/Portfolio/',
    exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      return {
        ...defaultPathMap,
        '/.nojekyll': { page: '/' }, // Include the .nojekyll file in the export
      };
    },
  };
  
  module.exports = nextConfig;
  