import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { ContactForm } from '@/components/contact-form';
import { PlaceholderNotice } from '@/components/page-parts';
import { contactPlaceholders } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Upper Hands Foundation for questions about donations, volunteering, partnerships or our programs.',
};

export default function ContactPage() {
  const details = [
    { icon: MapPin, label: 'Address', value: contactPlaceholders.address, isPlaceholder: true },
    { icon: Phone, label: 'Phone', value: `${contactPlaceholders.phone} (placeholder)`, isPlaceholder: true },
    { icon: Mail, label: 'Email', value: contactPlaceholders.email, href: `mailto:${contactPlaceholders.email}`, isPlaceholder: false },
    { icon: Clock, label: 'Office Hours', value: contactPlaceholders.officeHours, isPlaceholder: false },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We'd Love to Hear From You"
        description="Whether you want to give, volunteer, partner or simply ask a question, every message reaches a real person on our team."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
      />

      <section className="section-padding">
        <div className="container-wide grid items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold text-forest-800">Reach Us Directly</h2>
              <div className="mt-6 space-y-5">
                {details.map((d) => (
                  <div key={d.label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest-50 text-forest-700">
                      <d.icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-charcoal/50">{d.label}</p>
                      {d.href ? (
                        <a href={d.href} className="mt-0.5 block text-sm text-charcoal hover:text-forest-700">
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm text-charcoal">{d.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <PlaceholderNotice>
                  Official address, phone number and WhatsApp contact will appear here once provided by
                  the foundation. A floating WhatsApp button will be added automatically at that time.
                </PlaceholderNotice>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-3">
            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
