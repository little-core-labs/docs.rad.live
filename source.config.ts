import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';
import type { Root } from 'hast';
import { basePath } from './lib/base-path.mjs';

// When basePath is set (e.g. Amplify subpath), prefix image src so they load correctly.
function rehypePrefixImageBasePath(): (tree: Root) => void {
  return (tree) => {
    if (!basePath) return; // dev or root: keep /images/... as-is
    visit(tree, 'element', (node: Element) => {
      if (node.tagName !== 'img') return;
      const src = node.properties?.src;
      if (typeof src === 'string' && src.startsWith('/')) {
        node.properties = { ...node.properties, src: basePath + src };
      }
    });
  };
}

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkImageOptions: { useImport: false, onError: 'ignore' },
    rehypePlugins: (plugins) => [rehypePrefixImageBasePath, ...plugins],
  },
});
