import type { Metadata } from 'next';
import { Compass, Eye, HeartHandshake } from 'lucide-react';
import { PageHero, CtaBanner, SectionHeading } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { InfoCard } from '@/components/page-parts';

export const metadata: Metadata = {
  title: 'Mission & Vision',
  description:
    'The mission and vision of Upper Hands Foundation: relieving suffering with dignity and building self-reliant communities across Pakistan.',
};

export default function MissionVisionPage() {
  return (
    <>
      <PageHero
        eyebrow="Mission & Vision"
        title="Our Purpose and Our Direction"
        description="Two commitments guide every program, every rupee and every hour given to this foundation."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Mission & Vision' }]}
      />

      <section className="section-padding">
        <div className="container-wide grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl bg-forest-800 p-10 text-white">
              <HeartHandshake className="h-10 w-10 text-gold-300" />
              <h2 className="mt-5 font-serif text-3xl font-semibold">Our Mission</h2>
              <p className="mt-4 leading-relaxed text-white/75">
                To relieve immediate suffering with dignity and speed, and to invest in the education,
                health and self-reliance of underserved communities across Pakistan, so that help given
                today becomes strength that lasts.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                {[
                  'Provide food, shelter and medical relief to families in crisis.',
                  'Keep children in school with resources, mentorship and support.',
                  'Deliver clean water and basic necessities to underserved areas.',
                  'Respond rapidly and responsibly when disasters strike.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-300" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-gold-300/60 bg-gold-100/40 p-10">
              <Eye className="h-10 w-10 text-gold-500" />
              <h2 className="mt-5 font-serif text-3xl font-semibold text-charcoal">Our Vision</h2>
              <p className="mt-4 leading-relaxed text-charcoal/70">
                A Pakistan where no family sleeps hungry, no child is denied learning, no patient is
                refused care for lack of means, and where compassion is organized, accountable, and
                within everyone's reach.
              </p>
              <ul className="mt-8 space-y-3 text-sm text-charcoal/70">
                {[
                  'Communities that can stand on their own after our work is done.',
                  'Donors who can see exactly what their generosity achieved.',
                  'A culture of giving that spans Pakistan and its diaspora.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-beige/60 py-16 sm:py-20">
        <div className="container-wide">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Principles in Practice"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { icon: HeartHandshake, title: 'Dignity Always', text: 'Assistance is delivered respectfully and privately, preserving the pride of those we serve.' },
              { icon: Compass, title: 'Local First', text: 'We hire, source and decide locally, so every program fits the community it serves.' },
              { icon: Eye, title: 'Open Books', text: 'Financial summaries and program reports are published for every supporter to examine.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <InfoCard icon={v.icon} title={v.title}>{v.text}</InfoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
