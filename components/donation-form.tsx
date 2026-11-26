'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

const categories = [
  { value: 'general', label: 'General Donation' },
  { value: 'food', label: 'Food Assistance' },
  { value: 'education', label: 'Education' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'emergency', label: 'Emergency Relief' },
  { value: 'zakat', label: 'Zakat' },
  { value: 'sadqah', label: 'Sadqah' },
];

const presetAmounts = [1000, 2500, 5000, 10000, 25000, 50000];

type Success = { reference: string; amount: number; type: string };

export function DonationForm({ dark = false }: { dark?: boolean }) {
  const [amount, setAmount] = useState<number>(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState<'one_time' | 'monthly'>('one_time');
  const [category, setCategory] = useState('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<Success | null>(null);

  const finalAmount = useMemo(() => {
    if (customAmount !== '') {
      const n = Number(customAmount.replace(/[^0-9]/g, ''));
      return Number.isFinite(n) ? n : 0;
    }
    return amount;
  }, [customAmount, amount]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (finalAmount < 100) {
      setError('Please enter a donation amount of at least PKR 100.');
      return;
    }
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please provide your name and a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const { data, error: dbError } = await getSupabase()
        .from('donations')
        .insert({
          donor_name: name.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          amount_pkr: finalAmount,
          donation_type: donationType,
          category,
          notes: notes.trim(),
        })
        .select('reference')
        .single();
      if (dbError) throw dbError;
      router.push(`/donate/thank-you?ref=${encodeURIComponent(data.reference)}`);
    } catch {
      setError('We could not record your pledge right now. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card-surface p-8 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-forest-800">Thank You, {name.split(' ')[0]}!</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/70">
          Your {success.type === 'monthly' ? 'monthly' : 'one-time'} donation pledge of{' '}
          <strong>PKR {success.amount.toLocaleString()}</strong> has been recorded.
          {success.type === 'monthly'
            ? ' Our team will contact you to set up the recurring payment.'
            : ' Our team will contact you with payment instructions.'}
        </p>
        <div className="mx-auto mt-6 max-w-sm rounded-xl border border-gold-300/60 bg-gold-100/40 p-4">
          <p className="text-xs uppercase tracking-wider text-charcoal/55">Transaction Reference</p>
          <p className="mt-1 font-serif text-xl font-semibold text-forest-800">{success.reference}</p>
        </div>
        <p className="mt-4 text-xs text-charcoal/55">
          Keep this reference safe. A confirmation email will be sent to {email} once payment steps are confirmed.
        </p>
        <button
          onClick={() => {
            setSuccess(null);
            setCustomAmount('');
            setNotes('');
          }}
          className="btn-outline mt-6"
        >
          Make Another Donation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-surface p-6 sm:p-8">
      {/* One-time / monthly */}
      <div className="grid grid-cols-2 gap-2 rounded-full bg-muted p-1.5">
        {(['one_time', 'monthly'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setDonationType(t)}
            className={`rounded-full py-2.5 text-sm font-medium transition-all ${
              donationType === t
                ? 'bg-forest-700 text-white shadow'
                : 'text-charcoal/65 hover:text-forest-700'
            }`}
            aria-pressed={donationType === t}
          >
            {t === 'one_time' ? 'One-Time' : 'Monthly'}
          </button>
        ))}
      </div>

      {/* Amounts */}
      <fieldset className="mt-6">
        <legend className={`text-sm font-medium ${dark ? 'text-white' : 'text-charcoal'}`}>Select Amount (PKR)</legend>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {presetAmounts.map((a) => {
            const active = customAmount === '' && amount === a;
            return (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setAmount(a);
                  setCustomAmount('');
                }}
                className={`rounded-xl border py-3 text-sm font-medium transition-all ${
                  active
                    ? 'border-forest-700 bg-forest-700 text-white shadow'
                    : 'border-border bg-white text-charcoal/80 hover:border-forest-600/50 hover:bg-forest-50'
                }`}
                aria-pressed={active}
              >
                {a.toLocaleString()}
              </button>
            );
          })}
        </div>
        <div className="relative mt-3">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-charcoal/50">
            PKR
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="Enter custom amount"
            className="input-field pl-14"
            aria-label="Custom donation amount in PKR"
          />
        </div>
      </fieldset>

      {/* Category */}
      <fieldset className="mt-6">
        <legend className={`text-sm font-medium ${dark ? 'text-white' : 'text-charcoal'}`}>Donate Towards</legend>
        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              className={`rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all ${
                category === c.value
                  ? 'border-gold-400 bg-gold-100/60 text-charcoal'
                  : 'border-border bg-white text-charcoal/70 hover:border-gold-300'
              }`}
              aria-pressed={category === c.value}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Donor info */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`donor-name${dark ? '-dark' : ''}`} className="mb-1.5 block text-sm font-medium text-charcoal">
            Full Name *
          </label>
          <input
            id={`donor-name${dark ? '-dark' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label htmlFor={`donor-email${dark ? '-dark' : ''}`} className="mb-1.5 block text-sm font-medium text-charcoal">
            Email *
          </label>
          <input
            id={`donor-email${dark ? '-dark' : ''}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`donor-phone${dark ? '-dark' : ''}`} className="mb-1.5 block text-sm font-medium text-charcoal">
            Phone (optional)
          </label>
          <input
            id={`donor-phone${dark ? '-dark' : ''}`}
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-field"
            placeholder="+92 3XX XXXXXXX"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full !py-3.5 text-base">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
        {loading ? 'Recording…' : `Donate PKR ${finalAmount ? finalAmount.toLocaleString() : '0'} Securely`}
      </button>
      <p className="mt-3 text-center text-xs leading-relaxed text-charcoal/55">
        Online payments open soon. Your pledge is recorded now and our team will contact you with verified
        payment options (bank transfer, JazzCash, Easypaisa, or card).
      </p>
      <p className="mt-2 text-center text-xs text-charcoal/45">
        By continuing you agree to our{' '}
        <Link href="/terms-and-conditions" className="underline hover:text-forest-700">Terms</Link> and{' '}
        <Link href="/privacy-policy" className="underline hover:text-forest-700">Privacy Policy</Link>.
      </p>
    </form>
  );
}
