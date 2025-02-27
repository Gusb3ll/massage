import { NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  poweredByHeader: false,
  cleanDistDir: true,
  // images: {
  //   remotePatterns: [],
  // },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    parallelServerCompiles: true,
    webpackBuildWorker: true,
  },
}

export default config
