'use client';

import { use } from 'react';
import { CollectionManager } from '@/components/admin/collection-manager';
import { collections } from '@/lib/admin-schema';

export default function AdminCollectionPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);
  const config = collections.find((c) => c.key === key);
  if (!config) {
    return <p className="text-sm text-charcoal/60">Unknown section.</p>;
  }
  return <CollectionManager config={config} />;
}
