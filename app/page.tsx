import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpen,
  FileText,
  HandHeart,
  Handshake,
  Heart,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { DonationForm } from '@/components/donation-form';
import { NewsletterForm } from '@/components/newsletter-form';
import { ProgramCard, programIcons } from '@/components/program-card';
import { AnimatedCounter } from '@/components/animated-counter';
import { Reveal } from '@/components/reveal';
import { SectionHeading, CtaBanner } from '@/components/sections';
import { getSupabase } from '@/lib/supabase';
import type { ProgramLike } from '@/components/program-card';

export const dynamic = 'force-dynamic';

async function getHomeData() {
  try {
    const supabase = getSupabase();
    const [programsRes, projectsRes, statsRes, storiesRes, postsRes, docsRes] = await Promise.all([
      supabase.from('programs').select('*').eq('is_active', true).order('sort_order'),
      supabase.from('projects').select('*').in('status', ['active', 'completed']).order('created_at', { ascending: false }).limit(3),
      supabase.from('impact_stats').select('*').eq('is_verified', true).order('sort_order'),
      supabase.from('stories').select('slug, title, excerpt, location, created_at').eq('is_published', true).limit(3),
      supabase.from('posts').select('slug, title, excerpt, category, published_at, image_url').eq('is_published', true).order('published_at', { ascending: false }).limit(3),
      supabase.from('documents').select('title, category, year, file_url').limit(6),
    ]);
    return {
      programs: (programsRes.data ?? []) as (ProgramLike & { id: string })[],
      projects: projectsRes.data ?? [],
      stats: statsRes.data ?? [],
      stories: storiesRes.data ?? [],
      posts: postsRes.data ?? [],
      docs: docsRes.data ?? [],
    };
  } catch {
    return { programs: [], projects: [], stats: [], stories: [], posts: [], docs: [] };
  }
}

const values = [
  { icon: HandHeart, title: 'Compassion', text: 'We lead with empathy, treating every person we serve with dignity and respect.' },
  { icon: ShieldCheck, title: 'Integrity', text: 'We hold ourselves to the highest standards of honesty and accountability.' },
  { icon: Sparkles, title: 'Impact', text: 'We focus on meaningful, lasting change — not one-off gestures.' },
  { icon: Handshake, title: 'Community', text: 'We work hand in hand with the communities we serve, never apart from them.' },
];

export default async function HomePage() {
  const { programs, projects, stats, stories, posts, docs } = await getHomeData();

  return (
    <>
      {/* ============ A. HERO ============ */}
      <section className="relative overflow-hidden bg-forest-900 text-white">
        <div className="absolute inset-0 pattern-dots opacity-30" aria-hidden />
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-forest-600/25 blur-3xl" aria-hidden />
        <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-gold-400/10 blur-3xl" aria-hidden />
        <div className="absolute right-8 top-16 hidden h-40 w-40 rotate-12 rounded-3xl border border-gold-400/20 lg:block" aria-hidden />
        <div className="absolute right-24 bottom-20 hidden h-24 w-24 -rotate-6 rounded-2xl border border-white/10 lg:block" aria-hidden />
        <div className="container-wide relative grid items-center gap-12 py-20 sm:py-24 lg:grid-cols-2 lg:py-28">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-1.5 text-xs font-medium tracking-wide text-gold-300">
                <Sparkles className="h-3.5 w-3.5" />
                Upper Hands Foundation — Pakistan
              </span>
            </Reveal>
            <Reveal delay={100}>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.12] text-balance sm:text-5xl lg:text-6xl">
                Together, We Can Make a{' '}
                <span className="relative whitespace-nowrap text-gold-300">
                  Difference
                  <svg className="absolute -bottom-2 left-0 w-full text-gold-400/60" viewBox="0 0 200 12" fill="none" aria-hidden>
                    <path d="M2 9C60 3 140 3 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                At Upper Hands Foundation, we believe every individual deserves dignity, opportunity, and a
                better tomorrow. Together, we can bring hope, support communities, and transform lives.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link href="/donate" className="btn-gold group">
                  <Heart className="h-4 w-4" />
                  Donate Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link href="/about" className="btn-ghost-light">
                  Explore Our Mission
                </Link>
              </div>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/60">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-gold-300" /> Transparent & accountable
                </span>
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gold-300" /> Community-driven
                </span>
                <span className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gold-300" /> Registered welfare organization
                </span>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal delay={200}>
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-forest-800 shadow-2xl">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                </div>
                <div className="p-6 sm:p-8">
                  <DonationForm dark />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ C. ABOUT ============ */}
      <section className="section-padding">
        <div className="container-wide grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl border-2 border-gold-400/40" aria-hidden />
              <div className="relative overflow-hidden rounded-3xl bg-forest-800 p-8 sm:p-10">
                <div className="pattern-grid absolute inset-0 opacity-40" aria-hidden />
                <blockquote className="relative">
                  <p className="font-serif text-2xl font-medium leading-snug text-white sm:text-3xl">
                    “No one has ever become poor by giving.”
                  </p>
                  <footer className="mt-6 flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-400/20 text-gold-300">
                      <HandHeart className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-medium text-white">Upper Hands Foundation</span>
                      <span className="block text-sm text-white/60">A promise of dignity for all</span>
                    </span>
                  </footer>
                </blockquote>
                <div className="relative mt-10 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/5 p-5">
                    <Target className="h-5 w-5 text-gold-300" />
                    <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white">Our Mission</h3>
                    <p className="mt-2 text-sm text-white/65">Relieve suffering today, while building self-reliance for tomorrow.</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-5">
                    <Sparkles className="h-5 w-5 text-gold-300" />
                    <h3 className="mt-3 text-sm font-semibold uppercase tracking-wider text-white">Our Vision</h3>
                    <p className="mt-2 text-sm text-white/65">A Pakistan where no one is left behind by hardship alone.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <div>
            <Reveal>
              <span className="eyebrow">About Upper Hands Foundation</span>
              <h2 className="mt-3 text-3xl font-semibold text-balance text-forest-800 sm:text-4xl">
                Driven by Compassion. Committed to Humanity.
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-5 leading-relaxed text-charcoal/70">
                Upper Hands Foundation is a charitable and humanitarian welfare organization based in Pakistan.
                We exist to stand beside individuals and families in their hardest moments — with food for the
                hungry, care for the sick, learning for children, and hope for communities working toward a
                better future.
              </p>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Our name reflects our belief: when one hand reaches up in struggle, another hand must reach
                down to hold it. Together, those hands are strong enough to change a life.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {values.map((v) => (
                  <div key={v.title} className="flex gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
                      <v.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <h3 className="font-medium text-charcoal">{v.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-charcoal/60">{v.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={300}>
              <Link href="/about" className="btn-primary mt-9 group">
                Read More
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ D. PROGRAMS ============ */}
      <section className="bg-beige/60 py-16 sm:py-20 lg:py-24 pattern-dots">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Our Core Programs"
            title="Where Your Kindness Works"
            description="Each program addresses a fundamental need — chosen carefully, delivered with dignity, and measured by changed lives."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {programs.map((p, i) => (
              <ProgramCard key={p.slug} program={p} index={i} />
            ))}
          </div>
          {programs.length === 0 && (
            <p className="mt-10 text-center text-sm text-charcoal/55">
              Program details will be published here once confirmed by the foundation.
            </p>
          )}
        </div>
      </section>

      {/* ============ E. FEATURED PROJECTS ============ */}
      {projects.length > 0 && (
        <section className="section-padding">
          <div className="container-wide">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                align="left"
                eyebrow="Featured Projects & Campaigns"
                title="Active Campaigns"
                description="Follow the progress of fundraising campaigns as they happen."
              />
              <Reveal delay={100}>
                <Link href="/projects" className="btn-outline shrink-0 group">
                  View All Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {projects.slice(0, 3).map((p: any, i: number) => {
                const target = Number(p.target_amount_pkr) || 0;
                const raised = Number(p.raised_amount_pkr) || 0;
                const pct = target > 0 ? Math.min(100, Math.round((raised / target) * 100)) : 0;
                return (
                  <Reveal key={p.slug} delay={i * 80}>
                    <Link href={`/projects/${p.slug}`} className="card-surface group block h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <div className="relative flex h-44 items-center justify-center bg-forest-800">
                        <div className="pattern-grid absolute inset-0 opacity-50" aria-hidden />
                        <BookOpen className="relative h-10 w-10 text-gold-300/70" />
                        <span className="absolute right-3 top-3 rounded-full bg-gold-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-charcoal">
                          {p.status === 'completed' ? 'Completed' : 'Active'}
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-forest-800">{p.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm text-charcoal/65">{p.summary}</p>
                        {target > 0 && (
                          <>
                            <div className="mt-4 flex justify-between text-xs text-charcoal/60">
                              <span className="font-medium text-forest-700">PKR {raised.toLocaleString()}</span>
                              <span>of PKR {target.toLocaleString()}</span>
                            </div>
                            <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                              <div className="h-full rounded-full bg-forest-600" style={{ width: `${pct}%` }} />
                            </div>
                          </>
                        )}
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ F. IMPACT ============ */}
      <section className="bg-forest-800 py-16 sm:py-20 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            dark
            eyebrow="Our Impact"
            title="Every Number Is a Person Helped"
            description="These figures will be published only after verification by the foundation. Until then, they appear as clearly marked placeholders."
          />
          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((s: any, i: number) => (
              <Reveal key={s.key} delay={i * 80} className="text-center">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="font-serif text-3xl font-semibold text-gold-300 sm:text-4xl">
                    <AnimatedCounter value={s.value} suffix={s.suffix ?? '+'} />
                  </p>
                  <p className="mt-2 text-sm text-white/70">{s.label}</p>
                </div>
              </Reveal>
            ))}
            {stats.length === 0 && (
              <Reveal className="col-span-full text-center">
                <p className="mx-auto max-w-md rounded-2xl border border-dashed border-gold-400/50 bg-white/5 px-6 py-8 text-sm text-white/60">
                  Impact statistics will appear here once the foundation provides verified figures.
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* ============ G. STORIES ============ */}
      {stories.length > 0 && (
        <section className="section-padding">
          <div className="container-wide">
            <SectionHeading
              eyebrow="Stories of Change"
              title="Real People. Real Hope."
              description="Stories shared with the permission of those who lived them."
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {stories.map((s: any, i: number) => (
                <Reveal key={s.slug} delay={i * 80}>
                  <Link href={`/stories/${s.slug}`} className="card-surface group block h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex h-40 items-center justify-center bg-beige">
                      <HandHeart className="h-9 w-9 text-forest-600/60" />
                    </div>
                    <div className="p-6">
                      {s.location && <p className="text-xs uppercase tracking-wider text-gold-500">{s.location}</p>}
                      <h3 className="mt-2 text-lg font-semibold text-forest-800">{s.title}</h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-charcoal/65">{s.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest-600">
                        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ H. GET INVOLVED ============ */}
      <section className="bg-beige/60 py-16 sm:py-20 lg:py-24">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Get Involved"
            title="Be the Hand That Helps"
            description="There are many ways to be part of this mission — with your time, your skills, your resources, or your voice."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: 'Become a Volunteer',
                text: 'Join our field teams, help organize distributions, teach, or support operations.',
                href: '/get-involved/volunteer',
                cta: 'Apply to Volunteer',
              },
              {
                icon: Handshake,
                title: 'Become a Partner',
                text: 'Businesses and organizations can amplify our reach through partnerships.',
                href: '/get-involved/partnerships',
                cta: 'Partner With Us',
              },
              {
                icon: Heart,
                title: 'Support Our Mission',
                text: 'Give once or monthly. Every rupee is directed to the cause you choose.',
                href: '/donate',
                cta: 'Donate Now',
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="card-surface group flex h-full flex-col p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
                    <c.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-forest-800">{c.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal/65">{c.text}</p>
                  <Link href={c.href} className="btn-outline mt-6 w-fit group">
                    {c.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ I. TRANSPARENCY ============ */}
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Transparency & Trust"
            title="Accountability You Can Verify"
            description="Trust is earned in the open. Registration documents, reports and financial statements will be published here as the foundation releases them."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: FileText, title: 'Registration & Legal Documents', note: 'To be published' },
              { icon: BookOpen, title: 'Annual Reports', note: 'To be published' },
              { icon: ShieldCheck, title: 'Financial Statements & Audits', note: 'To be published' },
              { icon: Users, title: 'Governance & Leadership', note: 'To be announced' },
              { icon: Target, title: 'Donation Utilization', note: 'To be published' },
              { icon: Award, title: 'Certifications', note: 'To be announced' },
            ].map((d, i) => (
              <Reveal key={d.title} delay={(i % 3) * 80}>
                <div className="flex items-start gap-4 rounded-2xl border border-border/70 bg-white p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
                    <d.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="font-medium text-charcoal">{d.title}</h3>
                    <p className="mt-1 text-xs text-charcoal/50">{d.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          {docs.length > 0 && (
            <Reveal delay={100}>
              <div className="mt-8 rounded-2xl border border-gold-300/50 bg-gold-100/30 p-6">
                <h3 className="font-medium text-charcoal">Recently Published Documents</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {docs.map((d: any, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-charcoal/70">
                      <FileText className="h-4 w-4 text-forest-600" />
                      {d.title} {d.year ? `(${d.year})` : ''}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
          <Reveal delay={150}>
            <div className="mt-8 text-center">
              <Link href="/about/transparency" className="btn-outline group">
                View Transparency Center
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ J. NEWS ============ */}
      {posts.length > 0 && (
        <section className="bg-beige/60 py-16 sm:py-20 lg:py-24">
          <div className="container-wide">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading
                align="left"
                eyebrow="Latest News & Updates"
                title="From the Field"
              />
              <Reveal delay={100}>
                <Link href="/news" className="btn-outline shrink-0 group">
                  All News
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Reveal>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {posts.map((p: any, i: number) => (
                <Reveal key={p.slug} delay={i * 80}>
                  <Link href={`/news/${p.slug}`} className="card-surface group block h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="flex h-40 items-center justify-center bg-forest-800">
                      <span className="relative rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-gold-300">
                        {p.category}
                      </span>
                    </div>
                    <div className="p-6">
                      <time className="text-xs text-charcoal/50">
                        {new Date(p.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                      <h3 className="mt-2 text-lg font-semibold leading-snug text-forest-800">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-charcoal/65">{p.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-forest-600">
                        Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============ B. DONATION BANNER + K. NEWSLETTER ============ */}
      <section className="relative overflow-hidden bg-forest-900 py-16 sm:py-20">
        <div className="absolute inset-0 pattern-grid opacity-40" aria-hidden />
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl" aria-hidden />
        <div className="container-wide relative grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow !text-gold-300 before:bg-gold-300">Newsletter</span>
            <h2 className="mt-3 text-3xl font-semibold text-balance text-white sm:text-4xl">
              Stay Close to the Mission
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/70">
              Get updates on our work, field reports and upcoming campaigns — straight to your inbox.
            </p>
            <div className="mt-8 max-w-md">
              <NewsletterForm />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <span className="eyebrow !text-gold-300 before:bg-gold-300">Zakat & Sadqah</span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-white">
                Your Zakat, Delivered With Dignity
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Zakat and Sadqah contributions are allocated with strict care to eligible families and
                documented usage. Choose “Zakat” or “Sadqah” in the donation form to direct your gift.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-white/60">
                <div className="rounded-xl bg-white/5 p-3">
                  <BookOpen className="mx-auto h-4 w-4 text-gold-300" />
                  <p className="mt-1.5">Documented</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <ShieldCheck className="mx-auto h-4 w-4 text-gold-300" />
                  <p className="mt-1.5">Eligibility Checked</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3">
                  <Heart className="mx-auto h-4 w-4 text-gold-300" />
                  <p className="mt-1.5">Dignity First</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <CtaBanner />
    </>
  );
}
