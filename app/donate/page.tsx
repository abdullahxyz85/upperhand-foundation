import type { Metadata } from 'next';
import { Building2, CheckCircle2, CreditCard, Landmark, ShieldCheck, Smartphone } from 'lucide-react';
import { PageHero } from '@/components/sections';
import { DonationForm } from '@/components/donation-form';
import { Reveal } from '@/components/reveal';
import { bankPlaceholders } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Donate to Upper Hands Foundation — support food assistance, education, healthcare, emergency relief, Zakat and Sadqah. Transparent, secure, dignity-first giving.',
};

const methods = [
  { icon: Landmark, label: 'Bank Transfer', note: 'Account details published once verified' },
  { icon: Smartphone, label: 'JazzCash & Easypaisa', note: 'Mobile wallet options coming soon' },
  { icon: CreditCard, label: 'Debit / Credit Card', note: 'Secure online payment coming soon' },
];

export default function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate"
        title="Your Kindness Can Change a Life."
        description="Every rupee is directed to the cause you choose, documented, and reported back to you. Give once or become a monthly pillar of this mission."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Donate' }]}
      />

      <section className="section-padding">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold text-forest-800">Ways to Give</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                Complete the donation form to record your pledge with a transaction reference. Payment
                channels are activated as the foundation verifies them.
              </p>
              <div className="mt-8 space-y-4">
                {methods.map((m) => (
                  <div key={m.label} className="flex items-start gap-4 rounded-2xl border border-border/70 bg-white p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
                      <m.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="font-medium text-charcoal">{m.label}</p>
                      <p className="mt-0.5 text-xs text-charcoal/55">{m.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-8 rounded-2xl border border-gold-300/60 bg-gold-100/40 p-6">
                <div className="flex items-center gap-2.5">
                  <Building2 className="h-5 w-5 text-gold-600" />
                  <h3 className="font-medium text-charcoal">Bank Account Details</h3>
                </div>
                {bankPlaceholders.configured ? (
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-charcoal/60">Bank</dt><dd className="font-medium">{bankPlaceholders.bankName}</dd></div>
                    <div className="flex justify-between"><dt className="text-charcoal/60">Account Title</dt><dd className="font-medium">{bankPlaceholders.accountTitle}</dd></div>
                    <div className="flex justify-between"><dt className="text-charcoal/60">Account No.</dt><dd className="font-medium">{bankPlaceholders.accountNumber}</dd></div>
                    <div className="flex justify-between"><dt className="text-charcoal/60">IBAN</dt><dd className="font-medium">{bankPlaceholders.iban}</dd></div>
                  </dl>
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                    {bankPlaceholders.note}
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-8 space-y-3 text-sm text-charcoal/65">
                {[
                  'A transaction reference for every donation',
                  'Cause-restricted giving — Zakat handled with eligibility care',
                  'Published utilization reports you can verify',
                ].map((item) => (
                  <p key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                    {item}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <DonationForm />
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 flex items-center justify-center gap-2 text-xs text-charcoal/50">
                <ShieldCheck className="h-4 w-4 text-forest-600" />
                We never store card or payment credentials on this website.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
