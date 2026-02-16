# docs.rad.live

Documentation site for **rad.live** (Rad TV), built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.dev). Content was migrated from the legacy GitBook repo.

- **Live site**: [https://docs.rad.live](https://docs.rad.live) (or your GitHub Pages URL once deployed)
- **Migration plan**: [GITBOOK_MIGRATION.md](GITBOOK_MIGRATION.md)

## Commands

| Command | Description |
|--------|-------------|
| **`npm run dev`** | Start the dev server. Use **http://localhost:3000** for the landing page and **http://localhost:3000/docs** for the docs. No base path in dev. |
| **`npm run build`** | Production build (static export to `out/`). Uses base path `/docs.rad.live` for GitHub Pages unless `BASE_PATH` is set. |
| **`npm run preview`** | Build with empty base path and serve `out/` with `npx serve out`. Use this to test the static export locally; assets load correctly. |
| **`npm run start`** | Runs `next start`. With static export, use **`npm run preview`** instead to test the exported site. |
| **`npm run lint`** | ESLint. |
| **`npm run types:check`** | Fumadocs MDX + Next typegen + TypeScript check. |

**Local development:** Run `npm run dev`, then open http://localhost:3000 and http://localhost:3000/docs. To test the static export locally (e.g. before pushing), run **`npm run preview`** — it builds with root paths and serves `out/` so assets load correctly. Do not use `npx serve out` after a plain `npm run build`, or asset URLs will 404.

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

This app supports **static export** for hosting on GitHub Pages or any static host.

- **GitHub Actions:** `.github/workflows/deploy-pages.yml` runs on push to **`master`**. It sets `BASE_PATH='/docs.rad.live'`, runs `npm run build`, and deploys the `out/` directory to GitHub Pages. In repo **Settings → Pages**, set Source to **GitHub Actions**.
- **Default URL:** The site is available at the project Pages URL (e.g. `https://<org>.github.io/docs.rad.live`). For a custom domain at the root (e.g. https://docs.rad.live), set `BASE_PATH: ''` in the workflow and redeploy.
- **Local preview of production build:** Use **`npm run preview`** to build with no base path and serve `out/` so you can test the static export locally without 404s. Do not run `npx serve out` after a plain `npm run build`, or asset paths will not match.
- See [Fumadocs Static Build](https://www.fumadocs.dev/docs/deploying/static) for search and static export configuration.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev) and [Fumadocs docs](https://www.fumadocs.dev/docs)
