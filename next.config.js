const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'assets.dispenseapp.com',
      'dispense-images.imgix.net',
      'imgix.dispenseapp.com',
    ],
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.resolve.alias['styled-components'] = path.resolve(
      './node_modules/styled-components'
    )

    return config
  },
}

module.exports = nextConfig
