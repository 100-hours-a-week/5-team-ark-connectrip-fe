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
}

export default nextConfig
