import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  images: { unoptimized: true },
  // For GitHub project pages (e.g. org.github.io/docs.rad.live), set:
  // basePath: '/docs.rad.live',
  // assetPrefix: '/docs.rad.live/',
  // Note: rewrites are not applied with output: 'export'
};

export default withMDX(config);
