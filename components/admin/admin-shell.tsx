'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  AlertCircle,
  BookOpen,
  CalendarCheck,
  FileText,
  HandHeart,
  Heart,
  Image as ImageIcon,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Menu,
  Quote,
  ScrollText,
  Settings,
  TrendingUp,
  Users,
  X,
} from 'lucide-react';
import { createAdminClient } from '@/lib/supabase-admin';
import { collections, submissions } from '@/lib/admin-schema';

const collectionIcons: Record<string, any> = {
  programs: HandHeart,
  projects: CalendarCheck,
  posts: FileText,
  stories: Quote,
  team_members: Users,
  gallery_images: ImageIcon,
  impact_stats: TrendingUp,
  documents: ScrollText,
  faqs: BookOpen,
  site_settings: Settings,
};

const submissionIcons: Record<string, any> = {
  donations: Heart,
  volunteer_applications: Users,
  contact_messages: Mail,
  partnership_inquiries: LayoutDashboard,
  newsletter_subscribers: Mail,
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState<'checking' | 'ok' | 'denied'>('checking');
  const [email, setEmail] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const check = async () => {
      try {
        const supabase = createAdminClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          if (active) setState('denied');
          return;
        }
        const { data: isAdmin, error } = await supabase.rpc('is_admin');
        if (!active) return;
        if (error || !isAdmin) {
          await supabase.auth.signOut();
          setState('denied');
          return;
        }
        setEmail(session.user.email ?? '');
        setState('ok');
      } catch {
        if (active) setState('denied');
      }
    };
    check();
    return () => {
      active = false;
    };
  }, []);

  const signOut = async () => {
    try {
      await createAdminClient().auth.signOut();
    } finally {
      router.push('/admin/login');
      router.refresh();
    }
  };

  if (state === 'checking') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-forest-600" />
      </div>
    );
  }

  if (state === 'denied') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="card-surface max-w-md p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
            <AlertCircle className="h-7 w-7" />
          </span>
          <h1 className="mt-5 font-serif text-2xl font-semibold text-forest-800">Administrator Access Required</h1>
          <p className="mt-2 text-sm text-charcoal/65">
            Please sign in with an authorized administrator account to view this area.
          </p>
          <Link href="/admin/login" className="btn-primary mt-6">Go to Sign In</Link>
        </div>
      </div>
    );
  }

  const collectionItems = collections.map((c) => ({
    key: c.key,
    label: c.label,
    href: `/admin/${c.key}`,
    icon: collectionIcons[c.key] ?? FileText,
  }));
  const submissionItems = submissions.map((s) => ({
    key: s.key,
    label: s.label,
    href: `/admin/inbox/${s.key}`,
    icon: submissionIcons[s.key] ?? Mail,
  }));

  const NavGroup = ({ title, items }: { title: string; items: typeof collectionItems }) => (
    <div>
      <p className="px-3 pb-2 pt-5 text-[11px] font-semibold uppercase tracking-wider text-charcoal/45">{title}</p>
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.key}
            href={item.href}
            onClick={() => setSidebarOpen(false)}
            className={`mb-0.5 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active
                ? 'bg-forest-700 font-medium text-white'
                : 'text-charcoal/75 hover:bg-forest-50 hover:text-forest-700'
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-[70vh]">
      <div className="border-b border-border bg-white">
        <div className="container-wide flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle admin menu"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <span className="font-serif font-semibold text-forest-800">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-charcoal/55 sm:block">{email}</span>
            <Link href="/" className="text-forest-600 hover:text-forest-700">View Site</Link>
            <button onClick={signOut} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-charcoal/70 hover:bg-red-50 hover:text-red-600">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="container-wide flex gap-8 py-8">
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-charcoal/40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 overflow-y-auto bg-white p-4 pt-20 shadow-xl transition-transform lg:sticky lg:top-20 lg:z-0 lg:h-fit lg:translate-x-0 lg:rounded-2xl lg:border lg:border-border/70 lg:p-4 lg:pt-4 lg:shadow-sm ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <NavGroup title="Content" items={collectionItems} />
          <NavGroup title="Inbox" items={submissionItems} />
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
