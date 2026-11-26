import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Heart, Target } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { PlaceholderNotice } from '@/components/page-parts';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects & Campaigns',
  description:
    'Current and past fundraising projects and campaigns by Upper Hands Foundation. Follow progress and support the cause that moves you.',
};

type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: string;
  target_amount_pkr: string | number;
  raised_amount_pkr: string | number;
};

async function getProjects(): Promise<Project[]> {
  try {
    const { data } = await getSupabase()
      .from('projects')
      .select('id, slug, title, summary, status, target_amount_pkr, raised_amount_pkr')
      .in('status', ['active', 'completed'])
      .order('created_at', { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  const active = projects.filter((p) => p.status === 'active');
  const completed = projects.filter((p) => p.status === 'completed');

  const renderCard = (p: Project, i: number) => {
    const target = Number(p.target_amount_pkr) || 0;
    const raised = Number(p.raised_amount_pkr) || 0;
    const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
    return (
      <Reveal key={p.id} delay={(i % 3) * 80}>
        <Link href={`/projects/${p.slug}`} className="card-surface group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
          <div className="relative flex h-40 items-center justify-center bg-forest-800">
            <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden />
            <Target className="relative h-9 w-9 text-gold-300/70" />
            <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${p.status === 'completed' ? 'bg-white text-forest-800' : 'bg-gold-400 text-charcoal'}`}>
              {p.status === 'completed' ? 'Completed' : 'Active'}
            </span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-lg font-semibold text-forest-800">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/65">{p.summary}</p>
            {target > 0 && (
              <>
                <div className="mt-4 flex justify-between text-xs text-charcoal/60">
                  <span className="font-medium text-forest-700">PKR {raised.toLocaleString()}</span>
                  <span>of PKR {target.toLocaleString()}</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-forest-600 transition-all" style={{ width: `${pct}%` }} />
                </div>
                <p className="mt-1.5 text-right text-xs font-medium text-gold-500">{pct}% funded</p>
              </>
            )}
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest-600">
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </Reveal>
    );
  };

  return (
    <>
      <PageHero
        eyebrow="Projects & Campaigns"
        title="Campaigns You Can Stand Behind"
        description="Every campaign shows its goal, progress and outcome so you know what your support achieved."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Projects & Campaigns' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          {projects.length === 0 ? (
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-forest-800">No Active Campaigns Yet</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                Fundraising campaigns will appear here once the foundation launches them with verified
                targets and account details.
              </p>
              <div className="mt-8 text-left">
                <PlaceholderNotice>
                  Projects are managed by foundation administrators. When a campaign is published here,
                  its fundraising figures are shown only after verification.
                </PlaceholderNotice>
              </div>
              <Link href="/donate" className="btn-primary mt-8">
                <Heart className="h-4 w-4" />
                Donate to the General Fund
              </Link>
            </div>
          ) : (
            <>
              {active.length > 0 && (
                <>
                  <SectionHeading align="left" eyebrow="Active Now" title="Current Campaigns" />
                  <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {active.map(renderCard)}
                  </div>
                </>
              )}
              {completed.length > 0 && (
                <>
                  <div className="mt-16">
                    <SectionHeading align="left" eyebrow="Completed" title="Past Campaigns" />
                  </div>
                  <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {completed.map(renderCard)}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
