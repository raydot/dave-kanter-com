/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Modern JavaScript output
  swcMinify: true,
  modularizeImports: {
    '@/components': {
      transform: '@/components/{{member}}',
    },
  },
  experimental: {
    optimizePackageImports: ['react-markdown', 'remark-gfm'],
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Netlify handles image optimization via their CDN
    unoptimized: false,
    // Allow Netlify's image CDN domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.netlify.app',
      },
      {
        protocol: 'https',
        hostname: 'davekanter.com',
      },
    ],
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

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.anthropic.com; frame-ancestors 'self';",
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
