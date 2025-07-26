const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/stagingapp',
  assetPrefix: '/stagingapp/',

  images: {
    domains: ['assets.dispenseapp.com', 'dispense-images.imgix.net'],
    loader: 'custom',
    loaderFile: './src/imageLoader.js',
    formats: ['image/avif', 'image/webp'],
  },

  compiler: {
    styledComponents: true,
  },

  webpack: (config) => {
    config.resolve.alias['styled-components'] = path.resolve(
      './node_modules/styled-components'
    );
    return config;
  },
};

module.exports = nextConfig; 
