import type { Metadata } from 'next';
import { FileText, FolderOpen, Landmark, ScrollText, Users, Wallet } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { PlaceholderNotice } from '@/components/page-parts';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Transparency',
  description:
    'Registration documents, annual reports, financial statements and governance information for Upper Hands Foundation.',
};

type Doc = { id: string; title: string; category: string; file_url: string; year: number | null };

async function getDocuments(): Promise<Doc[]> {
  try {
    const { data } = await getSupabase().from('documents').select('*').order('year', { ascending: false });
    return data ?? [];
  } catch {
    return [];
  }
}

const sections = [
  { icon: ScrollText, title: 'Registration & Legal Documents', desc: 'Certificate of registration and founding documents.' },
  { icon: FileText, title: 'Annual Reports', desc: 'Yearly summaries of activities, programs and achievements.' },
  { icon: Wallet, title: 'Financial Statements', desc: 'Income and expenditure statements, published periodically.' },
  { icon: Landmark, title: 'Audit Reports', desc: 'Independent audits of the foundation\'s accounts.' },
  { icon: Users, title: 'Governance & Leadership', desc: 'Board members, management structure and policies.' },
  { icon: FolderOpen, title: 'Donation Utilization', desc: 'How funds are allocated across programs and projects.' },
];

export default async function TransparencyPage() {
  const docs = await getDocuments();

  return (
    <>
      <PageHero
        eyebrow="Transparency & Trust"
        title="Trust Is Earned in the Open"
        description="Everything a supporter needs to verify our work: legal documents, financial statements, audit reports and utilization records."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Transparency' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            eyebrow="Accountability Framework"
            title="What We Publish"
            description="As the foundation releases verified documents, they will appear below. Nothing is shown here until it is authentic and confirmed."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 80}>
                <div className="card-surface h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest-700">
                    <s.icon className="h-5.5 w-5.5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-forest-800">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/65">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {docs.length > 0 ? (
            <Reveal delay={100}>
              <div className="mt-14">
                <h3 className="font-serif text-2xl font-semibold text-forest-800">Published Documents</h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {docs.map((d) => (
                    <li key={d.id} className="flex items-center justify-between gap-4 rounded-2xl border border-border/70 bg-white p-5">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 shrink-0 text-forest-600" />
                        <div>
                          <p className="font-medium text-charcoal">{d.title}</p>
                          <p className="text-xs text-charcoal/55">
                            {d.category}{d.year ? ` · ${d.year}` : ''}
                          </p>
                        </div>
                      </div>
                      {d.file_url && (
                        <a
                          href={d.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline !px-4 !py-2 text-xs"
                        >
                          View
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={120}>
              <div className="mx-auto mt-14 max-w-2xl">
                <PlaceholderNotice>
                  Official registration details, reports and financial documents are pending publication.
                  Foundation administrators can upload verified documents to this section at any time.
                </PlaceholderNotice>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      <CtaBanner
        title="Hold Us Accountable."
        description="If you have questions about our operations or finances, contact us directly. We answer to every supporter."
        href="/contact"
        ctaLabel="Ask a Question"
      />
    </>
  );
}
