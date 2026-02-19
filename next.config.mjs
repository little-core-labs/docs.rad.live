import { createMDX } from 'fumadocs-mdx/next';
import { basePath } from './lib/base-path.mjs';

const withMDX = createMDX();

// basePath from lib/base-path.js (shared with source.config.ts for image paths).
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
