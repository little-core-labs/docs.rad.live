/**
 * Single source of truth for GitHub Pages base path.
 * Used by next.config.mjs and source.config.ts so image and asset paths stay in sync.
 *
 * - Set BASE_PATH in CI (e.g. /docs.rad.live). Must be set for the whole build job
 *   so it's available during both "Install dependencies" (fumadocs-mdx postinstall)
 *   and "Build" (next build). Use BASE_PATH='' for custom domain (e.g. docs.rad.live).
 * - In development (NODE_ENV=development) we use no prefix.
 * - When BASE_PATH is not set, fallback to /docs.rad.live so production builds get correct paths.
 */
const basePath =
  process.env.BASE_PATH !== undefined
    ? process.env.BASE_PATH
    : process.env.NODE_ENV === 'development'
      ? ''
      : '/docs.rad.live';

export { basePath };
