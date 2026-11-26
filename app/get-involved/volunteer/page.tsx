import type { Metadata } from 'next';
import { HandHeart, HeartHandshake, Users } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { InfoCard } from '@/components/page-parts';
import { VolunteerForm } from '@/components/involvement-forms';

export const metadata: Metadata = {
  title: 'Become a Volunteer',
  description:
    'Volunteer with Upper Hands Foundation. Give your time and skills to food drives, education support, medical camps and community welfare across Pakistan.',
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Become a Volunteer"
        description="The most valuable gift you can give is yourself. Join the hands that make this mission possible."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Get Involved', href: '/get-involved' }, { label: 'Volunteer' }]}
      />

      <section className="section-padding">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionHeading
              align="left"
              eyebrow="Why Volunteer"
              title="Small Acts, Multiplied"
              description="Volunteers are the backbone of every distribution, every camp and every event we run. Whether you have a day a month or a day a week, there is a role for you."
            />
            <div className="mt-8 space-y-5">
              {[
                { icon: Users, title: 'Field Teams', text: 'Help organize food drives, distributions and community events.' },
                { icon: HandHeart, title: 'Skilled Support', text: 'Teach, provide medical skills, or help with logistics and operations.' },
                { icon: HeartHandshake, title: 'Behind the Scenes', text: 'Support content, outreach and coordination from anywhere.' },
              ].map((v, i) => (
                <Reveal key={v.title} delay={i * 80}>
                  <InfoCard icon={v.icon} title={v.title}>{v.text}</InfoCard>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <VolunteerForm />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Ready to Lend a Hand?"
        description="Submit your application and our volunteer coordinator will reach out with next steps."
        href="/get-involved/volunteer"
        ctaLabel="Apply Above"
      />
    </>
  );
}
