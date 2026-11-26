import type { Metadata } from 'next';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { ProgramCard } from '@/components/program-card';
import { Reveal } from '@/components/reveal';
import { getSupabase } from '@/lib/supabase';
import type { ProgramLike } from '@/components/program-card';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Programs',
  description:
    'Explore the humanitarian programs of Upper Hands Foundation: education, healthcare, food assistance, orphan support, clean water, emergency relief and community welfare.',
};

async function getPrograms(): Promise<(ProgramLike & { id: string })[]> {
  try {
    const { data } = await getSupabase()
      .from('programs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        title="Comprehensive Care for Every Need"
        description="From a child's education to a family's next meal, our programs cover the essential building blocks of a dignified life. Each one is designed with the communities it serves."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Our Programs' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          {programs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((p, i) => (
                <ProgramCard key={p.slug} program={p} index={i} />
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-xl text-center">
              <p className="rounded-2xl border border-dashed border-gold-400/60 bg-gold-100/30 px-6 py-10 text-sm text-charcoal/65">
                Program details will be published here once confirmed by the foundation.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="bg-beige/60 py-16">
        <div className="container-wide">
          <SectionHeading
            eyebrow="A Note on Accuracy"
            title="Only Verified Programs Are Shown"
            description="We list only programs that are formally confirmed by the foundation. As new programs are verified and activated, they will appear here."
          />
        </div>
      </section>

      <CtaBanner
        title="Fund the Program Closest to Your Heart."
        description="Choose a cause when you donate, and your gift is directed to that program."
        href="/donate"
      />
    </>
  );
}
