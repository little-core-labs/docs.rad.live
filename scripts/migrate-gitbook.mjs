#!/usr/bin/env node
/**
 * One-time migration: rad-gitbook .md → docs.rad.live content/docs .mdx
 * - Adds frontmatter (title, description)
 * - Replaces .gitbook/assets paths with /images/ and spaces in filenames with hyphens
 * - Strips {% file %} and normalizes internal links
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GITBOOK = path.resolve(__dirname, '../../rad-gitbook');
const TARGET = path.resolve(__dirname, '../content/docs');

const ROOT_MD = [
  'account-management.md',
  'earn-free-premium-benefits-via-referrals.md',
  'rad-tv-partnerships-for-businesses.md',
  'rad-tv-blockchain-integrations.md',
  'rad-tv-community-updates.md',
  'rad-tv-technical-support.md',
];
const ROOT_README = 'README.md';

function slugFromPath(relPath) {
  return relPath.replace(/\.md$/, '').replace(/\/README$/, '');
}

function addFrontmatter(body, filePath) {
  const hasFrontmatter = body.startsWith('---');
  let title = '';
  let description = '';
  let rest = body;
  if (hasFrontmatter) {
    const end = body.indexOf('---', 3);
    if (end > 3) {
      const fm = body.slice(3, end);
      rest = body.slice(end + 3).trimStart();
      const descMatch = fm.match(/description:\s*(?:>\s*)?['"]?([\s\S]+?)['"]?(?=\n[A-Za-z]|\n---|$)/);
      if (descMatch) description = descMatch[1].replace(/\s+/g, ' ').trim().slice(0, 160);
      const titleMatch = fm.match(/title:\s*(.+?)(\n|$)/);
      if (titleMatch) title = titleMatch[1].trim();
    }
  }
  const firstH1 = rest.match(/^#\s+(.+)$/m);
  if (!title && firstH1) title = firstH1[1].replace(/\s*\{#.+\}$/, '').trim();
  if (!title) title = path.basename(filePath, '.md').replace(/-/g, ' ');
  if (!description) description = title;
  return { title, description, body: rest };
}

function fixImagePaths(content) {
  let s = content
    .replace(/\.\.\/\.\.\/\.gitbook\/assets\//g, '/images/')
    .replace(/\.\.\/\.gitbook\/assets\//g, '/images/')
    .replace(/\.gitbook\/assets\//g, '/images/');
  // Only replace spaces with hyphens in filename part (filename ends with known extension)
  s = s.replace(/\/images\/([^")>]*?\.(?:png|jpg|jpeg|gif|svg|webp|JPG|PNG|JPEG))/gi, (_, filename) => '/images/' + filename.replace(/\s+/g, '-'));
  return s;
}

function stripGitbookFile(content) {
  return content.replace(/\{%\s*file\s+src="[^"]+"\s*%\}/g, '(File attachment: see original asset if needed.)');
}

function fixInternalLinks(content, fromDir) {
  // [text](path/to/page.md) or ](path/to/page.md#hash) -> ](/docs/path/to/page#hash)
  return content.replace(/\]\(([^)]+\.md)(#[\w-]*)?\)/g, (_, p, hash) => {
    const clean = p.replace(/^\.\//, '');
    if (clean.startsWith('http') || clean.startsWith('#')) return `](${p}${hash || ''})`;
    const docPath = clean.replace(/\.md$/, '').replace(/\/README$/, '');
    return `](/docs/${docPath}${hash || ''})`;
  });
}

function mdToMdx(relPath, raw) {
  const { title, description, body } = addFrontmatter(raw, relPath);
  let content = body;
  content = fixImagePaths(content);
  content = stripGitbookFile(content);
  content = fixInternalLinks(content, path.dirname(relPath));
  const fm = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description.slice(0, 160))}
---

`;
  return fm + content;
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// Process root README as index.mdx
const readmePath = path.join(GITBOOK, ROOT_README);
if (fs.existsSync(readmePath)) {
  const raw = fs.readFileSync(readmePath, 'utf8');
  const mdx = mdToMdx(ROOT_README, raw);
  ensureDir(TARGET);
  fs.writeFileSync(path.join(TARGET, 'index.mdx'), mdx);
  console.log('Wrote content/docs/index.mdx');
}

// Root-level single docs
for (const name of ROOT_MD) {
  const src = path.join(GITBOOK, name);
  if (!fs.existsSync(src)) continue;
  const raw = fs.readFileSync(src, 'utf8');
  const mdx = mdToMdx(name, raw);
  const outPath = path.join(TARGET, name.replace(/\.md$/, '.mdx'));
  fs.writeFileSync(outPath, mdx);
  console.log('Wrote', path.relative(TARGET, outPath));
}

// Section dirs: README -> index.mdx, others -> <slug>.mdx
const SECTIONS = [
  'getting-started-creators-studios-publishers',
  'getting-started-subscribers-viewers',
  'getting-started-developer-api',
  'premium-subscriptions',
];
const NESTED = [
  'getting-started-subscribers-viewers/rad-tv-for-ps5-ps-vr2',
  'getting-started-subscribers-viewers/rad-tv-for-ps4-ps-vr',
  'getting-started-subscribers-viewers/rad-tv-for-meta-quest',
];

function processDir(relDir) {
  const srcDir = path.join(GITBOOK, relDir);
  if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) return;
  const targetDir = path.join(TARGET, relDir);
  ensureDir(targetDir);
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const e of entries) {
    if (e.isDirectory()) continue;
    if (!e.name.endsWith('.md')) continue;
    const relPath = path.join(relDir, e.name);
    const raw = fs.readFileSync(path.join(GITBOOK, relPath), 'utf8');
    const mdx = mdToMdx(relPath, raw);
    const outName = e.name === 'README.md' ? 'index.mdx' : e.name.replace(/\.md$/, '.mdx');
    const outPath = path.join(targetDir, outName);
    fs.writeFileSync(outPath, mdx);
    console.log('Wrote', path.relative(TARGET, outPath));
  }
}

for (const section of SECTIONS) processDir(section);
for (const nested of NESTED) processDir(nested);

console.log('Migration done.');
