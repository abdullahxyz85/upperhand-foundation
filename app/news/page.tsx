import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { PlaceholderNotice } from '@/components/page-parts';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'News & Updates',
  description:
    'Latest news, project updates and announcements from Upper Hands Foundation.',
};

type Post = { id: string; slug: string; title: string; excerpt: string; category: string; published_at: string };

async function getPosts(): Promise<Post[]> {
  try {
    const { data } = await getSupabase()
      .from('posts')
      .select('id, slug, title, excerpt, category, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function NewsPage() {
  const posts = await getPosts();

  return (
    <>
      <PageHero
        eyebrow="Media & Stories"
        title="News & Updates"
        description="Field reports, campaign updates and announcements, shared in plain words from the ground."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'News & Updates' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={(i % 3) * 80}>
                  <Link href={`/news/${p.slug}`} className="card-surface group block h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex h-36 items-center justify-center bg-forest-800">
                      <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gold-300">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <time className="text-xs text-charcoal/50">
                        {new Date(p.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-forest-800">{p.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal/65">{p.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest-600">
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-forest-800">No Articles Published Yet</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                News, field reports and announcements will appear here as the foundation publishes them.
              </p>
              <div className="mt-8 text-left">
                <PlaceholderNotice>
                  Articles are written and published by foundation administrators. Nothing is auto-generated.
                </PlaceholderNotice>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBanner
        title="Good News Deserves Company."
        description="Subscribe to our newsletter and receive updates straight from the field."
        href="/#newsletter"
        ctaLabel="Subscribe Below"
      />
    </>
  );
}
