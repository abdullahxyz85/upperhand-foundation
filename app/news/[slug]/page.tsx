import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageHero, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  published_at: string;
};

async function getPost(slug: string): Promise<Post | null> {
  try {
    const { data } = await getSupabase()
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Article Not Found' };
  return { title: post.title, description: post.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: post.title }]}
      />

      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <Reveal>
            <time className="text-sm text-charcoal/55">
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <div className="mt-6 space-y-5 leading-relaxed text-charcoal/75">
              {(post.body || post.excerpt)
                .split('\n')
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/news" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-700">
              <ArrowLeft className="h-4 w-4" />
              Back to All News
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
