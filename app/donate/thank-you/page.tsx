import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Home, Mail } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Thank you for your donation to Upper Hands Foundation.',
  robots: { index: false, follow: false },
};

type Donation = {
  reference: string;
  donor_name: string;
  amount_pkr: number;
  donation_type: string;
  category: string;
};

async function getDonation(reference: string): Promise<Donation | null> {
  if (!/^UHF-[A-F0-9]{8}$/.test(reference)) return null;
  try {
    const { data } = await getSupabase()
      .from('donations')
      .select('reference, donor_name, amount_pkr, donation_type, category')
      .eq('reference', reference)
      .maybeSingle();
    return data;
  } catch {
    return null;
  }
}

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const donation = await getDonation(searchParams.ref ?? '');

  return (
    <section className="relative overflow-hidden bg-forest-900 py-24">
      <div className="absolute inset-0 pattern-grid opacity-40" aria-hidden />
      <div className="container-wide relative max-w-2xl text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-400/20 text-gold-300">
          <CheckCircle2 className="h-10 w-10" />
        </span>
        <h1 className="mt-8 text-4xl font-semibold text-white sm:text-5xl">
          Thank You{donation ? `, ${donation.donor_name.split(' ')[0]}` : ''}.
        </h1>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-white/70">
          Your generosity brings hope, support and dignity to people who need it most. It truly means
          the world.
        </p>

        {donation ? (
          <div className="mx-auto mt-10 max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-left backdrop-blur-sm">
            <h2 className="font-serif text-xl font-semibold text-white">Donation Receipt</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-white/55">Reference</dt>
                <dd className="font-medium text-gold-300">{donation.reference}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-white/55">Amount</dt>
                <dd className="font-medium text-white">PKR {Number(donation.amount_pkr).toLocaleString()}</dd>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-3">
                <dt className="text-white/55">Type</dt>
                <dd className="font-medium text-white">
                  {donation.donation_type === 'monthly' ? 'Monthly' : 'One-Time'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-white/55">Designation</dt>
                <dd className="font-medium capitalize text-white">
                  {donation.category.replace(/_/g, ' ')}
                </dd>
              </div>
            </dl>
            <p className="mt-6 flex items-start gap-2.5 text-xs leading-relaxed text-white/55">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              Our team will contact you at your provided email with payment instructions and confirmation.
            </p>
          </div>
        ) : (
          <p className="mx-auto mt-8 max-w-md rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-sm text-white/60">
            A confirmation with your transaction reference has been shown after your donation. If you
            need help, please contact us.
          </p>
        )}

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-gold">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link href="/impact" className="btn-ghost-light">
            See Our Impact
          </Link>
        </div>
      </div>
    </section>
  );
}
