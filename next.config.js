/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  sassOptions: {
    includePaths: ['./src/assets/scss'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src')
    return config
  },
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },
}

module.exports = nextConfig