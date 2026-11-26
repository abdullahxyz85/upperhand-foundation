import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Handshake, Heart, Users } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';

export const metadata: Metadata = {
  title: 'Get Involved',
  description:
    'Volunteer, partner or donate. Every action supports Upper Hands Foundation and the communities we serve across Pakistan.',
};

export default function GetInvolvedPage() {
  const cards = [
    {
      icon: Users,
      title: 'Become a Volunteer',
      text: 'Give your time and skills in field teams, teaching, medical support, logistics or outreach. Every pair of hands counts.',
      href: '/get-involved/volunteer',
      cta: 'Apply to Volunteer',
    },
    {
      icon: Handshake,
      title: 'Become a Partner',
      text: 'Businesses and organizations can support programs, match gifts, contribute in-kind, or co-design community initiatives.',
      href: '/get-involved/partnerships',
      cta: 'Explore Partnerships',
    },
    {
      icon: Heart,
      title: 'Support Our Mission',
      text: 'Give once or monthly, and choose the cause closest to your heart, from food assistance to Zakat.',
      href: '/donate',
      cta: 'Donate Now',
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Be the Hand That Helps"
        description="This mission is carried by ordinary people doing extraordinary things. There is a place here for your time, your skills and your generosity."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Get Involved' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Three Ways to Join"
            title="Choose How You Want to Help"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div className="card-surface group flex h-full flex-col p-8 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gold-100 text-gold-600">
                    <c.icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-forest-800">{c.title}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal/65">{c.text}</p>
                  <Link href={c.href} className="btn-outline mt-6 w-fit">
                    {c.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
