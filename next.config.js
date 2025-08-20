/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ['./src/assets/scss'],
  },
    turbopack: {
      resolveAlias: {
        '@': './src',
      },
    },
}


module.exports = nextConfig