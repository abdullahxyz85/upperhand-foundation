'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

const availabilityOptions = ['Weekdays', 'Weekends', 'Evenings', 'Remote / Flexible', 'Full-time'];

export function VolunteerForm() {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    skills: '',
    availability: '',
    message: '',
  });
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.full_name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please provide your name and a valid email address.');
      return;
    }
    setState('loading');
    try {
      const { error: dbError } = await getSupabase()
        .from('volunteer_applications')
        .insert({ ...form, email: form.email.trim().toLowerCase() });
      if (dbError) throw dbError;
      setState('done');
    } catch {
      setError('We could not submit your application right now. Please try again.');
      setState('idle');
    }
  };

  if (state === 'done') {
    return (
      <div className="card-surface p-8 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-forest-800">Application Received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/70">
          Thank you for offering your time and skills. Our volunteer team will review your application
          and reach out when an opportunity matches.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="vol-name" className="mb-1.5 block text-sm font-medium text-charcoal">Full Name *</label>
          <input id="vol-name" value={form.full_name} onChange={set('full_name')} className="input-field" placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="vol-email" className="mb-1.5 block text-sm font-medium text-charcoal">Email *</label>
          <input id="vol-email" type="email" value={form.email} onChange={set('email')} className="input-field" placeholder="you@example.com" required />
        </div>
        <div>
          <label htmlFor="vol-phone" className="mb-1.5 block text-sm font-medium text-charcoal">Phone</label>
          <input id="vol-phone" type="tel" value={form.phone} onChange={set('phone')} className="input-field" placeholder="+92 3XX XXXXXXX" />
        </div>
        <div>
          <label htmlFor="vol-city" className="mb-1.5 block text-sm font-medium text-charcoal">City</label>
          <input id="vol-city" value={form.city} onChange={set('city')} className="input-field" placeholder="e.g. Karachi" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="vol-skills" className="mb-1.5 block text-sm font-medium text-charcoal">Skills You Can Offer</label>
          <input id="vol-skills" value={form.skills} onChange={set('skills')} className="input-field" placeholder="e.g. teaching, medical, logistics, social media" />
        </div>
        <div className="sm:col-span-2">
          <span className="mb-2 block text-sm font-medium text-charcoal">Availability</span>
          <div className="flex flex-wrap gap-2">
            {availabilityOptions.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setForm({ ...form, availability: form.availability === a ? '' : a })}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                  form.availability === a
                    ? 'border-forest-700 bg-forest-700 text-white'
                    : 'border-border bg-white text-charcoal/70 hover:border-forest-600/50'
                }`}
                aria-pressed={form.availability === a}
              >
                {a}
              </button>
            ))}
          </div>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="vol-msg" className="mb-1.5 block text-sm font-medium text-charcoal">Anything Else You'd Like Us to Know</label>
          <textarea id="vol-msg" value={form.message} onChange={set('message')} rows={4} className="input-field resize-none" placeholder="Tell us why you want to volunteer…" />
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
      )}
      <button type="submit" disabled={state === 'loading'} className="btn-primary mt-6 w-full">
        {state === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {state === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  );
}

export function PartnershipForm() {
  const [form, setForm] = useState({
    org_name: '',
    contact_name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.org_name.trim() || !form.contact_name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please provide your organization, contact name and a valid email.');
      return;
    }
    setState('loading');
    try {
      const { error: dbError } = await getSupabase()
        .from('partnership_inquiries')
        .insert({ ...form, email: form.email.trim().toLowerCase() });
      if (dbError) throw dbError;
      setState('done');
    } catch {
      setError('We could not send your inquiry right now. Please try again.');
      setState('idle');
    }
  };

  if (state === 'done') {
    return (
      <div className="card-surface p-8 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-forest-800">Inquiry Sent</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/70">
          Thank you for your interest in partnering with Upper Hands Foundation. Our team will be in
          touch shortly to discuss how we can work together.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="part-org" className="mb-1.5 block text-sm font-medium text-charcoal">Organization *</label>
          <input id="part-org" value={form.org_name} onChange={set('org_name')} className="input-field" placeholder="Company or organization name" required />
        </div>
        <div>
          <label htmlFor="part-name" className="mb-1.5 block text-sm font-medium text-charcoal">Contact Person *</label>
          <input id="part-name" value={form.contact_name} onChange={set('contact_name')} className="input-field" placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="part-email" className="mb-1.5 block text-sm font-medium text-charcoal">Email *</label>
          <input id="part-email" type="email" value={form.email} onChange={set('email')} className="input-field" placeholder="you@organization.com" required />
        </div>
        <div>
          <label htmlFor="part-phone" className="mb-1.5 block text-sm font-medium text-charcoal">Phone</label>
          <input id="part-phone" type="tel" value={form.phone} onChange={set('phone')} className="input-field" placeholder="+92 3XX XXXXXXX" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="part-msg" className="mb-1.5 block text-sm font-medium text-charcoal">How Would You Like to Partner?</label>
          <textarea id="part-msg" value={form.message} onChange={set('message')} rows={4} className="input-field resize-none" placeholder="Corporate CSR, in-kind support, joint programs…" />
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
      )}
      <button type="submit" disabled={state === 'loading'} className="btn-primary mt-6 w-full">
        {state === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {state === 'loading' ? 'Sending…' : 'Send Inquiry'}
      </button>
    </form>
  );
}
