import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Static export: use staticGET so the search index is pre-rendered for GitHub Pages
export const revalidate = false;
export const { staticGET: GET } = createFromSource(source, {
  language: 'english',
});
