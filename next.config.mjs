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
  lessVarsFilePath: './styles/variables.less', // Path to your LESS variables file (optional)
  reactStrictMode: true, // Strict mode for React
  swcMinify: true, // Enables SWC for minification

  // Custom Webpack configuration
  webpack(config) {
    // Any custom webpack configuration here
    return config
  },
}

// Use withAntdLess to wrap the configuration
export default withAntdLess(nextConfig)
