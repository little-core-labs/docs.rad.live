import { getLLMText, source } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

function decodeSlug(id: string): string[] {
  if (id === 'index') return [];
  try {
    const path = Buffer.from(id, 'base64url').toString('utf8');
    return path ? path.split('/') : [];
  } catch {
    return [];
  }
}

function encodeSlug(slug: string[]): string {
  if (slug.length === 0) return 'index';
  return Buffer.from(slug.join('/'), 'utf8').toString('base64url');
}

export async function GET(_req: Request, { params }: RouteContext<'/api/llm-docs/[id]'>) {
  const { id } = await params;
  const slug = decodeSlug(id);
  const page = source.getPage(slug);
  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return source.generateParams().map((p) => ({
    id: encodeSlug(p.slug ?? []),
  }));
}
