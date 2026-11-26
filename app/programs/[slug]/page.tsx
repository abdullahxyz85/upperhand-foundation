import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, HandHeart, Heart, Info } from 'lucide-react';
import { PageHero, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { ProgramCard, programIcons } from '@/components/program-card';
import { getSupabase } from '@/lib/supabase';
import type { ProgramLike } from '@/components/program-card';

export const dynamic = 'force-dynamic';

type FullProgram = ProgramLike & {
  id: string;
  description: string;
  is_active: boolean;
};

async function getProgram(slug: string): Promise<FullProgram | null> {
  try {
    const { data } = await getSupabase()
      .from('programs')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

async function getOthers(slug: string): Promise<FullProgram[]> {
  try {
    const { data } = await getSupabase()
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .neq('slug', slug)
      .order('sort_order')
      .limit(3);
    return data ?? [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const program = await getProgram(params.slug);
  if (!program) return { title: 'Program Not Found' };
  return {
    title: program.title,
    description: program.summary,
  };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const program = await getProgram(params.slug);
  if (!program) notFound();

  const Icon = programIcons[program.icon] ?? HandHeart;
  const others = await getOthers(params.slug);

  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        title={program.title}
        description={program.summary}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Programs', href: '/programs' }, { label: program.title }]}
      />

      <section className="section-padding">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="flex items-center gap-5">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-forest-700 text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <h2 className="font-serif text-2xl font-semibold text-forest-800 sm:text-3xl">
                  About This Program
                </h2>
              </div>
              <div className="mt-6 space-y-4 leading-relaxed text-charcoal/70">
                {(program.description || program.summary)
                  .split('\n')
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 flex items-start gap-3 rounded-2xl border border-gold-300/60 bg-gold-100/30 p-5">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                <p className="text-sm leading-relaxed text-charcoal/70">
                  This page presents the foundation's planned scope of work. Specific activities,
                  locations and statistics will be published here as they are verified and activated
                  by the foundation.
                </p>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <Link href="/programs" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-700">
                <ArrowLeft className="h-4 w-4" />
                Back to All Programs
              </Link>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <aside className="sticky top-24 rounded-3xl bg-forest-800 p-8 text-white">
              <Heart className="h-8 w-8 text-gold-300" />
              <h3 className="mt-4 font-serif text-2xl font-semibold">Support This Program</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Direct your donation to {program.title} — choose this cause in the donation form and
                your gift will be allocated to it.
              </p>
              <Link href="/donate" className="btn-gold mt-6 w-full group">
                Donate Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link href="/get-involved/volunteer" className="btn-ghost-light mt-3 w-full">
                Volunteer Instead
              </Link>
            </aside>
          </Reveal>
        </div>
      </section>

      {others.length > 0 && (
        <section className="bg-beige/60 py-16">
          <div className="container-wide">
            <h2 className="font-serif text-2xl font-semibold text-forest-800">Explore Other Programs</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((p, i) => (
                <ProgramCard key={p.slug} program={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner />
    </>
  );
}
