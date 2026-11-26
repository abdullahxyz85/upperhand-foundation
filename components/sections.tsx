import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './reveal';

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative overflow-hidden bg-forest-800 text-white">
      <div className="absolute inset-0 pattern-grid opacity-60" aria-hidden />
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-forest-600/30 blur-3xl" aria-hidden />
      <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gold-400/10 blur-3xl" aria-hidden />
      <div className="container-wide relative py-16 sm:py-20 lg:py-24">
        {breadcrumb && breadcrumb.length > 0 && (
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              {breadcrumb.map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  {i > 0 && <span aria-hidden>/</span>}
                  {item.href ? (
                    <Link href={item.href} className="hover:text-gold-300 transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white/90">{item.label}</span>
                  )}
                </span>
              ))}
            </nav>
          </Reveal>
        )}
        <Reveal delay={60}>
          {eyebrow && (
            <span className="eyebrow !text-gold-300 mb-4 before:bg-gold-300">{eyebrow}</span>
          )}
          <h1 className="max-w-3xl text-4xl font-semibold text-balance sm:text-5xl">{title}</h1>
        </Reveal>
        {description && (
          <Reveal delay={140}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{description}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  dark?: boolean;
}) {
  return (
    <Reveal className={align === 'center' ? 'text-center' : ''}>
      {eyebrow && <span className={`eyebrow ${dark ? '!text-gold-300 before:bg-gold-300' : ''}`}>{eyebrow}</span>}
      <h2 className={`mt-3 text-3xl font-semibold text-balance sm:text-4xl ${dark ? 'text-white' : 'text-forest-800'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 max-w-2xl text-base leading-relaxed ${align === 'center' ? 'mx-auto' : ''} ${dark ? 'text-white/70' : 'text-charcoal/70'}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}

export function CtaBanner({
  title = 'Your Kindness Can Change a Life.',
  description = 'Every contribution, large or small, helps us stand beside families in their hardest moments.',
  href = '/donate',
  ctaLabel = 'Donate Now',
}: {
  title?: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-700">
      <div className="absolute inset-0 pattern-dots opacity-40" aria-hidden />
      <div className="container-wide relative flex flex-col items-center gap-8 py-16 text-center sm:py-20 lg:flex-row lg:justify-between lg:text-left">
        <Reveal>
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 max-w-xl text-white/75">{description}</p>
        </Reveal>
        <Reveal delay={120}>
          <Link href={href} className="btn-gold shrink-0 group">
            {ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
