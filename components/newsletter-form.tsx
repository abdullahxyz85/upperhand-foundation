'use client';

import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setState('loading');
    try {
      const { error } = await getSupabase()
        .from('newsletter_subscribers')
        .insert({ email: email.trim().toLowerCase() });
      if (error) {
        if (error.code === '23505') {
          setState('done');
          setMessage("You're already subscribed. Thank you!");
          return;
        }
        throw error;
      }
      setState('done');
      setMessage('Subscribed. Thank you for staying with us.');
      setEmail('');
    } catch {
      setState('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={submit} className={compact ? '' : 'mx-auto max-w-xl'}>
      <div className={`flex gap-2 ${compact ? '' : 'sm:gap-3'}`}>
        <label htmlFor={compact ? 'newsletter-email-footer' : 'newsletter-email'} className="sr-only">
          Email address
        </label>
        <input
          id={compact ? 'newsletter-email-footer' : 'newsletter-email'}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== 'idle') setState('idle');
          }}
          placeholder="Your email address"
          className={compact
            ? 'min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/45 focus:border-gold-400 focus:outline-none'
            : 'input-field rounded-full flex-1'}
          disabled={state === 'loading' || state === 'done'}
        />
        <button
          type="submit"
          disabled={state === 'loading' || state === 'done'}
          className={compact
            ? 'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400 text-charcoal transition-colors hover:bg-gold-300 disabled:opacity-60'
            : 'btn-gold !px-5'}
          aria-label="Subscribe"
        >
          {state === 'loading' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : state === 'done' ? (
            <Check className="h-4 w-4" />
          ) : compact ? (
            <Send className="h-4 w-4" />
          ) : (
            'Subscribe'
          )}
        </button>
      </div>
      {message && (
        <p
          role="status"
          className={`mt-2 text-xs ${state === 'error' ? 'text-red-400' : compact ? 'text-gold-300' : 'text-forest-600'}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
