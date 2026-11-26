'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, Loader2, LogIn, ShieldCheck } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase-admin';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const supabase = createAdminClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (authError) {
        setError('Incorrect email or password.');
        return;
      }
      // Verify admin allowlist before entering the dashboard
      const { data: isAdmin, error: rpcError } = await supabase.rpc('is_admin');
      if (rpcError || !isAdmin) {
        await supabase.auth.signOut();
        setError('This account does not have administrator access.');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-forest-900 px-4 py-20">
      <div className="absolute inset-0 pattern-grid opacity-40" aria-hidden />
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
          <div className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-forest-700 text-white">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <h1 className="mt-5 font-serif text-2xl font-semibold text-forest-800">Administrator Sign In</h1>
            <p className="mt-2 text-sm text-charcoal/60">
              Restricted area for Upper Hands Foundation staff only.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-charcoal">Email</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-charcoal">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>
            {error && (
              <p role="alert" className="flex items-start gap-2 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                {error}
              </p>
            )}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <LogIn className="h-5 w-5" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="mt-6 text-center text-xs text-white/50">
          Authorized administrators only. All access is logged. <Link href="/" className="underline hover:text-gold-300">Back to website</Link>
        </p>
      </div>
    </section>
  );
}
