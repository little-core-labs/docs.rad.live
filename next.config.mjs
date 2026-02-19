import { createMDX } from 'fumadocs-mdx/next';
import { basePath } from './lib/base-path.mjs';

const withMDX = createMDX();

// For GitHub Pages subpath, assetPrefix must be a full URL so _next/ assets load correctly.
// See https://nextjs.org/docs/app/api-reference/next-config-js/assetPrefix
const assetPrefix =
  process.env.ASSET_PREFIX ??
  (basePath ? `https://little-core-labs.github.io${basePath}/` : undefined);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  basePath,
  ...(assetPrefix && { assetPrefix }),
  // Match Fumadocs static deploy: /docs -> /docs/ and emit index.html for directories.
  trailingSlash: true,
  // Note: rewrites are not applied with output: 'export'
};

export default withMDX(config);
