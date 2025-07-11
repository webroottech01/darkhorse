const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'imgix',
    path: '',
    disableStaticImages: true
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
