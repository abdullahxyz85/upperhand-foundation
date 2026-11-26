'use client';

import { use } from 'react';
import { SubmissionInbox } from '@/components/admin/submission-inbox';
import { submissions } from '@/lib/admin-schema';

export default function AdminInboxPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = use(params);
  const config = submissions.find((s) => s.key === key);
  if (!config) {
    return <p className="text-sm text-charcoal/60">Unknown inbox.</p>;
  }
  return <SubmissionInbox config={config} />;
}
