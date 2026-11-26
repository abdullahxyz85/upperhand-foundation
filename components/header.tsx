'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Heart } from 'lucide-react';
import { Logo } from './logo';
import { navigation } from '@/lib/site';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 shadow-md backdrop-blur-md'
          : 'bg-cream/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-wide flex h-18 items-center justify-between gap-4 py-3">
        <Logo />

        <nav aria-label="Main navigation" className="hidden items-center gap-0.5 lg:flex">
          {navigation.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(item.children ? item.label : null)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-forest-700'
                    : 'text-charcoal/75 hover:text-forest-700'
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`}
                  />
                )}
              </Link>
              {item.children && openMenu === item.label && (
                <div className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-2">
                  <div className="animate-fade-in overflow-hidden rounded-2xl border border-border/60 bg-white p-2 shadow-xl shadow-forest-900/10">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block rounded-xl px-4 py-2.5 transition-colors hover:bg-forest-50"
                      >
                        <span className="block text-sm font-medium text-charcoal">{child.label}</span>
                        {child.description && (
                          <span className="block text-xs text-charcoal/55">{child.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/donate" className="btn-primary hidden !px-5 !py-2.5 text-sm sm:inline-flex">
            <Heart className="h-4 w-4" />
            Donate Now
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-charcoal lg:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 top-[68px] z-40 overflow-y-auto border-t border-border bg-cream lg:hidden">
          <nav aria-label="Mobile navigation" className="container-wide flex flex-col gap-1 py-6">
            {navigation.map((item) => (
              <div key={item.label} className="border-b border-border/60 pb-1">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={`block flex-1 py-3 font-medium ${isActive(item.href) ? 'text-forest-700' : 'text-charcoal'}`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      onClick={() => setOpenMenu(openMenu === item.label ? null : item.label)}
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-charcoal/60"
                      aria-label={`Toggle ${item.label} submenu`}
                      aria-expanded={openMenu === item.label}
                    >
                      <ChevronDown className={`h-4 w-4 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {item.children && openMenu === item.label && (
                  <div className="animate-fade-in flex flex-col gap-0.5 pb-3 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="rounded-lg px-3 py-2 text-sm text-charcoal/75 hover:bg-forest-50 hover:text-forest-700"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/donate" className="btn-primary mt-4 justify-center">
              <Heart className="h-4 w-4" />
              Donate Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
