import Link from 'next/link';
import { Heart, Mail, TrendingUp, Users } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

async function getCounts() {
  try {
    const supabase = createAdminClient();
    const [donations, volunteers, messages, subscribers] = await Promise.all([
      supabase.from('donations').select('id, amount_pkr, status'),
      supabase.from('volunteer_applications').select('id, status'),
      supabase.from('contact_messages').select('id, status'),
      supabase.from('newsletter_subscribers').select('id'),
    ]);
    const donationsList = donations.data ?? [];
    const pendingDonations = donationsList.filter((d: any) => d.status === 'pending');
    return {
      totalDonations: donationsList.length,
      pendingDonations: pendingDonations.length,
      pledgedPkr: pendingDonations.reduce((s: number, d: any) => s + (Number(d.amount_pkr) || 0), 0),
      newVolunteers: (volunteers.data ?? []).filter((v: any) => v.status === 'new').length,
      newMessages: (messages.data ?? []).filter((m: any) => m.status === 'new').length,
      subscribers: (subscribers.data ?? []).length,
    };
  } catch {
    return { totalDonations: 0, pendingDonations: 0, pledgedPkr: 0, newVolunteers: 0, newMessages: 0, subscribers: 0 };
  }
}

export default async function AdminHomePage() {
  const counts = await getCounts();

  const cards = [
    { icon: Heart, label: 'Donation Pledges', value: counts.totalDonations.toLocaleString(), note: `${counts.pendingDonations} pending confirmation`, href: '/admin/inbox/donations' },
    { icon: Users, label: 'New Volunteer Applications', value: counts.newVolunteers.toLocaleString(), note: 'awaiting review', href: '/admin/inbox/volunteer_applications' },
    { icon: Mail, label: 'New Messages', value: counts.newMessages.toLocaleString(), note: 'from contact form', href: '/admin/inbox/contact_messages' },
    { icon: TrendingUp, label: 'Newsletter Subscribers', value: counts.subscribers.toLocaleString(), note: 'total', href: '/admin/inbox/newsletter_subscribers' },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-forest-800">Dashboard Overview</h1>
      <p className="mt-1 text-sm text-charcoal/60">Activity across the foundation website.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="card-surface p-6 transition-all hover:-translate-y-0.5 hover:shadow-md">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
              <c.icon className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <p className="mt-4 font-serif text-3xl font-semibold text-charcoal">{c.value}</p>
            <p className="mt-1 text-sm font-medium text-charcoal/75">{c.label}</p>
            <p className="text-xs text-charcoal/50">{c.note}</p>
          </Link>
        ))}
      </div>

      {counts.pendingDonations > 0 && (
        <div className="mt-8 rounded-2xl border border-gold-300/60 bg-gold-100/40 p-6">
          <h2 className="font-medium text-charcoal">Awaiting Payment Follow-Up</h2>
          <p className="mt-2 text-sm text-charcoal/70">
            {counts.pendingDonations} donation pledge{counts.pendingDonations === 1 ? '' : 's'} totalling{' '}
            <strong>PKR {counts.pledgedPkr.toLocaleString()}</strong> need payment confirmation.
            Open the <Link href="/admin/inbox/donations" className="text-forest-700 underline">donations inbox</Link> to
            confirm them.
          </p>
        </div>
      )}
    </div>
  );
}
