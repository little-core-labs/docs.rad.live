# docs.rad.live

Documentation site for **rad.live** (Rad TV), built with [Next.js](https://nextjs.org) and [Fumadocs](https://fumadocs.dev). Content was migrated from the legacy GitBook repo.

- **Live site**: [https://docs.rad.live](https://docs.rad.live) (or your GitHub Pages URL once deployed)
- **Migration plan**: [GITBOOK_MIGRATION.md](GITBOOK_MIGRATION.md)

## Commands

```bash
npm run dev    # Start dev server (http://localhost:3000)
npm run build  # Production build (with static export: outputs to out/)
npm run lint   # ESLint
```

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

- Follow [Fumadocs Static Build](https://www.fumadocs.dev/docs/deploying/static): set `output: 'export'` in `next.config`, configure search for static mode.
- GitHub Actions workflow: `.github/workflows/deploy-pages.yml` — on push to `main`, runs `npm run build` and deploys the `out/` directory to GitHub Pages.
- In repo Settings → Pages, set Source to **GitHub Actions**.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Fumadocs](https://fumadocs.dev) and [Fumadocs docs](https://www.fumadocs.dev/docs)
