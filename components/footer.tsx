import Link from 'next/link';
import {
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from 'lucide-react';
import { NewsletterForm } from './newsletter-form';
import { contactPlaceholders } from '@/lib/site';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Mission & Vision', href: '/about/mission-vision' },
  { label: 'Our Programs', href: '/programs' },
  { label: 'Our Projects', href: '/projects' },
  { label: 'Our Impact', href: '/impact' },
  { label: 'Success Stories', href: '/stories' },
  { label: 'News & Updates', href: '/news' },
  { label: 'Contact Us', href: '/contact' },
];

const programLinks = [
  { label: 'Education & Learning', href: '/programs/education-learning' },
  { label: 'Healthcare & Medical Assistance', href: '/programs/healthcare-medical-assistance' },
  { label: 'Food Distribution', href: '/programs/food-distribution' },
  { label: 'Community Welfare', href: '/programs/community-welfare' },
  { label: 'Orphan & Child Support', href: '/programs/orphan-child-support' },
  { label: 'Emergency & Disaster Relief', href: '/programs/emergency-disaster-relief' },
  { label: 'Clean Water & Basic Necessities', href: '/programs/clean-water-basic-necessities' },
  { label: 'Social Development', href: '/programs/social-development' },
];

const socials = [
  { label: 'Facebook', icon: Facebook, href: '#' },
  { label: 'Instagram', icon: Instagram, href: '#' },
  { label: 'Twitter', icon: Twitter, href: '#' },
  { label: 'YouTube', icon: Youtube, href: '#' },
  { label: 'LinkedIn', icon: Linkedin, href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white/70">
      <div className="container-wide grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest-600 text-white">
              <HeartHandshake className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-semibold text-white">Upper Hands</span>
              <span className="block text-[11px] font-medium tracking-[0.18em] uppercase text-white/60">Foundation</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            A humanitarian welfare organization based in Pakistan, working to bring hope, support communities
            and transform lives with dignity.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href={label === 'Facebook' ? 'https://www.facebook.com/upperhandsfoundation' : '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Upper Hands Foundation on ${label}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} className="transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Our Programs</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {programLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-gold-300">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Stay Connected</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span>{contactPlaceholders.address}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-300" />
              <span>{contactPlaceholders.phone} <span className="text-white/50">(placeholder)</span></span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-300" />
              <a href={`mailto:${contactPlaceholders.email}`} className="hover:text-gold-300 transition-colors">
                {contactPlaceholders.email}
              </a>
            </li>
          </ul>
          <div className="mt-6">
            <p className="text-sm text-white/60">Subscribe for foundation updates.</p>
            <div className="mt-3">
              <NewsletterForm compact />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Upper Hands Foundation. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-gold-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-gold-300 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
