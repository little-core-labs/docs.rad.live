# GitBook to docs.rad.live migration

This document is the single source of truth for the GitBook → Fumadocs migration and follow-on work.

## Fumadocs documentation references

Follow [Fumadocs](https://www.fumadocs.dev) official docs for all content, build, and deployment decisions.

| Topic | URL | Use |
|-------|-----|-----|
| **Deploying** | https://www.fumadocs.dev/docs/deploying | Overview; framework-specific deployment (Next.js). |
| **Page Slugs & Page Tree** | https://www.fumadocs.dev/docs/page-conventions | File/folder layout, slugs, `meta.json` for folder order and titles. |
| **Navigation** | https://www.fumadocs.dev/docs/navigation | Layout links and sidebar (page tree). |
| **Search** | https://www.fumadocs.dev/docs/search | Search implementation overview. |
| **Orama (default)** | https://www.fumadocs.dev/docs/search/orama | Default search; server-side search used when deployed to Amplify. |
| **Fumadocs MDX** | https://www.fumadocs.dev/docs/mdx | Content source, collections, `source.config.ts`, frontmatter/schema. |
| **MDX Collections** | https://www.fumadocs.dev/docs/mdx/collections | `defineDocs`, `dir`, frontmatter schema. |
| **Source API (headless)** | https://www.fumadocs.dev/docs/headless/source-api | `loader()`, page tree, baseUrl. |
| **Markdown** | https://www.fumadocs.dev/docs/markdown | Writing docs, components (Cards, code blocks). |
| **Remark Image** | https://www.fumadocs.dev/docs/headless/mdx/remark-image | Images: public directory; root-relative paths in MDX (e.g. `/images/...`); no source-specific naming in paths. |

## Outline of the six areas

1. **CLAUDE.md updates** — Migration note, content layout, Fumadocs/asset pointers, deployment notes.
2. **README.md updates** — Project purpose, live site link, content overview, deployment section.
3. **This file (GITBOOK_MIGRATION.md)** — Central plan, doc map, asset strategy, deployment, future integration.
4. **Doc transfer** — Copy content and assets; structure under `content/docs/`; frontmatter; image path replacement; meta.json; internal links.
5. **AWS Amplify deployment** — Next.js build (SSR/SSG); build spec in `amplify.yml`; no static export.
6. **Future: Service docs integration** — Agentic/skills to bring in api.rad.live, embed.rad.live, web-rad, mediahq, ps5-rad, etc.

## Doc map (GitBook → content/docs)

| Source (rad-gitbook) | Target (docs.rad.live content/docs) |
|----------------------|-------------------------------------|
| README.md | index.mdx |
| getting-started-creators-studios-publishers/README.md | getting-started-creators-studios-publishers/index.mdx |
| getting-started-creators-studios-publishers/*.md | getting-started-creators-studios-publishers/<slug>.mdx |
| getting-started-subscribers-viewers/README.md | getting-started-subscribers-viewers/index.mdx |
| getting-started-subscribers-viewers/*.md | getting-started-subscribers-viewers/<slug>.mdx |
| getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/README.md | getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/index.mdx |
| getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/*.md | getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2/<slug>.mdx |
| getting-started-subscribers-viewers/rad-tv-for-ps4-ps-vr/README.md | getting-started-subscribers-viewers/rad-tv-for-ps4-ps-vr/index.mdx |
| getting-started-subscribers-viewers/rad-tv-for-ps4-ps-vr/*.md | getting-started-subscribers-viewers/rad-tv-for-ps4-ps-vr/<slug>.mdx |
| getting-started-subscribers-viewers/rad-tv-for-meta-quest/README.md | getting-started-subscribers-viewers/rad-tv-for-meta-quest/index.mdx |
| getting-started-subscribers-viewers/rad-tv-for-meta-quest/*.md | getting-started-subscribers-viewers/rad-tv-for-meta-quest/<slug>.mdx |
| getting-started-developer-api/README.md | getting-started-developer-api/index.mdx |
| getting-started-developer-api/*.md | getting-started-developer-api/<slug>.mdx |
| premium-subscriptions/README.md | premium-subscriptions/index.mdx |
| premium-subscriptions/*.md | premium-subscriptions/<slug>.mdx |
| account-management.md | account-management.mdx |
| earn-free-premium-benefits-via-referrals.md | earn-free-premium-benefits-via-referrals.mdx |
| rad-tv-partnerships-for-businesses.md | rad-tv-partnerships-for-businesses.mdx |
| rad-tv-blockchain-integrations.md | rad-tv-blockchain-integrations.mdx |
| rad-tv-community-updates.md | rad-tv-community-updates.mdx |
| rad-tv-technical-support.md | rad-tv-technical-support.mdx |
| account-management.md | account-management.mdx |

## Asset strategy (Fumadocs-compliant)

Per [Remark Image](https://www.fumadocs.dev/docs/headless/mdx/remark-image):

- Place all doc images under the project **public** directory: `public/images/`.
- Copy source assets from the former GitBook repo (the `.gitbook/assets/` folder) into `public/images/` **without** using "gitbook" or any source-specific naming in paths.
- In migrated MDX, use root-relative paths only (e.g. `/images/filename.png`).
- Replace all `../.gitbook/assets/` and `../../.gitbook/assets/` refs with `/images/`.
- Normalize filenames (e.g. spaces → hyphens) and update refs.

## Content cleanup

- Replace or strip GitBook-only syntax (`{% raw %}{% file %}{% endraw %}`, etc.).
- Normalize HTML `<figure>`/`<div>` for images; use standard Markdown image syntax where possible.
- Ensure frontmatter (`title`, `description`) on every page per [Page conventions](https://www.fumadocs.dev/docs/page-conventions#file).
- Fix internal links to use Fumadocs doc paths (no `.md`), e.g. `/docs/getting-started-developer-api/authentication`.

## Deployment summary

- The app is deployed to **AWS Amplify Hosting** as a standard Next.js app (SSR/SSG). Build spec is in **`amplify.yml`** at the repo root: `npm ci`, `npm run build`, artifacts from `.next`.
- In the Amplify console, connect the repo and branch; set `BASE_PATH` to `''` (or leave unset) if the site is at the root (e.g. https://docs.rad.live).
- No static export; the Next.js server runs on Amplify.

## Future: Service docs integration

- **Goal**: Bring documentation from other radtv services (api.rad.live, embed.rad.live, web-rad, mediahq, ps5-rad, radius, radcaster) into docs.rad.live.
- **Discovery**: Scan service roots for `README.md`, `CLAUDE.md`, `docs/**/*.md`; map to a consistent URL structure (e.g. `content/docs/services/<service>.mdx`).
- **Schema**: Align frontmatter with [Fumadocs MDX](https://www.fumadocs.dev/docs/page-conventions#file) and [collections schema](https://www.fumadocs.dev/docs/mdx/collections#schema-1) in `source.config.ts`.
- **Automation**: Cursor skill/rule, or on-demand script, to copy/sync service docs into `content/docs/` with correct structure and image paths; document chosen approach here when implemented.
