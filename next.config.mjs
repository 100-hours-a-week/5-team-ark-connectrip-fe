// Import the necessary plugin
import withAntdLess from 'next-plugin-antd-less'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: `${process.env.KAKAO_REDIRECT_URI}`,
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}${process.env.KAKAO_REDIRECT_URI}`,
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
