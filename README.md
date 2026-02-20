# docs.rad.live

Documentation site for **rad.live** (Rad TV), built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.dev). Content was migrated from the legacy GitBook repo.

- **Live site**: [https://docs.rad.live](https://docs.rad.live)
- **Migration plan**: [GITBOOK_MIGRATION.md](GITBOOK_MIGRATION.md)

## Commands

| Command | Description |
|--------|-------------|
| **`npm run dev`** | Start the dev server. Use **http://localhost:3000** for the landing page and **http://localhost:3000/docs** for the docs. No base path in dev. |
| **`npm run build`** | Production build (outputs to `.next`). Set `BASE_PATH` in the environment if the app is served under a subpath. |
| **`npm run start`** | Run the production server after `npm run build`. |
| **`npm run preview`** | Build and run the production server locally (`npm run build && npm run start`). |
| **`npm run lint`** | ESLint. |
| **`npm run types:check`** | Fumadocs MDX + Next typegen + TypeScript check. |

**Local development:** Run `npm run dev`, then open http://localhost:3000 and http://localhost:3000/docs. To test the production build locally, run **`npm run preview`**.

## Content

Documentation is organized into:

- **Getting Started - Creators, Studios, Publishers** — Channel setup, uploads, monetization, playlists, FAST, verification, etc.
- **Getting Started - Subscribers, Viewers** — Watching on web, PS5/PS VR2, PS4, iOS/Apple TV, Android, Meta Quest; DLNA/UPnP, RSS, private uploads.
- **Getting Started - Developer API** — Authentication, GraphQL, managing content, playlists, channels.
- **Premium Subscriptions** — Cancel, Stream Pass NFT, $ARA.
- **Root-level** — Account management, referrals, partnerships, blockchain, community, support.

All of the above were migrated from the legacy GitBook documentation.

## Explore

- `lib/source.ts` — Content source adapter; [`loader()`](https://fumadocs.dev/docs/headless/source-api) provides the interface to access content.
- `lib/layout.shared.tsx` — Shared layout options (nav title, GitHub URL).

| Route                     | Description                          |
| ------------------------- | ------------------------------------ |
| `app/(home)`              | Landing page.                        |
| `app/docs`                | Documentation layout and pages.      |
| `app/api/search/route.ts` | Search route handler.                |

### Fumadocs MDX

`source.config.ts` configures collections and frontmatter schema. See [Fumadocs MDX](https://fumadocs.dev/docs/mdx) and [Fumadocs docs](https://www.fumadocs.dev/docs).

## Deployment

This app is deployed to **AWS Amplify Hosting**.

- Connect the repository and branch in the [Amplify console](https://console.aws.amazon.com/amplify/). Amplify uses the `amplify.yml` build spec in the repo root (`npm ci`, `npm run build`, artifacts from `.next`).
- For the app at the root (e.g. https://docs.rad.live), set **BASE_PATH** to `''` in Amplify environment variables, or leave unset (default is root).
- Configure a custom domain (e.g. docs.rad.live) in the Amplify app settings.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev) and [Fumadocs docs](https://www.fumadocs.dev/docs)
