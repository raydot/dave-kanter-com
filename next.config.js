/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  sassOptions: {
    includePaths: ['./src/assets/scss'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, 'src')

    // Optimize bundle splitting and reduce critical request chains
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10,
          },
          // Separate critical components
          critical: {
            test: /[\\/]src[\\/]components[\\/](Header|Footer)[\\/]/,
            name: 'critical',
            chunks: 'all',
            priority: 10,
          },
        },
      },
    }

    return config
  },
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  // SWC minification is now default in Next.js 15+
}

module.exports = nextConfig
