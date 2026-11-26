import type { Metadata } from 'next';
import { ShieldQuestion } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { PlaceholderNotice } from '@/components/page-parts';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Leadership Team',
  description:
    'Meet the leadership team guiding Upper Hands Foundation, accountable for our mission, our donors and our communities.',
};

type Member = { id: string; name: string; role: string; bio: string; photo_url: string };

async function getTeam(): Promise<Member[]> {
  try {
    const { data } = await getSupabase()
      .from('team_members')
      .select('id, name, role, bio, photo_url')
      .order('sort_order');
    return data ?? [];
  } catch {
    return [];
  }
}

function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-forest-700 font-serif text-2xl font-semibold text-white">
      {initials || '?'}
    </div>
  );
}

export default async function LeadershipPage() {
  const team = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="The People Behind the Promise"
        description="Accountability begins at the top. Our leadership team answers for every program, every rupee and every promise made to our supporters."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'About Us', href: '/about' }, { label: 'Leadership Team' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          {team.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m, i) => (
                <Reveal key={m.id} delay={(i % 3) * 80}>
                  <div className="card-surface flex h-full flex-col items-center p-8 text-center">
                    {m.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={m.photo_url}
                        alt={`Portrait of ${m.name}`}
                        className="h-24 w-24 rounded-full object-cover"
                      />
                    ) : (
                      <InitialsAvatar name={m.name} />
                    )}
                    <h3 className="mt-5 text-lg font-semibold text-forest-800">{m.name}</h3>
                    <p className="mt-1 text-sm font-medium text-gold-500">{m.role}</p>
                    {m.bio && <p className="mt-3 text-sm leading-relaxed text-charcoal/65">{m.bio}</p>}
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                <ShieldQuestion className="h-8 w-8" />
              </span>
              <h2 className="mt-6 text-2xl font-semibold text-forest-800">Leadership Profiles Coming Soon</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                The foundation's leadership team, board members and their profiles will be published here
                once confirmed by the organization.
              </p>
              <div className="mt-8 text-left">
                <PlaceholderNotice>
                  Leadership names, roles and biographies are pending official confirmation. This page is
                  managed by foundation administrators and will update automatically once profiles are added.
                </PlaceholderNotice>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
