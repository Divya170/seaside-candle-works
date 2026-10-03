'use client';

import { useEffect, useState } from 'react';

/** Style tokens lifted from the original admin design. */
export const S = {
  th: { padding: '14px 16px', fontSize: '12px', letterSpacing: '.12em', textTransform: 'uppercase', color: '#3A4643', whiteSpace: 'nowrap' } as React.CSSProperties,
  td: { padding: '12px 16px', verticalAlign: 'top' } as React.CSSProperties,
  tableWrap: { overflowX: 'auto', border: '1px solid rgba(28,42,53,.14)', borderRadius: '6px', background: '#FFFFFF' } as React.CSSProperties,
  input: { height: '44px', padding: '0 12px', border: '1px solid rgba(28,42,53,.25)', borderRadius: '10px', background: '#fff', fontSize: '15px' } as React.CSSProperties,
  label: { fontSize: '14.5px', fontWeight: 600 } as React.CSSProperties,
  err: { fontSize: '14px', color: '#9B3B2E' } as React.CSSProperties,
  hint: { fontSize: '13.5px', color: '#3A4643' } as React.CSSProperties,
  serif: "'Playfair Display',Georgia,serif",
  mono: "Inter,sans-serif",
};

export function Btn({
  children,
  onClick,
  kind = 'primary',
  type = 'button',
  disabled,
  busy,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: 'primary' | 'secondary' | 'link' | 'danger';
  type?: 'button' | 'submit';
  disabled?: boolean;
  busy?: boolean;
  ariaLabel?: string;
}) {
  const base: React.CSSProperties = { height: '44px', padding: '0 18px', borderRadius: '10px', fontWeight: 600, fontSize: '14.5px', cursor: 'pointer', whiteSpace: 'nowrap' };
  const styles: Record<string, React.CSSProperties> = {
    primary: { ...base, background: busy ? '#3A4643' : '#152828', color: '#F7F3EA', border: 0 },
    secondary: { ...base, background: 'transparent', color: '#152828', border: '1px solid rgba(28,42,53,.35)' },
    link: { ...base, padding: 0, background: 'none', border: 0, textDecoration: 'underline', textUnderlineOffset: '3px', color: '#152828' },
    danger: { ...base, padding: 0, background: 'none', border: 0, textDecoration: 'underline', textUnderlineOffset: '3px', color: '#9B3B2E' },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || busy}
      aria-busy={busy ? 'true' : 'false'}
      aria-label={ariaLabel}
      className={kind === 'primary' ? 'hv-bb-primary' : kind === 'secondary' ? 'hv-bb-secondary' : undefined}
      style={styles[kind]}
    >
      {children}
    </button>
  );
}

/** Two-step delete so nothing is removed by a single stray click. */
export function ConfirmDelete({ label, onConfirm }: { label: string; onConfirm: () => Promise<void> | void }) {
  const [armed, setArmed] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (!armed) return;
    const t = setTimeout(() => setArmed(false), 4000);
    return () => clearTimeout(t);
  }, [armed]);
  if (!armed) return <Btn kind="danger" onClick={() => setArmed(true)} ariaLabel={label}>Delete</Btn>;
  return (
    <span style={{ display: 'inline-flex', gap: '12px', alignItems: 'center' }}>
      <Btn
        kind="danger"
        busy={busy}
        ariaLabel={'Confirm: ' + label}
        onClick={async () => {
          setBusy(true);
          try {
            await onConfirm();
          } finally {
            setBusy(false);
            setArmed(false);
          }
        }}
      >
        {busy ? 'Deleting…' : 'Confirm delete'}
      </Btn>
      <Btn kind="link" onClick={() => setArmed(false)}>Keep</Btn>
    </span>
  );
}

export function Switch({ on, label, onToggle, text }: { on: boolean; label: string; onToggle: () => void; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button
        type="button"
        role="switch"
        aria-checked={on ? 'true' : 'false'}
        aria-label={label}
        onClick={onToggle}
        style={{ width: '44px', height: '26px', borderRadius: '13px', border: 0, background: on ? '#152828' : '#B8C4CF', padding: '3px', cursor: 'pointer', transition: 'background .2s', flexShrink: 0 }}
      >
        <span style={{ display: 'block', width: '20px', height: '20px', borderRadius: '50%', background: '#fff', transform: on ? 'translateX(18px)' : 'translateX(0)', transition: 'transform .2s' }}></span>
      </button>
      <span style={{ fontSize: '14px' }}>{text}</span>
    </div>
  );
}

export function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: 0 }}>
      <label htmlFor={id} style={S.label}>{label}</label>
      {children}
      {hint && <span style={S.hint}>{hint}</span>}
      {error && <span id={id + '-err'} style={S.err}>{error}</span>}
    </div>
  );
}

export const fieldBorder = (err?: string) => (err ? '1.5px solid #9B3B2E' : '1px solid rgba(28,42,53,.28)');

export function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div role="status" style={{ padding: '56px 24px', textAlign: 'center', border: '1px dashed rgba(28,42,53,.25)', borderRadius: '6px', color: '#3A4643' }}>
      <p style={{ margin: '0 0 6px', fontFamily: S.serif, fontSize: '28px', color: '#152828' }}>{title}</p>
      <p style={{ margin: 0, fontSize: '15px' }}>{body}</p>
    </div>
  );
}

export function Notice({ kind, children, onRetry }: { kind: 'error' | 'loading'; children: React.ReactNode; onRetry?: () => void }) {
  if (kind === 'loading')
    return (
      <p role="status" className="gff-pulse" style={{ margin: 0, padding: '40px 0', color: '#3A4643' }}>
        {children}
      </p>
    );
  return (
    <div role="alert" style={{ padding: '14px 16px', border: '1.5px solid #9B3B2E', borderRadius: '10px', background: '#FEF3F2', color: '#912018', fontSize: '15px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <span style={{ flex: 1, minWidth: '200px' }}>{children}</span>
      {onRetry && <Btn kind="link" onClick={onRetry}>Try again</Btn>}
    </div>
  );
}

/** Search box + status filter shown above the orders and inquiries lists. */
export function Toolbar({
  q,
  onQ,
  status,
  onStatus,
  statuses,
  placeholder,
  count,
}: {
  q: string;
  onQ: (v: string) => void;
  status: string;
  onStatus: (v: string) => void;
  statuses: string[];
  placeholder: string;
  count: string;
}) {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '44px', padding: '0 12px', border: '1px solid rgba(28,42,53,.25)', borderRadius: '10px', background: '#FFFFFF', flex: '1 1 260px', maxWidth: '420px' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <circle cx="11" cy="11" r="7"></circle>
          <path d="M20 20l-3.6-3.6"></path>
        </svg>
        <input type="search" aria-label={placeholder} placeholder={placeholder} value={q} onChange={(e) => onQ(e.target.value)} style={{ flex: 1, minWidth: 0, border: 0, background: 'transparent', outline: 'none', fontSize: '15px' }} />
      </div>
      <select aria-label="Filter by status" value={status} onChange={(e) => onStatus(e.target.value)} style={{ ...S.input, background: '#FFFFFF' }}>
        <option value="All">All statuses</option>
        {statuses.map((st) => (
          <option key={st} value={st}>{st}</option>
        ))}
      </select>
      <span aria-live="polite" style={{ fontSize: '14.5px', color: '#3A4643' }}>{count}</span>
    </div>
  );
}

export const fmtDateTime = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
};
export const fmtDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
};
