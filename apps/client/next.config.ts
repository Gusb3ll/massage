import { NextConfig } from 'next'

const config = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  images: {
    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
} satisfies NextConfig

export default config
