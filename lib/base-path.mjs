/**
 * Base path for the app (used by next.config.mjs and source.config.ts for asset and image paths).
 *
 * - Set BASE_PATH in the deployment environment (e.g. AWS Amplify) if the app is served under a subpath.
 * - In development (NODE_ENV=development) we use no prefix.
 * - In production when BASE_PATH is not set, default to '' (root) for deployments like docs.rad.live.
 */
const basePath =
  process.env.BASE_PATH !== undefined
    ? process.env.BASE_PATH
    : process.env.NODE_ENV === 'development'
      ? ''
      : '';

export { basePath };
