import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Compass, Eye, HandHeart, HeartHandshake, ShieldCheck, Users } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { InfoCard, PlaceholderNotice } from '@/components/page-parts';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Upper Hands Foundation, a humanitarian welfare organization based in Pakistan working to bring hope and dignity to communities in need.',
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Driven by Compassion. Committed to Humanity."
        description="Upper Hands Foundation is a charitable and humanitarian welfare organization based in Pakistan, founded on a simple belief: no one should face hardship alone."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
      />

      <section className="section-padding">
        <div className="container-wide grid items-start gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="eyebrow">Our Story</span>
              <h2 className="mt-3 text-3xl font-semibold text-forest-800">Why “Upper Hands”?</h2>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-5 space-y-4 leading-relaxed text-charcoal/70">
                <p>
                  The name comes from a simple image: when someone is struggling, their hand reaches up.
                  Our work begins the moment another hand reaches down to hold it. Two hands joined, one
                  in need and one willing, are the foundation of everything we do.
                </p>
                <p>
                  Upper Hands Foundation is a welfare organization based in Pakistan, established to serve
                  people affected by poverty, displacement, illness and disaster, regardless of their
                  background, community or creed.
                </p>
                <p>
                  We are building an organization measured not by what we distribute, but by the lives that
                  regain stability and dignity: a family that eats, a child who learns, a patient who is
                  treated, a community that recovers.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8">
                <PlaceholderNotice>
                  Official registration number, founding date and legal status will be published here once
                  confirmed by the foundation.
                </PlaceholderNotice>
              </div>
            </Reveal>
          </div>
          <div className="space-y-5">
            <Reveal delay={100}>
              <div className="rounded-3xl bg-forest-800 p-8 text-white">
                <HeartHandshake className="h-8 w-8 text-gold-300" />
                <h3 className="mt-4 font-serif text-2xl font-semibold">Mission Statement</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  To relieve immediate suffering with dignity and speed, and to invest in the education,
                  health and self-reliance of underserved communities across Pakistan, so that help given
                  today becomes strength that lasts.
                </p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="rounded-3xl border border-gold-300/60 bg-gold-100/40 p-8">
                <Eye className="h-8 w-8 text-gold-500" />
                <h3 className="mt-4 font-serif text-2xl font-semibold text-charcoal">Vision Statement</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  A Pakistan where no family sleeps hungry, no child is denied learning, no patient is
                  refused care for lack of means, and where compassion is organized, accountable, and
                  within everyone's reach.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-beige/60 py-16 sm:py-20">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Core Values"
            title="The Principles Behind Every Decision"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: HandHeart, title: 'Compassion First', text: 'Every decision starts with empathy for the person in front of us.' },
              { icon: ShieldCheck, title: 'Radical Transparency', text: 'Donors deserve to know where every rupee goes. We publish, document and audit.' },
              { icon: Users, title: 'Dignity in Service', text: 'We serve people as equals, never as cases. Assistance preserves pride.' },
              { icon: Compass, title: 'Lasting Impact', text: 'We favor programs that create self-reliance over one-time handouts.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <InfoCard icon={v.icon} title={v.title}>{v.text}</InfoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="How We Work"
            title="From Donation to Dignity"
            description="Our delivery model keeps overhead low and accountability high at every step."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              { step: '01', title: 'Identify', text: 'Local teams assess needs through community visits and verified referrals.' },
              { step: '02', title: 'Plan', text: 'Assistance is designed with the community, including its scope, budget and timeline.' },
              { step: '03', title: 'Deliver', text: 'Distribution happens in the open, with documentation at each step.' },
              { step: '04', title: 'Report', text: 'Results and finances are published for every supporter to see.' },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <div className="relative h-full rounded-2xl border border-border/70 bg-white p-7">
                  <span className="font-serif text-4xl font-semibold text-gold-400/60">{s.step}</span>
                  <h3 className="mt-3 text-lg font-semibold text-forest-800">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={100}>
            <div className="mt-10 text-center">
              <Link href="/about/leadership" className="btn-primary group">
                Meet Our Leadership
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
