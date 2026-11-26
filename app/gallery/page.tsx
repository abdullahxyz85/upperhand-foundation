import type { Metadata } from 'next';
import { ImageOff } from 'lucide-react';
import { PageHero, SectionHeading, CtaBanner } from '@/components/sections';
import { Reveal } from '@/components/reveal';
import { PlaceholderNotice } from '@/components/page-parts';
import { getSupabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Photos from the field, featuring the people and moments of Upper Hands Foundation\'s humanitarian work across Pakistan.',
};

type Image = { id: string; title: string; image_url: string; category: string };

async function getGallery(): Promise<Image[]> {
  try {
    const { data } = await getSupabase()
      .from('gallery_images')
      .select('*')
      .order('sort_order');
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const images = await getGallery();
  const categories = Array.from(new Set(images.map((i) => i.category)));

  return (
    <>
      <PageHero
        eyebrow="Media & Stories"
        title="Gallery"
        description="Moments from our work, photographed with respect and published with permission."
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="section-padding">
        <div className="container-wide">
          {images.length > 0 ? (
            <>
              <SectionHeading
                align="left"
                eyebrow="From the Field"
                title="Our Work in Pictures"
              />
              {categories.map((cat) => (
                <div key={cat} className="mt-10">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gold-600">{cat}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {images
                      .filter((i) => i.category === cat)
                      .map((img) => (
                        <figure key={img.id} className="group overflow-hidden rounded-2xl border border-border/70 bg-white">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.image_url}
                            alt={img.title || 'Foundation activity photograph'}
                            className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          {img.title && (
                            <figcaption className="p-3 text-xs text-charcoal/60">{img.title}</figcaption>
                          )}
                        </figure>
                      ))}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="mx-auto max-w-2xl text-center">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-700">
                <ImageOff className="h-8 w-8" />
              </span>
              <h2 className="mt-6 text-2xl font-semibold text-forest-800">Gallery Coming Soon</h2>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/65">
                Photographs will be published here as the foundation's activities begin, always with the
                consent and dignity of the people pictured.
              </p>
              <div className="mt-8 text-left">
                <PlaceholderNotice>
                  Gallery images are uploaded by foundation administrators through the admin dashboard.
                </PlaceholderNotice>
              </div>
            </div>
          )}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
