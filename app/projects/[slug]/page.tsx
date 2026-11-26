import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Heart, Target } from 'lucide-react';
import { PageHero, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

type Project = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  status: string;
  target_amount_pkr: string | number;
  raised_amount_pkr: string | number;
  created_at: string;
};

async function getProject(slug: string): Promise<Project | null> {
  try {
    const { data } = await getSupabase()
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .in('status', ['active', 'completed'])
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
  const project = await getProject(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const target = Number(project.target_amount_pkr) || 0;
  const raised = Number(project.raised_amount_pkr) || 0;
  const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
  const isActive = project.status === 'active';

  return (
    <>
      <PageHero
        eyebrow={isActive ? 'Active Campaign' : 'Completed Campaign'}
        title={project.title}
        description={project.summary}
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Projects', href: '/projects' }, { label: project.title }]}
      />

      <section className="section-padding">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <div className="space-y-4 leading-relaxed text-charcoal/70">
                {(project.description || project.summary)
                  .split('\n')
                  .filter(Boolean)
                  .map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 flex items-center gap-2 text-sm text-charcoal/55">
                <Calendar className="h-4 w-4" />
                Campaign launched{' '}
                {new Date(project.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <Link href="/projects" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-700">
                <ArrowLeft className="h-4 w-4" />
                Back to All Projects
              </Link>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <aside className="sticky top-24 space-y-5">
              <div className="rounded-3xl border border-border/70 bg-white p-8 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm font-medium text-charcoal/70">
                    <Target className="h-4 w-4 text-forest-600" /> Fundraising Progress
                  </span>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${isActive ? 'bg-gold-100 text-gold-600' : 'bg-forest-50 text-forest-700'}`}>
                    {isActive ? 'Active' : 'Completed'}
                  </span>
                </div>
                {target > 0 ? (
                  <>
                    <div className="mt-5">
                      <div className="flex items-baseline justify-between">
                        <p className="font-serif text-3xl font-semibold text-forest-800">
                          PKR {raised.toLocaleString()}
                        </p>
                        <p className="text-sm text-charcoal/55">raised</p>
                      </div>
                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-forest-600" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-charcoal/55">
                        <span>{pct}% of goal</span>
                        <span>Goal: PKR {target.toLocaleString()}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-charcoal/60">
                    Fundraising figures for this campaign will be published once verified by the foundation.
                  </p>
                )}
                {isActive && (
                  <Link href="/donate" className="btn-primary mt-6 w-full group">
                    <Heart className="h-4 w-4" />
                    Donate to This Campaign
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                )}
              </div>
              <div className="rounded-3xl bg-beige/70 p-6 text-sm leading-relaxed text-charcoal/65">
                Figures shown are updated by the foundation. Choosing this campaign during donation helps
                direct funds here.
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
