import Link from 'next/link';
import { ArrowRight, Heart, Target, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { contactPlaceholders } from '@/lib/site';

export function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-surface h-full p-7">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-forest-50 text-forest-700">
        <Icon className="h-5.5 w-5.5" strokeWidth={1.7} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-forest-800">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-charcoal/65">{children}</div>
    </div>
  );
}

export function PlaceholderNotice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-gold-400/60 bg-gold-100/30 px-5 py-4 text-sm text-charcoal/70">
      <strong className="font-medium text-charcoal">Placeholder:</strong> {children}
    </div>
  );
}

export function ContactStrip() {
  return (
    <section className="bg-forest-800 py-14">
      <div className="container-wide flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="text-2xl font-semibold text-white">Questions? Talk to Us.</h2>
          <p className="mt-2 text-sm text-white/65">
            {contactPlaceholders.officeHours} · {contactPlaceholders.email}
          </p>
        </div>
        <Link href="/contact" className="btn-gold group shrink-0">
          Contact Us
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

export { PageHero, SectionHeading, CtaBanner, Reveal, Heart, Target, Sparkles };
