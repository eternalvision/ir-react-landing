import type { NextConfig } from 'next'
const { i18n } = require('./next-i18next.config')

const nextConfig: NextConfig = {
  i18n,
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: true,
  },
  reactStrictMode: true,
}

export default nextConfig
