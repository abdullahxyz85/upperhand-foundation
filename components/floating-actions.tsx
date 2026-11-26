'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { contactPlaceholders } from '@/lib/site';

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="animate-fade-in flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white text-forest-700 shadow-lg transition-all hover:bg-forest-50"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
      {contactPlaceholders.whatsapp ? (
        <a
          href={`https://wa.me/${contactPlaceholders.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.65 15.02L2 22l5.12-1.32A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.04.79.8-2.96-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.25-.13-1.46-.72-1.69-.8-.23-.08-.4-.12-.56.13-.17.24-.64.8-.79.97-.14.16-.29.18-.53.06a6.66 6.66 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.3-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.16 1.75 2.67 4.23 3.74.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.14-1.18-.06-.1-.23-.16-.48-.29Z"/>
          </svg>
        </a>
      ) : null}
    </div>
  );
}
