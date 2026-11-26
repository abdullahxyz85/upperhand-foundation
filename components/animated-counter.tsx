'use client';

import { useEffect, useRef, useState } from 'react';

export function AnimatedCounter({
  value,
  suffix = '',
  className = '',
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || value <= 0) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  if (value <= 0) {
    return (
      <span ref={ref} className={className}>
        <span className="inline-flex items-center rounded-full border border-dashed border-gold-400/70 bg-gold-100/40 px-3 py-0.5 font-sans text-xs font-medium tracking-wide text-charcoal/70">
          Placeholder — pending verified figures
        </span>
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
