import type { Metadata } from 'next';
import { PageHero, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Answers to common questions about donating, volunteering and verifying the work of Upper Hands Foundation.',
};

type Faq = { id: string; question: string; answer: string };

async function getFaqs(): Promise<Faq[]> {
  try {
    const { data } = await getSupabase().from('faqs').select('*').order('sort_order');
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function FaqsPage() {
  const faqs = await getFaqs();

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      <PageHero
        eyebrow="Help Center"
        title="Frequently Asked Questions"
        description="Everything donors, volunteers and partners commonly ask us. Can't find your answer? Contact us directly."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'FAQs' }]}
      />

      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <Reveal key={f.id} delay={Math.min(i, 5) * 60}>
                <details className="group card-surface overflow-hidden p-0 [&[open]]:shadow-md">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 text-left font-medium text-charcoal transition-colors hover:text-forest-700 [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-forest-50 text-forest-700 transition-transform group-open:rotate-45">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      </svg>
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-relaxed text-charcoal/70">{f.answer}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Still Have a Question?"
        description="Our team is happy to help. Reach out and we'll respond as soon as we can."
        href="/contact"
        ctaLabel="Contact Us"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
