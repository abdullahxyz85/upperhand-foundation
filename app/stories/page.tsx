import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { PlaceholderNotice } from '@/components/page-parts';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Success Stories',
  description:
    'Stories of change from Upper Hands Foundation — real people and communities supported with dignity across Pakistan.',
};

type Story = { id: string; slug: string; title: string; excerpt: string; location: string; created_at: string };

async function getStories(): Promise<Story[]> {
  try {
    const { data } = await getSupabase()
      .from('stories')
      .select('id, slug, title, excerpt, location, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <>
      <PageHero
        eyebrow="Stories of Change"
        title="Real People. Real Hope."
        description="Every story here is shared with the permission of the person it belongs to. We change no names to protect no one — dignity includes being heard."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Success Stories' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          {stories.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((s, i) => (
                <Reveal key={s.id} delay={(i % 3) * 80}>
                  <Link href={`/stories/${s.slug}`} className="card-surface group block h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex h-40 items-center justify-center bg-beige">
                      <HandHeartIcon />
                    </div>
                    <div className="p-6">
                      {s.location && <p className="text-xs uppercase tracking-wider text-gold-500">{s.location}</p>}
                      <h3 className="mt-2 text-lg font-semibold text-forest-800">{s.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal/65">{s.excerpt}</p>
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
              <h2 className="text-2xl font-semibold text-forest-800">Stories Coming Soon</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                We will only publish stories that are true and told with the consent of the people in
                them. The first stories will appear here as the foundation's work begins.
              </p>
              <div className="mt-8 text-left">
                <PlaceholderNotice>
                  Success stories are added by foundation administrators and reviewed for consent before
                  publication.
                </PlaceholderNotice>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBanner
        title="The Next Story Could Be Yours to Tell."
        description="Support a family today and help write the story of a community's recovery."
        href="/donate"
      />
    </>
  );
}

function HandHeartIcon() {
  return (
    <svg className="h-10 w-10 text-forest-600/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M12 3c-1.5 2-4.5 3.5-4.5 6.5 0 1.8 1.3 3 2.8 3 .7 0 1.3-.2 1.7-.7-.1 1.8-.8 3.2-2 4.2h4c-1.2-1-1.9-2.4-2-4.2.4.5 1 .7 1.7.7 1.5 0 2.8-1.2 2.8-3C16.5 6.5 13.5 5 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 17.5c2 1.5 5 2.5 8 2.5s6-1 8-2.5" strokeLinecap="round" />
    </svg>
  );
}
