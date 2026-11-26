import type { Metadata } from 'next';
import { Building2, Handshake, TrendingUp, Users } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { InfoCard } from '@/components/page-parts';
import { PartnershipForm } from '@/components/involvement-forms';

export const metadata: Metadata = {
  title: 'Partnerships',
  description:
    'Partner with Upper Hands Foundation — corporate CSR, in-kind support and joint humanitarian programs across Pakistan.',
};

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Partnerships That Multiply Good"
        description="Businesses, foundations and community organizations can extend this mission further than any of us could alone."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Get Involved', href: '/get-involved' }, { label: 'Partnerships' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Ways to Partner"
            title="Choose What Fits Your Organization"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, title: 'Corporate CSR', text: 'Fund programs that match your values, with full reporting for your stakeholders.' },
              { icon: Handshake, title: 'In-Kind Support', text: 'Contribute goods, services, logistics or professional expertise.' },
              { icon: Users, title: 'Joint Programs', text: 'Co-design and co-deliver community programs with our field teams.' },
              { icon: TrendingUp, title: 'Matching Gifts', text: 'Match your employees\' donations to multiply their impact.' },
            ].map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 80}>
                <InfoCard icon={v.icon} title={v.title}>{v.text}</InfoCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-beige/60 py-16 sm:py-20">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              eyebrow="Start the Conversation"
              title="Tell Us About Your Organization"
              description="Share a few details and our partnerships team will contact you to explore how we can work together."
            />
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <PartnershipForm />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
