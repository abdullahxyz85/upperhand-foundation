'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
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
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.message.trim()) {
      setError('Please provide your name, a valid email and your message.');
      return;
    }
    setState('loading');
    try {
      const { error: dbError } = await getSupabase()
        .from('contact_messages')
        .insert({ ...form, email: form.email.trim().toLowerCase() });
      if (dbError) throw dbError;
      setState('done');
    } catch {
      setError('We could not send your message right now. Please try again.');
      setState('idle');
    }
  };

  if (state === 'done') {
    return (
      <div className="card-surface p-8 text-center sm:p-10">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-600">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-forest-800">Message Sent</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-charcoal/70">
          Thank you for reaching out, {form.name.split(' ')[0]}. Our team will respond to your message
          as soon as possible.
        </p>
        <button
          onClick={() => {
            setForm({ name: '', email: '', phone: '', subject: '', message: '' });
            setState('idle');
          }}
          className="btn-outline mt-6"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="ct-name" className="mb-1.5 block text-sm font-medium text-charcoal">Full Name *</label>
          <input id="ct-name" value={form.name} onChange={set('name')} className="input-field" placeholder="Your name" required />
        </div>
        <div>
          <label htmlFor="ct-email" className="mb-1.5 block text-sm font-medium text-charcoal">Email *</label>
          <input id="ct-email" type="email" value={form.email} onChange={set('email')} className="input-field" placeholder="you@example.com" required />
        </div>
        <div>
          <label htmlFor="ct-phone" className="mb-1.5 block text-sm font-medium text-charcoal">Phone</label>
          <input id="ct-phone" type="tel" value={form.phone} onChange={set('phone')} className="input-field" placeholder="+92 3XX XXXXXXX" />
        </div>
        <div>
          <label htmlFor="ct-subject" className="mb-1.5 block text-sm font-medium text-charcoal">Subject</label>
          <input id="ct-subject" value={form.subject} onChange={set('subject')} className="input-field" placeholder="Donation, volunteering, general…" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ct-msg" className="mb-1.5 block text-sm font-medium text-charcoal">Message *</label>
          <textarea id="ct-msg" value={form.message} onChange={set('message')} rows={5} className="input-field resize-none" placeholder="How can we help?" required />
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
      )}
      <button type="submit" disabled={state === 'loading'} className="btn-primary mt-6 w-full">
        {state === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {state === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
