import type { Metadata } from 'next';
import { PageHero } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { contactPlaceholders } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Upper Hands Foundation collects, uses and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we collect, use and protect your personal information."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="section-padding">
        <div className="container-wide max-w-3xl space-y-10 text-[15px] leading-relaxed text-charcoal/75">
          <Reveal>
            <p className="rounded-2xl border border-dashed border-gold-400/60 bg-gold-100/30 px-5 py-4 text-sm">
              This policy is a working draft for thefoundation's launch and should be reviewed by the
              foundation's legal advisor before final publication.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">1. Who We Are</h2>
            <p className="mt-3">
              Upper Hands Foundation (“we”, “our”, “the foundation”) is a charitable and humanitarian
              welfare organization based in Pakistan. This policy explains how we handle personal
              information collected through this website.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">2. Information We Collect</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li><strong>Donation details:</strong> name, email, phone number, donation amount, chosen cause and any note you provide.</li>
              <li><strong>Volunteer applications:</strong> name, contact details, city, skills, availability and message.</li>
              <li><strong>Partnership and contact inquiries:</strong> name, organization, contact details and your message.</li>
              <li><strong>Newsletter:</strong> your email address, used only to send foundation updates.</li>
            </ul>
            <p className="mt-3">
              We do <strong>not</strong> collect or store card numbers, bank credentials or other payment
              instrument data on this website.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">3. How We Use Information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To process, receipt and follow up on donations.</li>
              <li>To assess volunteer applications and contact you about opportunities.</li>
              <li>To respond to inquiries and partnership proposals.</li>
              <li>To send newsletters and updates — only if you subscribed, with an unsubscribe option in every message.</li>
              <li>To meet legal, audit and accounting obligations.</li>
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">4. Sharing of Information</h2>
            <p className="mt-3">
              We do not sell or rent personal information. Data is shared only with service providers
              that help us operate (for example our database and email providers) under confidentiality
              obligations, and with auditors or regulators where required by law.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">5. Data Security</h2>
            <p className="mt-3">
              Personal information is stored in secured systems with access limited to authorized
              foundation personnel. While no system is perfectly secure, we apply appropriate technical
              and organizational measures to protect your data.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">6. Your Rights</h2>
            <p className="mt-3">
              You may request access to, correction of, or deletion of your personal information, and may
              unsubscribe from communications at any time. Contact us at{' '}
              <a href={`mailto:${contactPlaceholders.email}`} className="text-forest-700 underline">{contactPlaceholders.email}</a>.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">7. Beneficiary Privacy</h2>
            <p className="mt-3">
              Stories and photographs of the people we serve are published only with informed consent,
              and we take particular care to protect the privacy and dignity of children and vulnerable
              individuals.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">8. Changes to This Policy</h2>
            <p className="mt-3">
              Updates will be published on this page with a revised date. Continued use of the website
              after changes constitutes acceptance of the updated policy.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
