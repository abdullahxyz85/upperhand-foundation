import Link from 'next/link';
import { HeartHandshake } from 'lucide-react';

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-700 text-white shadow-sm group-hover:bg-forest-600 transition-colors">
        <HeartHandshake className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className="leading-tight">
        <span className={`block font-serif text-lg font-semibold ${light ? 'text-white' : 'text-forest-800'}`}>
          Upper Hands
        </span>
        <span className={`block text-[11px] font-medium tracking-[0.18em] uppercase ${light ? 'text-white/70' : 'text-forest-600'}`}>
          Foundation
        </span>
      </span>
    </Link>
  );
}
