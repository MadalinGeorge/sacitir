/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  ...(isProd && {
    basePath: '/sacitir',
    assetPrefix: '/sacitir/',
  }),
};

module.exports = nextConfig; 