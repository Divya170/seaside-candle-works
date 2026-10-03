'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCommon } from '@/lib/vm';
import { api, ApiError, adminToken } from '@/lib/api';
import { OrdersTab, MessagesTab, ProductsTab, CollectionsTab, HelpTab, SettingsTab } from '../admin/Admin';
import { Btn, Field, Notice, S, fieldBorder } from '../admin/ui';

type Tab = 'orders' | 'messages' | 'products' | 'collections' | 'help' | 'settings';
type Summary = { orders: number; newOrders: number; awaitingPayment: number; messages: number; newMessages: number };

function Login({ onUnlocked }: { onUnlocked: () => void }) {
  const [token, setToken] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) return setErr('Enter the staff passcode.');
    setBusy(true);
    setErr('');
    try {
      await api('/admin/session', { method: 'POST', body: { token: token.trim() } });
      adminToken.set(token.trim());
      onUnlocked();
    } catch (e2) {
      setErr((e2 as ApiError).message);
      document.getElementById('admin-token')?.focus();
    } finally {
      setBusy(false);
    }
  };
  return (
    <form onSubmit={submit} noValidate style={{ maxWidth: '440px', background: '#FCFBF7', border: '1px solid rgba(36,59,59,.14)', borderRadius: '4px', padding: 'clamp(24px,4vw,36px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 style={{ margin: 0, font: "500 34px/1.05 'Playfair Display',Georgia,serif", color: '#152828' }}>Staff sign-in</h2>
      <p style={{ margin: 0, color: '#3A4643', fontSize: '15.5px' }}>Enter the passcode to manage orders and the shop.</p>
      <Field id="admin-token" label="Passcode" error={err}>
        <input id="admin-token" type="password" autoComplete="current-password" value={token} onChange={(e) => { setToken(e.target.value); setErr(''); }} aria-invalid={!!err} style={{ ...S.input, height: '50px', border: fieldBorder(err), width: '100%' }} />
      </Field>
      <Btn type="submit" busy={busy}>{busy ? 'Checking…' : 'Open the admin'}</Btn>
    </form>
  );
}

export default function AdminPage() {
  const c = useCommon();
  const { s, site } = c;
  const [auth, setAuth] = useState<'checking' | 'locked' | 'open'>('checking');
  const [tab, setTab] = useState<Tab>('orders');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [summaryErr, setSummaryErr] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const tt = useRef<ReturnType<typeof setTimeout>>();

  const showToast = useCallback((m: string) => {
    clearTimeout(tt.current);
    setToast(m);
    tt.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const loadSummary = useCallback(async () => {
    try {
      setSummary(await api<Summary>('/admin/summary', { admin: true }));
      setSummaryErr(null);
      setAuth('open');
    } catch (e) {
      if ((e as ApiError).status === 401) setAuth('locked');
      else {
        setSummaryErr((e as Error).message);
        setAuth('open');
      }
    }
  }, []);
  useEffect(() => { loadSummary(); }, [loadSummary]);

  const lock = useCallback(() => { adminToken.clear(); setAuth('locked'); }, []);
  const refresh = s.refreshSite;
  const changed = useCallback(() => { loadSummary(); refresh(); }, [loadSummary, refresh]);

  const label = (base: string, fresh?: number, total?: number) => base + (fresh ? ` (${fresh} new)` : total ? ` (${total})` : '');
  const tabs: [Tab, string][] = [
    ['orders', label('Orders', summary?.newOrders, summary?.orders)],
    ['messages', label('Messages', summary?.newMessages, summary?.messages)],
    ['products', 'Candles'],
    ['collections', 'Collections'],
    ['help', 'Care & FAQ'],
    ['settings', 'Shop settings'],
  ];
  const common = { site, onUnauthorized: lock, toast: showToast, onChange: changed };

  return (
    <section style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(32px,5vw,64px) clamp(20px,4vw,40px) clamp(64px,8vw,104px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap', marginBottom: '26px' }}>
        <div>
          <p style={{ margin: '0 0 10px', font: '700 11px Inter,sans-serif', letterSpacing: '.16em', textTransform: 'uppercase', color: '#356D6C' }}>Staff only</p>
          <h1 style={{ margin: 0, font: "500 clamp(40px,5vw,64px)/1 'Playfair Display',Georgia,serif", color: '#152828' }}>Shop admin</h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          <p style={{ margin: 0, fontSize: '15px', color: '#3A4643', maxWidth: '420px' }}>Fulfil orders, answer messages, and replace the design’s placeholder copy as it’s approved.</p>
          {auth === 'open' && adminToken.get() && <Btn kind="link" onClick={lock}>Sign out</Btn>}
        </div>
      </div>
      {auth === 'checking' && <Notice kind="loading">Opening the admin…</Notice>}
      {auth === 'locked' && <Login onUnlocked={loadSummary} />}
      {auth === 'open' && (
        <>
          <div role="tablist" aria-label="Admin sections" style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '5px', background: '#EAE2D2', borderRadius: '6px', marginBottom: '26px', scrollbarWidth: 'none' }}>
            {tabs.map(([k, l]) => (
              <button key={k} role="tab" id={'tab-' + k} aria-selected={tab === k ? 'true' : 'false'} aria-controls={'panel-' + k} onClick={() => setTab(k)}
                style={{ flexShrink: 0, minHeight: '42px', padding: '0 18px', border: 0, borderRadius: '4px', background: tab === k ? '#152828' : 'transparent', color: tab === k ? '#F7F3EA' : '#152828', font: '600 14px Inter,sans-serif', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {l}
              </button>
            ))}
          </div>
          {!!summary?.awaitingPayment && tab === 'orders' && <p style={{ margin: '0 0 14px', fontSize: '14.5px', color: '#9B3B2E' }}>{summary.awaitingPayment} {summary.awaitingPayment === 1 ? 'order is' : 'orders are'} awaiting payment.</p>}
          {summaryErr && <div style={{ marginBottom: '16px' }}><Notice kind="error" onRetry={loadSummary}>{summaryErr}</Notice></div>}
          <div role="tabpanel" id={'panel-' + tab} aria-labelledby={'tab-' + tab}>
            {tab === 'orders' && <OrdersTab {...common} />}
            {tab === 'messages' && <MessagesTab {...common} />}
            {tab === 'products' && <ProductsTab {...common} />}
            {tab === 'collections' && <CollectionsTab {...common} />}
            {tab === 'help' && <HelpTab {...common} />}
            {tab === 'settings' && <SettingsTab {...common} />}
          </div>
        </>
      )}
      <div aria-live="polite" style={{ position: 'fixed', left: '50%', bottom: '24px', transform: 'translateX(-50%)', zIndex: 90, pointerEvents: 'none' }}>
        {toast && <div style={{ background: '#152828', color: '#F7F3EA', padding: '14px 20px', borderRadius: '6px', fontSize: '15px', boxShadow: '0 16px 40px -16px rgba(0,0,0,.4)', whiteSpace: 'nowrap' }}>{toast}</div>}
      </div>
    </section>
  );
}
