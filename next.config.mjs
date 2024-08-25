import {withSentryConfig} from '@sentry/nextjs';
// Import the necessary plugin
import withAntdLess from 'next-plugin-antd-less'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/v1/auth/redirected/kakao',
        destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/redirected/kakao`,
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
export default withSentryConfig(withAntdLess(nextConfig), {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "ark-sj",
project: "ktb-ark-connectrip-fe",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});