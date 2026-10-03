'use client';

/** Full-page loading / error state before the shop data is available. */
export default function StatusScreen({ title, body, action, onAction, busy }: { title: string; body: string; action?: string; onAction?: () => void; busy?: boolean }) {
  return (
    <div role={busy ? 'status' : 'alert'} aria-busy={busy ? 'true' : 'false'} style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '24px', background: '#F7F3EA', color: '#152828' }}>
      <div style={{ maxWidth: '540px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
        <span style={{ font: '700 11px Inter,sans-serif', letterSpacing: '.16em', textTransform: 'uppercase', color: '#356D6C' }}>Seaside Candle Works</span>
        <h1 style={{ margin: 0, font: "500 clamp(38px,5vw,60px)/1.02 'Playfair Display',Georgia,serif" }}>{title}</h1>
        <p style={{ margin: 0, font: '400 17px/1.65 Inter,sans-serif', color: '#323F3D' }}>{body}</p>
        {action && onAction && (
          <button onClick={onAction} style={{ minHeight: '52px', padding: '0 26px', background: '#152828', color: '#F7F3EA', border: 0, borderRadius: '6px', font: '600 15px Inter,sans-serif', cursor: 'pointer' }}>{action}</button>
        )}
      </div>
    </div>
  );
}
