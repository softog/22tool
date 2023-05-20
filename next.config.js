/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const ASSET_PREFIX_URL = 'https://static.tool.softog.com';

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: isProd ? ASSET_PREFIX_URL : undefined,
  env: {
    assetPrefix: isProd ? ASSET_PREFIX_URL : ''
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|ico)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, must-revalidate',
          }
        ],
      },
    ]
  },
  async rewrites() {
    return [
      { source: '/category/:path*', destination: '/category/:path*' },
      { source: '/:path*', destination: '/tools/:path*' },
    ]
  },
}

module.exports = nextConfig