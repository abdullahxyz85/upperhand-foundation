'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase-admin';
import type { SubmissionConfig } from '@/lib/admin-schema';

type Row = Record<string, any>;

export function SubmissionInbox({ config }: { config: SubmissionConfig }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const supabase = createAdminClient();
      const { data, error: e } = await supabase
        .from(config.table)
        .select('*')
        .order('created_at', { ascending: false })
        .limit(500);
      if (e) throw e;
      setRows(data ?? []);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load submissions.');
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (row: Row, status: string) => {
    setSavingId(row.id);
    try {
      const supabase = createAdminClient();
      const { error: e } = await supabase.from(config.table).update({ status }).eq('id', row.id);
      if (e) throw e;
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status } : r)));
    } catch (err: any) {
      setError(err?.message ?? 'Failed to update status.');
    } finally {
      setSavingId(null);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
      case 'accepted':
      case 'responded':
        return 'bg-forest-50 text-forest-700';
      case 'failed':
      case 'rejected':
        return 'bg-red-50 text-red-700';
      case 'reviewing':
        return 'bg-gold-100 text-gold-600';
      default:
        return 'bg-muted text-charcoal/70';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-forest-800">{config.label}</h1>
          <p className="mt-1 text-sm text-charcoal/60">{rows.length} submission{rows.length === 1 ? '' : 's'}</p>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-forest-600" />
        </div>
      ) : rows.length === 0 ? (
        <div className="card-surface mt-6 p-10 text-center text-sm text-charcoal/55">
          No submissions yet. New entries from the website will appear here.
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {rows.map((row) => (
            <div key={row.id} className="card-surface overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                className="flex w-full flex-wrap items-center justify-between gap-3 p-5 text-left hover:bg-forest-50/40"
                aria-expanded={expanded === row.id}
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-charcoal">
                    {row.donor_name ?? row.full_name ?? row.name ?? row.contact_name ?? row.email ?? 'Submission'}
                    {row.reference ? <span className="ml-2 font-mono text-xs text-charcoal/50">{row.reference}</span> : null}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-charcoal/55">
                    {row.email ?? ''}
                    {row.amount_pkr ? ` · PKR ${Number(row.amount_pkr).toLocaleString()}` : ''}
                    {row.created_at ? ` · ${new Date(row.created_at).toLocaleDateString()}` : ''}
                  </p>
                </div>
                {row.status && (
                  <span className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusColor(row.status)}`}>
                    {row.status}
                  </span>
                )}
              </button>
              {expanded === row.id && (
                <div className="border-t border-border/60 bg-muted/30 p-5">
                  <dl className="grid gap-3 text-sm sm:grid-cols-2">
                    {config.columns
                      .filter((c) => !['reference', 'status'].includes(c.name))
                      .map((c) => (
                        <div key={c.name}>
                          <dt className="text-xs font-medium uppercase tracking-wide text-charcoal/45">{c.label}</dt>
                          <dd className="mt-0.5 break-words text-charcoal/80">
                            {c.name === 'created_at'
                              ? new Date(row[c.name]).toLocaleString()
                              : c.name === 'amount_pkr'
                                ? `PKR ${Number(row[c.name]).toLocaleString()}`
                                : row[c.name] || 'Not provided'}
                          </dd>
                        </div>
                      ))}
                  </dl>
                  {config.statuses && (
                    <div className="mt-5 flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-wide text-charcoal/45">Set status:</span>
                      {config.statuses.map((s) => (
                        <button
                          key={s}
                          onClick={() => setStatus(row, s)}
                          disabled={savingId === row.id || row.status === s}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                            row.status === s
                              ? 'border-forest-700 bg-forest-700 text-white'
                              : 'border-border bg-white text-charcoal/70 hover:border-forest-600/50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
