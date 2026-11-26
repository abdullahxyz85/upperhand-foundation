import Link from 'next/link';
import Image from 'next/image';
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

export const programImages: Record<string, { src: string; alt: string }> = {
  'book-open': {
    src: '/images/education-classroom.jpg',
    alt: 'Children attending a lesson in a rural classroom',
  },
  'stethoscope': {
    src: '/images/healthcare-support.jpg',
    alt: 'A doctor reviewing medical notes in a clinic',
  },
  'utensils': {
    src: '/images/food-assistance.jpg',
    alt: 'A volunteer handing a food package to a recipient',
  },
  'users': {
    src: '/images/community-outreach.jpg',
    alt: 'Family members joining hands in support',
  },
  'baby': {
    src: '/images/child-learning.jpg',
    alt: 'A teacher leading an activity with young children',
  },
  'life-buoy': {
    src: '/images/emergency-aid.jpg',
    alt: 'Boxes of emergency aid ready for distribution',
  },
  'droplets': {
    src: '/images/clean-water.jpg',
    alt: 'Children gathering around a communal water source',
  },
  'trending-up': {
    src: '/images/skills-development.jpg',
    alt: 'Young people learning electronics repair in a workshop',
  },
  'heart': {
    src: '/images/community-support.jpg',
    alt: 'A volunteer serving a meal during a community food program',
  },
};

export type ProgramLike = {
  slug: string;
  title: string;
  summary: string;
  icon: string;
};

export function ProgramCard({ program, index = 0 }: { program: ProgramLike; index?: number }) {
  const Icon = programIcons[program.icon] ?? Heart;
  const image = programImages[program.icon] ?? programImages.heart;
  return (
    <Reveal delay={(index % 4) * 80}>
      <Link
        href={`/programs/${program.slug}`}
        className="card-surface group flex h-full flex-col overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest-900/10"
      >
        <div className="-mx-7 -mt-7 mb-6">
          <div className="relative h-40 overflow-hidden">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest-900/35 to-transparent" aria-hidden />
          </div>
        </div>
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
