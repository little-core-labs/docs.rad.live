import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// Development: no basePath so localhost:3000 and /docs work.
// Production (CI): BASE_PATH=/docs.rad.live for GitHub Pages. Override with BASE_PATH for custom domain.
const basePath =
  process.env.BASE_PATH ??
  (process.env.NODE_ENV === 'development' ? '' : '/docs.rad.live');
const assetPrefix = basePath ? `${basePath}/` : undefined;

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  basePath,
  ...(assetPrefix && { assetPrefix }),
  // Note: rewrites are not applied with output: 'export'
};

export default withMDX(config);
