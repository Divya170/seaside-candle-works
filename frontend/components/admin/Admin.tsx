'use client';

import { Fragment, useState } from 'react';
import { api, ApiError, qs } from '@/lib/api';
import { useDebounced } from '@/hooks/useDebounced';
import { money } from '@/lib/vm';
import type { Message, Order, Product, Settings, Site } from '@/lib/types';
import { useAdminResource } from './useAdminResource';
import { Btn, ConfirmDelete, Empty, Field, Notice, S, Switch, Toolbar, fmtDateTime } from './ui';

type Common = { site: Site; onChange: () => void; onUnauthorized: () => void; toast: (m: string) => void };
const card: React.CSSProperties = { background: '#FCFBF7', border: '1px solid rgba(36,59,59,.14)', borderRadius: '4px', padding: '18px 20px' };
const select: React.CSSProperties = { height: '42px', padding: '0 10px', border: '1px solid rgba(36,59,59,.3)', borderRadius: '4px', background: '#FCFBF7', color: '#152828' };
const h3: React.CSSProperties = { margin: 0, font: "500 26px/1.1 'Playfair Display',Georgia,serif", color: '#152828' };
const small: React.CSSProperties = { font: '700 11px Inter,sans-serif', letterSpacing: '.12em', textTransform: 'uppercase', color: '#3A4643' };
const inputS = (err?: string): React.CSSProperties => ({ ...S.input, height: '46px', width: '100%', border: err ? '1.5px solid #9B3B2E' : '1px solid rgba(36,59,59,.3)', background: '#FCFBF7', borderRadius: '4px' });
const areaS = (err?: string): React.CSSProperties => ({ padding: '10px 12px', width: '100%', border: err ? '1.5px solid #9B3B2E' : '1px solid rgba(36,59,59,.3)', background: '#FCFBF7', borderRadius: '4px', font: '400 15px/1.55 Inter,sans-serif', color: '#152828', resize: 'vertical' });

function useSubmit(onUnauthorized: () => void) {
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  const run = async <T,>(fn: () => Promise<T>): Promise<T | null> => {
    setBusy(true);
    setFail('');
    try {
      const r = await fn();
      setErrs({});
      return r;
    } catch (e) {
      const ae = e as ApiError;
      if (ae.status === 401) onUnauthorized();
      else if (ae.status === 400 && Object.keys(ae.errors).length) setErrs(ae.errors);
      else setFail(ae.message);
      return null;
    } finally {
      setBusy(false);
    }
  };
  return { errs, busy, fail, run, clear: (k: string) => setErrs((e) => ({ ...e, [k]: '' })) };
}

/* ---------------- Orders ---------------- */

export function OrdersTab({ site, onChange, onUnauthorized, toast }: Common) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const [payment, setPayment] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  const dq = useDebounced(q.trim(), 300);
  const { data, setData, loading, error, reload } = useAdminResource<{ items: Order[]; total: number }>('/admin/orders' + qs({ status, q: dq, payment }), onUnauthorized);
  const [rowError, setRowError] = useState<string | null>(null);
  const put = (o: Order) => setData((d) => (d ? { ...d, items: d.items.map((x) => (x.id === o.id ? o : x)) } : d));
  const patch = async (o: Order, body: Partial<Order>, msg: string) => {
    setRowError(null);
    put({ ...o, ...body });
    try {
      put(await api<Order>('/admin/orders/' + o.id, { method: 'PATCH', body, admin: true }));
      toast(msg);
      onChange();
    } catch (e) {
      put(o);
      setRowError(`${o.ref}: ${(e as Error).message}`);
    }
  };
  const remove = async (o: Order) => {
    try {
      await api('/admin/orders/' + o.id, { method: 'DELETE', admin: true });
      setData((d) => (d ? { items: d.items.filter((x) => x.id !== o.id), total: d.total - 1 } : d));
      toast(`${o.ref} deleted`);
      onChange();
    } catch (e) {
      setRowError((e as Error).message);
    }
  };
  if (!data && loading) return <Notice kind="loading">Loading orders…</Notice>;
  if (!data) return <Notice kind="error" onRetry={reload}>{error}</Notice>;
  if (data.total === 0) return <Empty title="No orders yet" body="Orders placed at checkout appear here. Each one starts as “Awaiting payment” until you confirm it with the customer." />;
  const pend = (c: number | null) => (c === null ? 'to confirm' : money(c));
  return (
    <div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ flex: '1 1 520px' }}>
          <Toolbar q={q} onQ={setQ} status={status} onStatus={setStatus} statuses={site.orderStatuses} placeholder="Search order, customer, city or candle" count={loading ? 'Updating…' : `${data.items.length} of ${data.total}`} />
        </div>
        <select aria-label="Filter by payment" value={payment} onChange={(e) => setPayment(e.target.value)} style={{ ...select, marginBottom: '18px' }}>
          <option value="">Any payment status</option>
          {site.paymentStatuses.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      {(error || rowError) && <div style={{ marginBottom: '14px' }}><Notice kind="error" onRetry={error ? reload : undefined}>{error || rowError}</Notice></div>}
      {data.items.length === 0 ? <Empty title="No matching orders" body="Try a different search or filter." /> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.items.map((o) => (
            <div key={o.id} style={card}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '12px 24px', alignItems: 'start' }}>
                <div>
                  <p style={{ margin: 0, font: "500 22px 'Playfair Display',Georgia,serif" }}>{o.first} {o.last}</p>
                  <p style={{ ...small, margin: '4px 0 0' }}>{o.ref} · {fmtDateTime(o.createdAt)}</p>
                  <p style={{ margin: '6px 0 0', fontSize: '15px' }}>{o.items.map((i) => `${i.name} × ${i.qty}`).join(', ')}</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '17px' }}>{money(o.totalCents)}</p>
                  <p style={{ margin: '2px 0 0', color: '#3A4643', fontSize: '14px' }}>Subtotal {money(o.subtotalCents)} · shipping {pend(o.shippingCents)} · tax {pend(o.taxCents)}</p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <select value={o.status} onChange={(e) => patch(o, { status: e.target.value }, `${o.ref} marked ${e.target.value}`)} aria-label={`Order status of ${o.ref}`} style={select}>
                    {site.orderStatuses.map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                  <select value={o.paymentStatus} onChange={(e) => patch(o, { paymentStatus: e.target.value }, `${o.ref}: ${e.target.value}`)} aria-label={`Payment status of ${o.ref}`} style={{ ...select, color: o.paymentStatus === 'Awaiting payment' ? '#9B3B2E' : '#152828' }}>
                    {site.paymentStatuses.map((x) => <option key={x} value={x}>{x}</option>)}
                  </select>
                  <Btn kind="link" onClick={() => setOpen(open === o.id ? null : o.id)}>{open === o.id ? 'Hide' : 'Details'}</Btn>
                </div>
              </div>
              {open === o.id && (
                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid rgba(36,59,59,.12)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '14px 24px', fontSize: '15px' }}>
                  <div>
                    <p style={small}>Ship to</p>
                    <p style={{ margin: '4px 0 0', whiteSpace: 'pre-line' }}>{`${o.first} ${o.last}\n${o.address}${o.apt ? ', ' + o.apt : ''}\n${o.city}, ${o.state} ${o.zip}`}</p>
                  </div>
                  <div>
                    <p style={small}>Contact</p>
                    <p style={{ margin: '4px 0 0' }}>
                      <a href={`mailto:${o.email}?subject=${encodeURIComponent('Your Seaside Candle Works order ' + o.ref)}`}>{o.email}</a>
                      {o.phone && <><br /><a href={'tel:' + o.phone.replace(/[^\d+]/g, '')}>{o.phone}</a></>}
                    </p>
                  </div>
                  <div>
                    <p style={small}>Items</p>
                    <table style={{ marginTop: '4px', borderCollapse: 'collapse', fontSize: '14.5px' }}>
                      <tbody>
                        {o.items.map((i) => (
                          <tr key={i.productId + i.name}><td style={{ padding: '2px 12px 2px 0' }}>{i.name} × {i.qty}</td><td style={{ textAlign: 'right' }}>{money(i.lineCents)}</td></tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end' }}><ConfirmDelete label={`Delete order ${o.ref}`} onConfirm={() => remove(o)} /></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Messages ---------------- */

export function MessagesTab({ site, onChange, onUnauthorized, toast }: Common) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All');
  const dq = useDebounced(q.trim(), 300);
  const { data, setData, loading, error, reload } = useAdminResource<{ items: Message[]; total: number }>('/admin/messages' + qs({ status, q: dq }), onUnauthorized);
  const [rowError, setRowError] = useState<string | null>(null);
  const put = (m: Message) => setData((d) => (d ? { ...d, items: d.items.map((x) => (x.id === m.id ? m : x)) } : d));
  if (!data && loading) return <Notice kind="loading">Loading messages…</Notice>;
  if (!data) return <Notice kind="error" onRetry={reload}>{error}</Notice>;
  if (data.total === 0) return <Empty title="No messages yet" body="Messages from the contact form land here." />;
  return (
    <div>
      <Toolbar q={q} onQ={setQ} status={status} onStatus={setStatus} statuses={site.messageStatuses} placeholder="Search name, email, subject or message" count={loading ? 'Updating…' : `${data.items.length} of ${data.total}`} />
      {(error || rowError) && <div style={{ marginBottom: '14px' }}><Notice kind="error" onRetry={error ? reload : undefined}>{error || rowError}</Notice></div>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.items.map((m) => (
          <div key={m.id} style={{ ...card, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '12px 24px', alignItems: 'start' }}>
            <div>
              <p style={{ margin: 0, font: "500 22px 'Playfair Display',Georgia,serif" }}>{m.name}</p>
              <p style={{ ...small, margin: '4px 0 0' }}>{m.ref} · {fmtDateTime(m.createdAt)}</p>
              <p style={{ margin: '6px 0 0', fontSize: '15px' }}><a href={`mailto:${m.email}?subject=${encodeURIComponent('Re: ' + m.subject)}`}>{m.email}</a></p>
            </div>
            <div>
              <p style={{ margin: 0, fontWeight: 700 }}>{m.subject}</p>
              <p style={{ margin: '4px 0 0', color: '#323F3D', fontSize: '15px', whiteSpace: 'pre-line' }}>{m.message}</p>
            </div>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select value={m.status} aria-label={`Status of ${m.ref}`} style={select} onChange={async (e) => {
                const next = e.target.value;
                put({ ...m, status: next });
                try { put(await api<Message>('/admin/messages/' + m.id, { method: 'PATCH', body: { status: next }, admin: true })); toast('Marked ' + next); onChange(); }
                catch (err) { put(m); setRowError((err as Error).message); }
              }}>
                {site.messageStatuses.map((x) => <option key={x} value={x}>{x}</option>)}
              </select>
              <ConfirmDelete label={`Delete message ${m.ref}`} onConfirm={async () => {
                try { await api('/admin/messages/' + m.id, { method: 'DELETE', admin: true }); setData((d) => (d ? { items: d.items.filter((x) => x.id !== m.id), total: d.total - 1 } : d)); toast('Deleted'); onChange(); }
                catch (err) { setRowError((err as Error).message); }
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Products ---------------- */

type Draft = {
  name: string; categoryId: string; price: string; status: string; badge: string; collections: string[]; scent: string; size: string;
  shortDesc: string; description: string; scentNotes: string; sizeDetails: string; ingredients: string; img: string; lifeImg: string; pos: string; altDesc: string; published: boolean;
};
const toDraft = (p: Product | null, site: Site, images: string[]): Draft => ({
  name: p?.name ?? '', categoryId: p?.categoryId ?? site.categories[0]?.id ?? '', price: p && p.priceCents !== null ? (p.priceCents / 100).toFixed(2) : '',
  status: p?.status ?? 'available', badge: p?.badge ?? '', collections: p?.collections ?? [], scent: p?.scent ?? '', size: p?.size ?? '',
  shortDesc: p?.shortDesc ?? '', description: p?.description ?? '', scentNotes: p?.scentNotes ?? '', sizeDetails: p?.sizeDetails ?? '', ingredients: p?.ingredients ?? '',
  img: p?.img ?? images[0] ?? '', lifeImg: p?.lifeImg ?? images[1] ?? images[0] ?? '', pos: p?.pos ?? '50% 50%', altDesc: p?.altDesc ?? '', published: p?.published ?? true,
});

function ProductForm({ product, site, images, onSaved, onCancel, onUnauthorized }: { product: Product | null; site: Site; images: string[]; onSaved: (p: Product, created: boolean) => void; onCancel: () => void; onUnauthorized: () => void }) {
  const { errs, busy, fail, run, clear } = useSubmit(onUnauthorized);
  const [d, setD] = useState<Draft>(() => toDraft(product, site, images));
  const idp = `pf-${product?.id ?? 'new'}-`;
  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => { setD((x) => ({ ...x, [k]: v })); clear(k as string); };
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await run(() => (product ? api<Product>('/admin/products/' + product.id, { method: 'PUT', body: d, admin: true }) : api<Product>('/admin/products', { method: 'POST', body: d, admin: true })));
    if (r) onSaved(r, !product);
  };
  const text = (k: keyof Draft, label: string, hint?: string) => (
    <Field id={idp + k} label={label} error={errs[k as string]} hint={hint}>
      <input id={idp + k} value={d[k] as string} onChange={(e) => set(k, e.target.value as any)} style={inputS(errs[k as string])} />
    </Field>
  );
  const area = (k: keyof Draft, label: string, rows = 3, hint?: string) => (
    <Field id={idp + k} label={label} error={errs[k as string]} hint={hint}>
      <textarea id={idp + k} rows={rows} value={d[k] as string} onChange={(e) => set(k, e.target.value as any)} style={areaS(errs[k as string])}></textarea>
    </Field>
  );
  const photoPicker = (k: 'img' | 'lifeImg', label: string) => (
    <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
      <legend style={{ ...S.label, padding: 0, marginBottom: '8px' }}>{label}</legend>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {images.map((src) => (
          <button type="button" key={src} onClick={() => set(k, src)} aria-pressed={d[k] === src ? 'true' : 'false'} aria-label={`${label}: ${src.split('/').pop()}`}
            style={{ width: '64px', height: '80px', padding: 0, border: `2px solid ${d[k] === src ? '#152828' : 'transparent'}`, borderRadius: '3px', overflow: 'hidden', cursor: 'pointer', background: '#EDE5D6' }}>
            <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: d[k] === src ? 1 : 0.7 }} />
          </button>
        ))}
      </div>
      {errs[k] && <span style={S.err}>{errs[k]}</span>}
    </fieldset>
  );
  return (
    <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingTop: product ? '16px' : 0 }}>
      {!product && <h3 style={h3}>Add a candle</h3>}
      {fail && <Notice kind="error">{fail}</Notice>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '14px 18px' }}>
        {text('name', 'Name *')}
        <Field id={idp + 'categoryId'} label="Category *" error={errs.categoryId}>
          <select id={idp + 'categoryId'} value={d.categoryId} onChange={(e) => set('categoryId', e.target.value)} style={inputS(errs.categoryId)}>
            {site.categories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </Field>
        {text('price', 'Price (USD)', 'Blank shows “[Price]” and the candle can’t be ordered yet.')}
        <Field id={idp + 'status'} label="Availability">
          <select id={idp + 'status'} value={d.status} onChange={(e) => set('status', e.target.value)} style={inputS()}>
            <option value="available">In stock</option>
            <option value="soldout">Sold out</option>
          </select>
        </Field>
        {text('badge', 'Badge', 'e.g. Best Seller, Seasonal — or blank')}
        {text('scent', 'Scent line (cards)')}
        {text('size', 'Size (product page)')}
      </div>
      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend style={{ ...S.label, padding: 0, marginBottom: '8px' }}>Collections</legend>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {site.collections.map((c) => {
            const on = d.collections.includes(c.id);
            return (
              <label key={c.id} style={{ minHeight: '40px', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 14px', border: '1px solid rgba(36,59,59,.3)', borderRadius: '999px', background: on ? '#EAE2D2' : '#FCFBF7', cursor: 'pointer', fontSize: '14.5px' }}>
                <input type="checkbox" checked={on} onChange={() => set('collections', on ? d.collections.filter((x) => x !== c.id) : [...d.collections, c.id])} style={{ accentColor: '#152828' }} />
                {c.name}
              </label>
            );
          })}
        </div>
      </fieldset>
      {area('shortDesc', 'Short description', 2)}
      {area('description', 'Full description', 4)}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '14px 18px' }}>
        {area('scentNotes', 'Scent notes', 3)}
        {area('sizeDetails', 'Size & dimensions', 3)}
        {area('ingredients', 'Ingredients', 3, 'Shown as its own section only when filled in.')}
      </div>
      {photoPicker('img', 'Product photo')}
      {photoPicker('lifeImg', 'Lifestyle photo')}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '14px 18px' }}>
        {text('altDesc', 'Photo description', 'For screen readers, e.g. “lit candle in amber glass”')}
        {text('pos', 'Photo focus point', 'e.g. 50% 50% (x% y%)')}
      </div>
      <Switch on={d.published} label="Shown in the shop" onToggle={() => set('published', !d.published)} text={d.published ? 'Shown in the shop' : 'Hidden'} />
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Btn type="submit" busy={busy}>{busy ? 'Saving…' : product ? 'Save candle' : 'Add candle'}</Btn>
        <Btn kind="link" onClick={onCancel}>Cancel</Btn>
      </div>
    </form>
  );
}

export function ProductsTab({ site, onChange, onUnauthorized, toast }: Common) {
  const { data, setData, loading, error, reload } = useAdminResource<{ items: Product[]; images: string[] }>('/admin/products', onUnauthorized);
  const [editing, setEditing] = useState<string | 'new' | null>(null);
  const [rowError, setRowError] = useState<string | null>(null);
  if (!data && loading) return <Notice kind="loading">Loading candles…</Notice>;
  if (!data) return <Notice kind="error" onRetry={reload}>{error}</Notice>;
  const saved = (p: Product, created: boolean) => {
    setData((d) => (d ? { ...d, items: created ? [...d.items, p] : d.items.map((x) => (x.id === p.id ? p : x)) } : d));
    setEditing(null);
    toast(created ? `${p.name} added` : `${p.name} saved`);
    onChange();
  };
  const featured = site.products.filter((p) => p.featuredRank !== null).sort((a, b) => a.featuredRank! - b.featuredRank!).map((p) => p.id);
  const toggleFeatured = async (p: Product) => {
    const next = featured.includes(p.id) ? featured.filter((x) => x !== p.id) : [...featured, p.id];
    if (next.length > 3) return setRowError('Up to three candles can be featured on the home page — un-feature one first.');
    setRowError(null);
    try {
      await api('/admin/featured', { method: 'PUT', body: { ids: next }, admin: true });
      toast(featured.includes(p.id) ? `${p.name} removed from the home page` : `${p.name} featured on the home page`);
      onChange();
    } catch (e) {
      if ((e as ApiError).status === 401) onUnauthorized();
      const ae = e as ApiError;
      setRowError(Object.values(ae.errors || {})[0] || ae.message);
    }
  };
  const unpriced = data.items.filter((p) => p.priceCents === null).length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <p style={{ margin: 0, color: '#3A4643', fontSize: '15px' }}>
          {data.items.length} candles · {data.items.filter((p) => p.status === 'soldout').length} sold out{unpriced ? ` · ${unpriced} without a price` : ''}. The prices and stock you started with are the design’s sample figures — check each one.
        </p>
        {editing !== 'new' && <Btn onClick={() => setEditing('new')}>Add candle</Btn>}
      </div>
      {rowError && <Notice kind="error">{rowError}</Notice>}
      {editing === 'new' && <div style={card}><ProductForm product={null} site={site} images={data.images} onSaved={saved} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} /></div>}
      {data.items.length === 0 && <Empty title="No candles yet" body="Add the first candle to open the shop." />}
      {data.items.map((p) => (
        <div key={p.id} style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', minWidth: 0 }}>
              <img src={p.img} alt="" style={{ width: '52px', height: '64px', objectFit: 'cover', objectPosition: p.pos, borderRadius: '3px', filter: p.status === 'soldout' ? 'saturate(.55)' : 'none' }} />
              <div>
                <p style={{ margin: 0, font: "500 21px 'Playfair Display',Georgia,serif" }}>
                  {p.name}
                  {!p.published && <span style={{ ...small, marginLeft: '8px', color: '#9B3B2E' }}>Hidden</span>}
                  {featured.includes(p.id) && <span style={{ ...small, marginLeft: '8px' }}>★ Home #{featured.indexOf(p.id) + 1}</span>}
                </p>
                <p style={{ margin: 0, color: '#3A4643', fontSize: '14px' }}>
                  {p.priceCents !== null ? money(p.priceCents) : 'No price yet'} · {p.status === 'soldout' ? 'Sold out' : 'In stock'} · {p.categoryLabel}
                  {p.badge ? ` · “${p.badge}”` : ''}
                </p>
              </div>
            </div>
            <span style={{ display: 'inline-flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Btn kind="link" onClick={() => toggleFeatured(p)}>{featured.includes(p.id) ? 'Un-feature' : 'Feature'}</Btn>
              <Btn kind="link" onClick={() => setEditing(editing === p.id ? null : p.id)}>{editing === p.id ? 'Close' : 'Edit'}</Btn>
              <ConfirmDelete label={'Delete ' + p.name} onConfirm={async () => {
                try { await api('/admin/products/' + p.id, { method: 'DELETE', admin: true }); setData((d) => (d ? { ...d, items: d.items.filter((x) => x.id !== p.id) } : d)); toast(`${p.name} deleted`); onChange(); }
                catch (e) { setRowError((e as Error).message); }
              }} />
            </span>
          </div>
          {editing === p.id && <ProductForm product={p} site={site} images={data.images} onSaved={saved} onCancel={() => setEditing(null)} onUnauthorized={onUnauthorized} />}
        </div>
      ))}
    </div>
  );
}

/* ---------------- Collections & categories ---------------- */

function NameRow({ title, desc, hint, onSave, onUnauthorized }: { title: string; desc?: string; hint?: string; onSave: (d: { name: string; description: string }) => Promise<unknown>; onUnauthorized: () => void }) {
  const { errs, busy, run } = useSubmit(onUnauthorized);
  const [open, setOpen] = useState(false);
  const [d, setD] = useState({ name: title, description: desc ?? '' });
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await run(() => onSave(d))) setOpen(false);
  };
  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
        <div>
          <p style={{ margin: 0, font: "500 21px 'Playfair Display',Georgia,serif" }}>{title}</p>
          {desc !== undefined && <p style={{ margin: 0, color: '#3A4643', fontSize: '14px' }}>{desc || hint}</p>}
        </div>
        <Btn kind="link" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Edit'}</Btn>
      </div>
      {open && (
        <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px' }}>
          <Field id={'nr-' + title + '-name'} label="Name" error={errs.name || errs.label}><input id={'nr-' + title + '-name'} value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} style={inputS(errs.name || errs.label)} /></Field>
          {desc !== undefined && <Field id={'nr-' + title + '-desc'} label="Description" error={errs.description}><textarea id={'nr-' + title + '-desc'} rows={3} value={d.description} onChange={(e) => setD({ ...d, description: e.target.value })} style={areaS(errs.description)}></textarea></Field>}
          <div><Btn type="submit" busy={busy}>{busy ? 'Saving…' : 'Save'}</Btn></div>
        </form>
      )}
    </div>
  );
}

export function CollectionsTab({ site, onChange, onUnauthorized, toast }: Common) {
  const done = (m: string) => { toast(m); onChange(); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={h3}>Collections</h3>
        {site.collections.map((c) => (
          <NameRow key={c.id + c.name} title={c.name} desc={c.description} hint="No description yet — the site shows the design’s placeholder." onUnauthorized={onUnauthorized}
            onSave={(d) => api('/admin/collections/' + c.id, { method: 'PATCH', body: d, admin: true }).then(() => done(`${d.name} saved`))} />
        ))}
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={h3}>Categories</h3>
        <p style={{ margin: 0, color: '#3A4643', fontSize: '14.5px' }}>Used by the shop’s Category filter.</p>
        {site.categories.map((c) => (
          <NameRow key={c.id + c.label} title={c.label} onUnauthorized={onUnauthorized}
            onSave={(d) => api('/admin/categories/' + c.id, { method: 'PATCH', body: { label: d.name }, admin: true }).then(() => done('Category saved'))} />
        ))}
      </section>
    </div>
  );
}

/* ---------------- Care & FAQ ---------------- */

function CareRow({ item, onSaved, onUnauthorized }: { item: Site['care'][number]; onSaved: () => void; onUnauthorized: () => void }) {
  const { errs, busy, run } = useSubmit(onUnauthorized);
  const [open, setOpen] = useState(false);
  const [d, setD] = useState({ title: item.title, body: item.body.startsWith('[') ? '' : item.body });
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await run(() => api('/admin/care/' + item.n, { method: 'PATCH', body: d, admin: true }))) { setOpen(false); onSaved(); }
  };
  return (
    <div style={card}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
        <p style={{ margin: 0, fontWeight: 700 }}>{item.n} · {item.title}{item.body.startsWith('[') && <span style={{ ...small, marginLeft: '8px', color: '#9B3B2E' }}>Guidance needed</span>}</p>
        <Btn kind="link" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Edit'}</Btn>
      </div>
      {open && (
        <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '12px' }}>
          <Field id={`care-${item.n}-t`} label="Title" error={errs.title}><input id={`care-${item.n}-t`} value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} style={inputS(errs.title)} /></Field>
          <Field id={`care-${item.n}-b`} label="Guidance" error={errs.body} hint="Only include guidance the shop has approved."><textarea id={`care-${item.n}-b`} rows={3} value={d.body} onChange={(e) => setD({ ...d, body: e.target.value })} style={areaS(errs.body)}></textarea></Field>
          <div><Btn type="submit" busy={busy}>{busy ? 'Saving…' : 'Save'}</Btn></div>
        </form>
      )}
    </div>
  );
}

function FaqRow({ faq, cats, onSaved, onUnauthorized, onDelete }: { faq: Site['faqs'][number] | null; cats: Site['faqCategories']; onSaved: () => void; onUnauthorized: () => void; onDelete?: () => Promise<void> }) {
  const { errs, busy, fail, run } = useSubmit(onUnauthorized);
  const [open, setOpen] = useState(!faq);
  const [d, setD] = useState({ category: faq?.category ?? cats[0]?.key ?? '', question: faq?.question ?? '', answer: faq?.supplied ? faq.answer : '' });
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await run(() => (faq ? api('/admin/faqs/' + faq.id, { method: 'PUT', body: d, admin: true }) : api('/admin/faqs', { method: 'POST', body: d, admin: true })))) { if (faq) setOpen(false); onSaved(); }
  };
  const idp = `faq-${faq?.id ?? 'new'}-`;
  return (
    <div style={card}>
      {faq && (
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            <p style={{ margin: 0, fontWeight: 700 }}>{faq.question}</p>
            <p style={{ margin: '4px 0 0', color: faq.supplied ? '#323F3D' : '#9B3B2E', fontSize: '14.5px' }}>{faq.supplied ? faq.answer : 'Answer needed'}</p>
          </div>
          <span style={{ display: 'inline-flex', gap: '16px', alignItems: 'center' }}>
            <Btn kind="link" onClick={() => setOpen(!open)}>{open ? 'Close' : faq.supplied ? 'Edit' : 'Answer'}</Btn>
            {onDelete && <ConfirmDelete label={'Delete question: ' + faq.question} onConfirm={onDelete} />}
          </span>
        </div>
      )}
      {open && (
        <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: faq ? '12px' : 0 }}>
          {!faq && <h3 style={h3}>Add a question</h3>}
          {fail && <Notice kind="error">{fail}</Notice>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: '12px 16px' }}>
            <Field id={idp + 'cat'} label="Topic" error={errs.category}>
              <select id={idp + 'cat'} value={d.category} onChange={(e) => setD({ ...d, category: e.target.value })} style={inputS(errs.category)}>
                {cats.map((c) => <option key={c.key} value={c.key}>{c.label}</option>)}
              </select>
            </Field>
            <Field id={idp + 'q'} label="Question" error={errs.question}><input id={idp + 'q'} value={d.question} onChange={(e) => setD({ ...d, question: e.target.value })} style={inputS(errs.question)} /></Field>
          </div>
          <Field id={idp + 'a'} label="Answer" error={errs.answer} hint="Blank keeps the design’s “[Approved answer…]” placeholder."><textarea id={idp + 'a'} rows={3} value={d.answer} onChange={(e) => setD({ ...d, answer: e.target.value })} style={areaS(errs.answer)}></textarea></Field>
          <div><Btn type="submit" busy={busy}>{busy ? 'Saving…' : faq ? 'Save answer' : 'Add question'}</Btn></div>
        </form>
      )}
    </div>
  );
}

export function HelpTab({ site, onChange, onUnauthorized, toast }: Common) {
  const [adding, setAdding] = useState(false);
  const [rowError, setRowError] = useState<string | null>(null);
  const answered = site.faqs.filter((f) => f.supplied).length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={h3}>Candle care</h3>
        {site.care.map((c) => <CareRow key={c.n + c.title + c.body} item={c} onUnauthorized={onUnauthorized} onSaved={() => { toast('Care guidance saved'); onChange(); }} />)}
      </section>
      <section style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <h3 style={h3}>FAQ</h3>
          <span style={{ color: '#3A4643', fontSize: '14.5px' }}>{answered} of {site.faqs.length} answered</span>
          {!adding && <Btn onClick={() => setAdding(true)}>Add question</Btn>}
        </div>
        {rowError && <Notice kind="error">{rowError}</Notice>}
        {adding && <FaqRow faq={null} cats={site.faqCategories} onUnauthorized={onUnauthorized} onSaved={() => { setAdding(false); toast('Question added'); onChange(); }} />}
        {site.faqCategories.map((cat) => (
          <Fragment key={cat.key}>
            <p style={{ ...small, margin: '8px 0 0' }}>{cat.label}</p>
            {site.faqs.filter((f) => f.category === cat.key).map((f) => (
              <FaqRow key={f.id + f.answer} faq={f} cats={site.faqCategories} onUnauthorized={onUnauthorized} onSaved={() => { toast('Answer saved'); onChange(); }}
                onDelete={async () => {
                  try { await api('/admin/faqs/' + f.id, { method: 'DELETE', admin: true }); toast('Question deleted'); onChange(); }
                  catch (e) { setRowError((e as Error).message); }
                }} />
            ))}
          </Fragment>
        ))}
      </section>
    </div>
  );
}

/* ---------------- Shop settings ---------------- */

const FIELDS: [keyof Settings, string, string, boolean?][] = [
  ['email', 'Contact email', ''],
  ['phone', 'Contact phone', ''],
  ['address', 'Shop address', 'Shown on the About and Contact pages, if you want it public'],
  ['hours', 'Opening hours', ''],
  ['replyTime', 'Reply-time promise', 'Shown after a message is sent, e.g. “We reply within two business days.”'],
  ['legal', 'Legal line', 'Footer and checkout, e.g. “Privacy policy · Terms of sale”'],
  ['shippingFlat', 'Flat shipping (USD)', 'Added to every order. Blank = “confirmed by email after you order”.'],
  ['taxRate', 'Sales tax (%)', 'Applied to the subtotal. Blank = “confirmed by email after you order”.'],
];

export function SettingsTab({ site, onChange, onUnauthorized, toast }: Common) {
  const { errs, busy, fail, run, clear } = useSubmit(onUnauthorized);
  const [d, setD] = useState<Settings>(site.settings);
  const dirty = JSON.stringify(d) !== JSON.stringify(site.settings);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (await run(() => api('/admin/settings', { method: 'PUT', body: d, admin: true }))) { toast('Shop settings saved — the website is updated'); onChange(); }
  };
  const area = (k: keyof Settings, label: string, hint: string, rows = 4) => (
    <Field id={'set-' + k} label={label} error={errs[k]} hint={hint}>
      <textarea id={'set-' + k} rows={rows} value={d[k]} onChange={(e) => { setD({ ...d, [k]: e.target.value }); clear(k); }} style={areaS(errs[k])}></textarea>
    </Field>
  );
  return (
    <form onSubmit={save} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '920px' }}>
      {fail && <Notice kind="error">{fail}</Notice>}
      <div style={{ ...card, background: '#EAE2D2' }}>
        <p style={{ margin: 0, fontSize: '15px', color: '#152828' }}>
          <strong>Payments:</strong> no payment provider is connected, so checkout records each order as “Awaiting payment” and you arrange payment with the customer.
          Update the payment status on the Orders tab once paid. Connecting Stripe, Square or Shopify Payments needs the shop’s own account — see the README.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: '16px 22px' }}>
        {FIELDS.map(([k, label, hint]) => (
          <Field key={k} id={'set-' + k} label={label} error={errs[k]} hint={hint || undefined}>
            <input id={'set-' + k} value={d[k]} onChange={(e) => { setD({ ...d, [k]: e.target.value }); clear(k); }} style={inputS(errs[k])} />
          </Field>
        ))}
      </div>
      {area('paymentNote', 'Payment note at checkout', 'Blank uses: “No payment is taken online yet. After you place your order, Seaside Candle Works will email you to confirm it and arrange payment.”', 2)}
      {area('story', 'Brand story (About page)', 'Blank keeps the design’s placeholder.', 5)}
      {area('careGuide', 'Candle care (product pages)', 'Shown in every product’s “Candle care” section.')}
      {area('shippingPolicy', 'Shipping & returns (product pages)', 'Shown in every product’s “Shipping & returns” section.')}
      <div style={{ position: 'sticky', bottom: 0, background: '#F7F3EA', padding: '14px 0', borderTop: '1px solid rgba(36,59,59,.14)', display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Btn type="submit" busy={busy} disabled={!dirty}>{busy ? 'Saving…' : 'Save changes'}</Btn>
        {dirty ? <Btn kind="link" onClick={() => setD(site.settings)}>Discard</Btn> : <span style={{ color: '#3A4643', fontSize: '14px' }}>All changes saved</span>}
      </div>
    </form>
  );
}
