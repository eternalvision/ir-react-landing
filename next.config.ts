import type { NextConfig } from 'next'
const { i18n } = require('./next-i18next.config')

const nextConfig: NextConfig = {
  i18n,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  reactStrictMode: true,
}

export default nextConfig
