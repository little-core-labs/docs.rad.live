# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repo is the **canonical documentation site for rad.live** (Rad TV), built with **Next.js 16** and **Fumadocs**. Content was migrated from the legacy GitBook repo (rad-gitbook). Content is authored in MDX files and rendered through Fumadocs UI with full-text search, OG image generation, and LLM-optimized content endpoints.

For migration details and Fumadocs alignment, see [GITBOOK_MIGRATION.md](GITBOOK_MIGRATION.md).

## Commands

- **`npm run dev`** — Start the dev server. The app is served at the **root** (no base path), so use **http://localhost:3000** for the landing page and **http://localhost:3000/docs** for the docs. Hot reload works as usual.
- **`npm run build`** — Production build (static export to `out/`). Uses `basePath: '/docs.rad.live'` unless `BASE_PATH` is set, so the output is correct for GitHub Pages deployment.
- **`npm run preview`** — Build with **empty** basePath and serve the `out/` directory with `npx serve out`. Use this to test the static export locally (e.g. open the URL printed by serve). Assets load correctly because the build matches the served root.
- **`npm run start`** — Runs `next start`; with `output: 'export'` the app is static, so prefer **`npm run preview`** to test the exported site locally.
- **`npm run lint`** — ESLint
- **`npm run types:check`** — Runs `fumadocs-mdx`, `next typegen`, then `tsc --noEmit`
- **`npm run postinstall`** — Runs `fumadocs-mdx` (auto-generates `.source/` directory)

## Architecture

### Content Pipeline

MDX files in `content/docs/` → processed by `fumadocs-mdx` → generates types/metadata in `.source/` (gitignored) → accessed via `lib/source.ts` loader → rendered by `app/docs/[[...slug]]/page.tsx`.

### Key Files

- **`source.config.ts`** — Fumadocs collection config, frontmatter schema (uses `pageSchema`), sets content dir to `content/docs`
- **`lib/source.ts`** — Content source adapter: `source.getPage()`, `source.getPages()`, `source.generateParams()`, `source.getPageTree()`
- **`lib/layout.shared.tsx`** — Shared layout config (nav title, GitHub URL). Contains `gitConfig` that should be updated with actual repo info.
- **`mdx-components.tsx`** — MDX component defaults, wraps fumadocs-ui components with `createRelativeLink()` for doc-to-doc linking

### Route Structure

- `app/(home)/` — Landing page
- `app/docs/[[...slug]]/` — Documentation pages (catch-all dynamic route)
- `app/api/search/` — Orama full-text search endpoint
- `app/llms.txt/`, `app/llms-full.txt/`, `app/api/llm-docs/` — LLM-optimized content endpoints (per-doc: `/api/llm-docs/[id]` with `id` = `index` for root or base64url of slug path)
- `app/og/docs/` — Dynamic Open Graph image generation

### Styling

Tailwind CSS 4 via `@tailwindcss/postcss`. Global CSS imports Fumadocs neutral theme and preset (`fumadocs-ui/css/neutral.css`, `fumadocs-ui/css/preset.css`).

### Path Aliases

- `@/*` → project root
- `fumadocs-mdx:collections/*` → `.source/*` (auto-generated)

### Content layout (post-migration)

Docs live under `content/docs/` with sections mirroring the legacy structure: `getting-started-creators-studios-publishers/`, `getting-started-subscribers-viewers/`, `getting-started-developer-api/`, `premium-subscriptions/`, plus root-level docs (e.g. `account-management.mdx`). Sidebar order is controlled by `meta.json` per folder; see [Fumadocs Page Slugs & Page Tree](https://www.fumadocs.dev/docs/page-conventions).

### Assets and images

Per [Fumadocs Remark Image](https://www.fumadocs.dev/docs/headless/mdx/remark-image): doc images live in the **public** directory (e.g. `public/images/`). Reference them in MDX with root-relative paths (e.g. `/images/filename.png`). Do not use source-specific folder names in asset paths. A rehype plugin in `source.config.ts` (`rehypePrefixImageBasePath`) rewrites image `src` to include the base path in production so images load correctly on GitHub Pages (e.g. `/docs.rad.live/images/...`). In development, base path is empty so `/images/...` is used as-is.

### GitHub Pages and base path

- **Development:** `next.config.mjs` and `source.config.ts` use **no base path** when `NODE_ENV === 'development'`, so the app is at http://localhost:3000 and http://localhost:3000/docs.
- **Production (CI):** The workflow `.github/workflows/deploy-pages.yml` sets `BASE_PATH='/docs.rad.live'` so the built site works at the default project URL (e.g. `https://little-core-labs.github.io/docs.rad.live`). Set `output: 'export'`, `images: { unoptimized: true }`, and configure search for static export per [Fumadocs Static Build](https://www.fumadocs.dev/docs/deploying/static). For a custom domain at the root (e.g. https://docs.rad.live), set `BASE_PATH: ''` in the workflow and redeploy.
- **Local preview of static export:** Run **`npm run preview`** (builds with empty basePath and serves `out/`) so assets resolve correctly. Do not run `npx serve out` after a normal `npm run build`, or asset URLs will 404 because the build uses `/docs.rad.live` in paths.
- The `lib/layout.shared.tsx` `gitConfig` and nav title should point to the actual Rad TV repo and "Rad TV Docs" (or equivalent).

### Fumadocs references

- Authoring and structure: [Page Slugs & Page Tree](https://www.fumadocs.dev/docs/page-conventions), [Fumadocs MDX](https://www.fumadocs.dev/docs/mdx), [Markdown](https://www.fumadocs.dev/docs/markdown).
- Deployment: [Deploying](https://www.fumadocs.dev/docs/deploying), [Static Build](https://www.fumadocs.dev/docs/deploying/static).

## Adding Documentation

Create MDX files in `content/docs/` with frontmatter:

```yaml
---
title: Page Title
description: Short description
---
```

Fumadocs built-in components (`<Cards>`, `<Card>`, code blocks with syntax highlighting) are available in MDX files.
