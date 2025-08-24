/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isStaticExport = process.env.STATIC_EXPORT === 'true';
const isGitHubPages = process.env.DEPLOYMENT_TARGET === 'github-pages';

const nextConfig = {
  // GitHub Pages configuration (static export)
  ...(isGitHubPages && {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
    basePath: '/sacitir',
    assetPrefix: '/sacitir/',
  }),
  // Vercel configuration (with API routes)
  ...(!isGitHubPages && {
    trailingSlash: true,
  }),
};

module.exports = nextConfig; 