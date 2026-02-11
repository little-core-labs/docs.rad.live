#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT = path.resolve(__dirname, '../content/docs');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full);
    else if (e.name.endsWith('.mdx')) fixFile(full);
  }
}

function fixFile(filePath) {
  let s = fs.readFileSync(filePath, 'utf8');
  s = s.replace(/<br>\s*/g, '<br />\n');
  s = s.replace(/\]\(\/docs\/\.\.\/getting-started/g, '](/docs/getting-started');
  s = s.replace(/\{%\s*hint\s+style="info"\s*%\}\n?/g, '<Callout type="info">\n');
  s = s.replace(/\{%\s*endhint\s*%\}\n?/g, '</Callout>\n');
  s = s.replace(/\{%\s*hint\s+style="warning"\s*%\}\n?/g, '<Callout type="warn">\n');
  s = s.replace(/\{%\s*hint\s+style="success"\s*%\}\n?/g, '<Callout type="success">\n');
  s = s.replace(/\{%\s*embed\s+url="([^"]+)"\s*%\}\n?(\{%\s*endembed\s*%\})?/g, (_, url) => `[View external resource](${url})\n\n`);
  s = s.replace(/\{%\s*embed\s+url="([^"]+)"\s*%\}/g, (_, url) => `[View external resource](${url})`);
  s = s.replace(/\{%\s*endembed\s*%\}/g, '');
  s = s.replace(/\{%\s*code[^%]*%\}\n?/g, '');
  s = s.replace(/\{%\s*endcode\s*%\}\n?/g, '');
  fs.writeFileSync(filePath, s);
}

walk(CONTENT);
console.log('Fixed MDX files.');
