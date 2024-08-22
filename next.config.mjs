// Import the necessary plugin
import withAntdLess from 'next-plugin-antd-less'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/auth/redirected/kakao',
        destination: 'http://localhost:8080/api/v1/auth/redirected/kakao',
      },
    ]
  },
  reactStrictMode: false, // Strict mode for React
  swcMinify: true, // Enables SWC for minification
  images: {
    domains: ['k.kakaocdn.net'], // 허용할 외부 도메인을 추가
  },

  // Custom Webpack configuration
  webpack(config) {
    // Any custom webpack configuration here
    return config
  },

  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
}

// Use withAntdLess to wrap the configuration
export default withAntdLess(nextConfig)
