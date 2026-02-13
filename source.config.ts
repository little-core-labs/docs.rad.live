import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { visit } from 'unist-util-visit';
import type { Element } from 'hast';
import type { Root } from 'hast';

// Align with next.config basePath so /images/... in MDX becomes /docs.rad.live/images/... on GitHub Pages.
const basePath = process.env.BASE_PATH ?? '/docs.rad.live';

function rehypePrefixImageBasePath(): (tree: Root) => void {
  return (tree) => {
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
