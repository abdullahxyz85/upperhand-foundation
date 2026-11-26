import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-forest-900 py-28">
      <div className="absolute inset-0 pattern-grid opacity-40" aria-hidden />
      <div className="container-wide relative max-w-xl text-center">
        <p className="font-serif text-7xl font-semibold text-gold-300">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Page Not Found</h1>
        <p className="mx-auto mt-4 max-w-md text-white/65">
          The page you're looking for doesn't exist or may have moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-gold">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
          <Link href="/programs" className="btn-ghost-light">
            <Search className="h-4 w-4" />
            Explore Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
