import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { AnimatedCounter } from '@/components/animated-counter';
import { Reveal } from '@/components/reveal';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'The measurable impact of Upper Hands Foundation, including lives impacted, families supported, projects completed and communities reached across Pakistan.',
};

type Stat = { id: string; key: string; label: string; value: number; suffix: string };

async function getStats(): Promise<Stat[]> {
  try {
    const { data } = await getSupabase()
      .from('impact_stats')
      .select('id, key, label, value, suffix')
      .eq('is_verified', true)
      .order('sort_order');
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function ImpactPage() {
  const stats = await getStats();

  return (
    <>
      <PageHero
        eyebrow="Our Impact"
        title="Every Number Is a Person Helped"
        description="Impact is only meaningful if it is true. We publish figures here exclusively after the foundation verifies them."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Our Impact' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          {stats.length > 0 ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {stats.map((s, i) => (
                <Reveal key={s.key} delay={(i % 5) * 80} className="text-center">
                  <div className="card-surface p-7">
                    <p className="font-serif text-3xl font-semibold text-forest-700 sm:text-4xl">
                      <AnimatedCounter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-sm text-charcoal/65">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-forest-800">Verified Figures Coming Soon</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                We will never estimate our own impact. As programs complete and are audited, verified
                statistics will appear here, with the period they cover clearly stated.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-beige/60 py-16">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How We Count"
            title="Our Measurement Principles"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Verified Before Published', text: 'Statistics appear only after internal review and, where applicable, independent audit.' },
              { title: 'People, Not Just Outputs', text: 'We track outcomes such as families stabilized and children still in school, not only items distributed.' },
              { title: 'Period Clearly Stated', text: 'Every figure states the time range and program it covers, so nothing is ambiguous.' },
            ].map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="card-surface h-full p-7">
                  <span className="font-serif text-3xl font-semibold text-gold-400/70">0{i + 1}</span>
                  <h3 className="mt-3 text-lg font-semibold text-forest-800">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <div className="mt-10 text-center">
              <Link href="/about/transparency" className="btn-outline group">
                See How We Report
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Be Part of the Next Number."
        description="The next life changed could be counted because of you."
        href="/donate"
      />
    </>
  );
}
