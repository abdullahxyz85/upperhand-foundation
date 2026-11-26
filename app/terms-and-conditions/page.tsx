import type { Metadata } from 'next';
import { PageHero } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { contactPlaceholders } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using the Upper Hands Foundation website and making donations.',
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms that govern your use of this website and the donations made through it."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Terms & Conditions' }]}
      />

      <section className="section-padding">
        <div className="container-wide max-w-3xl space-y-10 text-[15px] leading-relaxed text-charcoal/75">
          <Reveal>
            <p className="rounded-2xl border border-dashed border-gold-400/60 bg-gold-100/30 px-5 py-4 text-sm">
              This draft should be reviewed by the foundation's legal advisor before final publication.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">1. Acceptance of Terms</h2>
            <p className="mt-3">
              By using this website, you agree to these terms. If you do not agree, please discontinue
              use of the site.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">2. Donations</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>Donations are voluntary and, once payment is completed through a verified channel, non-refundable unless required by law or approved by the foundation in exceptional circumstances.</li>
              <li>When you submit the donation form, you record a pledge with a transaction reference. The pledge becomes effective once payment is actually made through a verified payment channel.</li>
              <li>Donations designated to a specific cause will be applied to that cause wherever possible; if a designated fund is fully met, the foundation may apply the gift to the closest related need.</li>
              <li>Monthly donations may be cancelled at any time by contacting us.</li>
            </ul>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">3. Use of the Website</h2>
            <p className="mt-3">
              You agree to use this website lawfully and not to attempt to disrupt its operation, access
              administrative systems, or submit false, misleading or malicious information through its
              forms.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">4. Content and Intellectual Property</h2>
            <p className="mt-3">
              All text, images, logos and design on this website belong to Upper Hands Foundation or are
              used with permission. You may not reproduce them for commercial purposes without written
              consent.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">5. Accuracy of Information</h2>
            <p className="mt-3">
              We work hard to keep website content accurate and current. Statistics and campaign figures
              are published only when verified, and their coverage period is stated wherever relevant.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">6. Third-Party Links</h2>
            <p className="mt-3">
              Links to external sites (such as social media) are provided for convenience. We are not
              responsible for the content or privacy practices of those sites.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">7. Limitation of Liability</h2>
            <p className="mt-3">
              To the extent permitted by law, the foundation is not liable for indirect or consequential
              losses arising from use of this website.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="font-serif text-2xl font-semibold text-forest-800">8. Contact</h2>
            <p className="mt-3">
              Questions about these terms may be sent to{' '}
              <a href={`mailto:${contactPlaceholders.email}`} className="text-forest-700 underline">{contactPlaceholders.email}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
