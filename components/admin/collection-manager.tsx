'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, Loader2, Pencil, Plus, Search, Trash2, X } from 'lucide-react';
import { createAdminClient } from '@/lib/supabase-admin';
import type { CollectionConfig, FieldDef } from '@/lib/admin-schema';

type Row = Record<string, any>;

export function CollectionManager({ config }: { config: CollectionConfig }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<Row | null>(null); // null = closed, {} = new
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<Row | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const supabase = createAdminClient();
      let req = supabase.from(config.table).select('*');
      const order = config.order;
      if (order.startsWith('-')) {
        req = req.order(order.slice(1), { ascending: false });
      } else {
        req = req.order(order, { ascending: true });
      }
      const { data, error: e } = await req.limit(500);
      if (e) throw e;
      setRows(data ?? []);
    } catch (err: any) {
      setError(err?.message ?? 'Failed to load records.');
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter((r) =>
      config.listFields.some((f) => String(r[f] ?? '').toLowerCase().includes(q))
    );
  }, [rows, query, config]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const supabase = createAdminClient();
      const payload: Row = { ...editing };
      // coerce numbers
      for (const f of config.fields) {
        if (f.type === 'number') payload[f.name] = Number(payload[f.name] ?? 0);
      }
      let dbError;
      if (payload.id) {
        const { id, ...update } = payload;
        ({ error: dbError } = await supabase.from(config.table).update(update).eq('id', id));
      } else {
        ({ error: dbError } = await supabase.from(config.table).insert(payload));
      }
      if (dbError) throw dbError;
      setEditing(null);
      await load();
    } catch (err: any) {
      setError(err?.message ?? 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!deleting) return;
    setSaving(true);
    setError('');
    try {
      const supabase = createAdminClient();
      const { error: e } = await supabase.from(config.table).delete().eq('id', deleting.id);
      if (e) throw e;
      setDeleting(null);
      await load();
    } catch (err: any) {
      setError(err?.message ?? 'Failed to delete.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-serif text-2xl font-semibold text-forest-800">{config.label}</h1>
          <p className="mt-1 text-sm text-charcoal/60">{filtered.length} record{filtered.length === 1 ? '' : 's'}</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="input-field !w-52 !rounded-full pl-9"
              aria-label={`Search ${config.label}`}
            />
          </div>
          <button onClick={() => setEditing({})} className="btn-primary !px-4 !py-2.5 text-sm">
            <Plus className="h-4 w-4" />
            New
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-7 w-7 animate-spin text-forest-600" />
        </div>
      ) : config.single ? (
        <div className="card-surface mt-6 max-w-2xl p-8">
          {rows[0] ? (
            <>
              <h2 className="font-medium text-charcoal">Edit Settings</h2>
              <form onSubmit={save} className="mt-6 space-y-4">
                {config.fields.map((f) => (
                  <FieldInput key={f.name} field={f} value={rows[0][f.name]} onChange={(v) => setEditing({ ...rows[0], [f.name]: v })} />
                ))}
                <button type="submit" disabled={saving} className="btn-primary">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  Save Settings
                </button>
              </form>
            </>
          ) : (
            <p className="text-sm text-charcoal/60">No settings row found.</p>
          )}
        </div>
      ) : (
        <div className="card-surface mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50 text-left">
                {config.listFields.map((f) => (
                  <th key={f} className="px-4 py-3 font-medium capitalize text-charcoal/60">
                    {f.replace(/_/g, ' ')}
                  </th>
                ))}
                <th className="px-4 py-3 text-right font-medium text-charcoal/60">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className="border-b border-border/60 last:border-0 hover:bg-forest-50/40">
                  {config.listFields.map((f) => (
                    <td key={f} className="max-w-[240px] truncate px-4 py-3 text-charcoal/80">
                      {typeof row[f] === 'boolean'
                        ? row[f]
                          ? 'Yes'
                          : 'No'
                        : String(row[f] ?? 'Not provided')}
                    </td>
                  ))}
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      onClick={() => setEditing({ ...row })}
                      className="rounded-lg p-2 text-forest-600 hover:bg-forest-50"
                      aria-label={`Edit ${row.title ?? row.name ?? 'record'}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleting(row)}
                      className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                      aria-label={`Delete ${row.title ?? row.name ?? 'record'}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={config.listFields.length + 1} className="px-4 py-10 text-center text-charcoal/50">
                    No records found. Click “New” to add the first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit / New modal */}
      {editing && !config.single && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-charcoal/50 p-4" role="dialog" aria-modal="true">
          <div className="my-8 w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl font-semibold text-forest-800">
                {editing.id ? 'Edit' : 'New'}: {config.label}
              </h2>
              <button onClick={() => setEditing(null)} className="rounded-lg p-2 hover:bg-muted" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={save} className="mt-6 grid gap-4 sm:grid-cols-2">
              {config.fields.map((f) => (
                <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <FieldInput field={f} value={editing[f.name]} onChange={(v) => setEditing({ ...editing, [f.name]: v })} />
                </div>
              ))}
              <div className="sm:col-span-2">
                <button type="submit" disabled={saving} className="btn-primary w-full">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/50 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <h2 className="font-serif text-xl font-semibold text-charcoal">Delete this record?</h2>
            <p className="mt-3 text-sm text-charcoal/65">
              “{deleting.title ?? deleting.name ?? deleting.question ?? deleting.email ?? 'Record'}” will be
              permanently removed from the website.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleting(null)} className="btn-outline !py-2">Cancel</button>
              <button onClick={remove} disabled={saving} className="btn !bg-red-600 !px-6 !py-2 text-white hover:!bg-red-700">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: any;
  onChange: (v: any) => void;
}) {
  if (field.type === 'textarea') {
    return (
      <>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">{field.label}</label>
        <textarea value={value ?? ''} onChange={(e) => onChange(e.target.value)} rows={4} className="input-field resize-none" />
      </>
    );
  }
  if (field.type === 'checkbox') {
    return (
      <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3">
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[#145C43]" />
        <span className="text-sm font-medium text-charcoal">{field.label}</span>
      </label>
    );
  }
  if (field.type === 'select') {
    return (
      <>
        <label className="mb-1.5 block text-sm font-medium text-charcoal">{field.label}</label>
        <select value={value ?? ''} onChange={(e) => onChange(e.target.value)} className="input-field">
          {field.options?.map((o) => (
            <option key={o} value={o}>{o.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </>
    );
  }
  return (
    <>
      <label className="mb-1.5 block text-sm font-medium text-charcoal">{field.label}</label>
      <input
        type={field.type === 'number' ? 'number' : 'text'}
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="input-field"
      />
    </>
  );
}
