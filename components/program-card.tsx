import Link from 'next/link';
import { ArrowRight, Baby, BookOpen, Droplets, LifeBuoy, Stethoscope, TrendingUp, Users, Utensils, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from './reveal';

export const programIcons: Record<string, LucideIcon> = {
  'book-open': BookOpen,
  'stethoscope': Stethoscope,
  'utensils': Utensils,
  'users': Users,
  'baby': Baby,
  'life-buoy': LifeBuoy,
  'droplets': Droplets,
  'trending-up': TrendingUp,
  'heart': Heart,
};

export type ProgramLike = {
  slug: string;
  title: string;
  summary: string;
  icon: string;
};

export function ProgramCard({ program, index = 0 }: { program: ProgramLike; index?: number }) {
  const Icon = programIcons[program.icon] ?? Heart;
  return (
    <Reveal delay={(index % 4) * 80}>
      <Link
        href={`/programs/${program.slug}`}
        className="card-surface group flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-900/10"
      >
        <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-forest-50 text-forest-700 transition-colors group-hover:bg-forest-700 group-hover:text-white">
          <Icon className="h-6 w-6" strokeWidth={1.7} />
        </span>
        <h3 className="mt-5 text-xl font-semibold text-forest-800">{program.title}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-charcoal/65">{program.summary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest-600">
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </Reveal>
  );
}
