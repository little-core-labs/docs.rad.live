import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

// GitHub project pages are served at /<repo-name>/ (e.g. radtv.github.io/docs.rad.live).
// Set BASE_PATH env to '' only if you serve from root (e.g. custom domain at docs.rad.live).
const basePath = process.env.BASE_PATH ?? '/docs.rad.live';
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
