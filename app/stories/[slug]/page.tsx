import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin } from 'lucide-react';
import { PageHero, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type Story = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  location: string;
  created_at: string;
};

async function getStory(slug: string): Promise<Story | null> {
  try {
    const { data } = await getSupabase()
      .from('stories')
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
  const story = await getStory(params.slug);
  if (!story) return { title: 'Story Not Found' };
  return { title: story.title, description: story.excerpt };
}

export default async function StoryDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStory(params.slug);
  if (!story) notFound();

  return (
    <>
      <PageHero
        eyebrow="Stories of Change"
        title={story.title}
        description={story.excerpt}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Stories', href: '/stories' }, { label: story.title }]}
      />

      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          {story.location && (
            <Reveal>
              <p className="flex items-center gap-2 text-sm font-medium text-gold-600">
                <MapPin className="h-4 w-4" />
                {story.location}
              </p>
            </Reveal>
          )}
          <Reveal delay={80}>
            <div className="mt-6 space-y-5 leading-relaxed text-charcoal/75">
              {(story.body || story.excerpt)
                .split('\n')
                .filter(Boolean)
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link href="/stories" className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-700">
              <ArrowLeft className="h-4 w-4" />
              Back to All Stories
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Help Write the Next Story."
        description="Behind every story is a donor who made it possible."
        href="/donate"
      />
    </>
  );
}
