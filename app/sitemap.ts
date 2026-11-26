import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '', priority: 1.0 },
    { path: '/about', priority: 0.9 },
    { path: '/about/mission-vision', priority: 0.7 },
    { path: '/about/leadership', priority: 0.7 },
    { path: '/about/transparency', priority: 0.8 },
    { path: '/programs', priority: 0.9 },
    { path: '/projects', priority: 0.9 },
    { path: '/donate', priority: 1.0 },
    { path: '/impact', priority: 0.8 },
    { path: '/get-involved', priority: 0.8 },
    { path: '/get-involved/volunteer', priority: 0.8 },
    { path: '/get-involved/partnerships', priority: 0.7 },
    { path: '/stories', priority: 0.7 },
    { path: '/news', priority: 0.7 },
    { path: '/gallery', priority: 0.5 },
    { path: '/faqs', priority: 0.6 },
    { path: '/contact', priority: 0.8 },
    { path: '/privacy-policy', priority: 0.3 },
    { path: '/terms-and-conditions', priority: 0.3 },
  ].map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (url && key) {
      const supabase = createClient(url, key);
      const [programs, projects, posts, stories] = await Promise.all([
        supabase.from('programs').select('slug').eq('is_active', true),
        supabase.from('projects').select('slug').in('status', ['active', 'completed']),
        supabase.from('posts').select('slug, published_at').eq('is_published', true),
        supabase.from('stories').select('slug, created_at').eq('is_published', true),
      ]);
      dynamicRoutes = [
        ...(programs.data ?? []).map((p) => ({ path: `/programs/${p.slug}`, priority: 0.7 })),
        ...(projects.data ?? []).map((p) => ({ path: `/projects/${p.slug}`, priority: 0.8 })),
        ...(posts.data ?? []).map((p) => ({ path: `/news/${p.slug}`, priority: 0.6, lastModified: p.published_at })),
        ...(stories.data ?? []).map((p) => ({ path: `/stories/${p.slug}`, priority: 0.6, lastModified: p.created_at })),
      ].map((r: any) => ({
        url: `${SITE_URL}${r.path}`,
        lastModified: r.lastModified ? new Date(r.lastModified) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: r.priority,
      }));
    }
  } catch {
    // sitemap stays static if the database is unreachable
  }

  return [...staticRoutes, ...dynamicRoutes];
}
