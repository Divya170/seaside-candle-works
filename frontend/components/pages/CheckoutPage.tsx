'use client';

import { useState } from 'react';
import { useCommon, money } from '@/lib/vm';
import { api, ApiError } from '@/lib/api';
import { useFields, focusField, FieldDef } from './useFields';
import CheckoutView from '../views/CheckoutView';

const CO_DEFS: { num: string; title: string; fields: FieldDef[] }[] = [
  { num: '01', title: 'Contact', fields: [{ key: 'email', label: 'Email', type: 'email', ac: 'email', help: 'For your order confirmation and receipt.' }] },
  {
    num: '02', title: 'Shipping address', fields: [
      { key: 'first', label: 'First name', ac: 'given-name', half: true },
      { key: 'last', label: 'Last name', ac: 'family-name', half: true },
      { key: 'address', label: 'Street address', ac: 'address-line1' },
      { key: 'apt', label: 'Apartment, suite (optional)', ac: 'address-line2', optional: true },
      { key: 'city', label: 'City', ac: 'address-level2', half: true },
      { key: 'state', label: 'State', ac: 'address-level1', quarter: true },
      { key: 'zip', label: 'ZIP code', ac: 'postal-code', quarter: true },
      { key: 'phone', label: 'Phone (optional)', type: 'tel', ac: 'tel', optional: true, help: 'Only used if there’s a question about delivery.' },
    ],
  },
];
const BLANK = { email: '', first: '', last: '', address: '', apt: '', city: '', state: '', zip: '', phone: '' };
const LABELS: Record<string, string> = Object.fromEntries(CO_DEFS.flatMap((s) => s.fields.map((f) => [f.key, f.label])));

export default function CheckoutPage() {
  const c = useCommon();
  const { s, st } = c;
  const f = useFields('co', BLANK);
  const [status, setStatus] = useState<'idle' | 'processing' | 'failed' | 'success'>('idle');
  const [failDetail, setFailDetail] = useState('');
  const [itemsError, setItemsError] = useState('');
  const [placed, setPlaced] = useState<{ ref: string; email: string; first: string; totalCents: number } | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const processing = status === 'processing';
  const q = s.quote;

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (processing) return;
    f.setTried(true);
    setItemsError('');
    setStatus('processing');
    try {
      const r = await api<{ ref: string; email: string; first: string; totalCents: number }>('/orders', { method: 'POST', body: { ...f.vals, items: s.cart } });
      setPlaced(r);
      setStatus('success');
      s.clearCart();
      window.scrollTo(0, 0);
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 400 && Object.keys(ae.errors || {}).length) {
        const { items, ...fields } = ae.errors;
        f.setErrs(fields);
        setItemsError(items || '');
        setStatus('idle');
        window.scrollTo({ top: 0, behavior: s.reduced ? 'auto' : 'smooth' });
      } else {
        setFailDetail(ae.message);
        setStatus('failed');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const errKeys = Object.keys(f.errs).filter((k) => f.errs[k]);
  const errList = [
    ...(itemsError ? [{ label: `Cart — ${itemsError}`, focus: () => s.go('/cart') }] : []),
    ...errKeys.map((k) => ({ label: `${LABELS[k] || k} — ${f.errs[k]}`, focus: () => focusField('co-' + k) })),
  ];
  const pending = 'Confirmed by email after you order';
  const v = {
    ...c,
    coSections: CO_DEFS.map((sec) => ({ num: sec.num, title: sec.title, fields: sec.fields.map(f.field) })),
    placeOrder,
    coProcessing: processing, coBusy: processing ? 'true' : 'false', coBtnOp: processing ? 0.7 : 1,
    coBtn: processing ? 'Placing order…' : status === 'failed' ? 'Try again' : 'Place order',
    coSuccess: status === 'success', coFailed: status === 'failed', coFailDetail: failDetail,
    coShowForm: status !== 'success' && c.cartCount > 0, coEmptyCart: status !== 'success' && c.cartCount === 0,
    coHasErrors: errList.length > 0, coErrTitle: `Please check ${errList.length} ${errList.length === 1 ? 'item' : 'fields'}:`, coErrList: errList,
    coFirst: placed?.first || f.vals.first || 'friend', coEmail: placed?.email || f.vals.email,
    orderRef: placed?.ref || '',
    paymentNote: st.paymentNote || 'No payment is taken online yet. After you place your order, Seaside Candle Works will email you to confirm it and arrange payment.',
    coShipping: q && q.shippingCents !== null ? money(q.shippingCents) : pending,
    coTax: q && q.taxCents !== null ? money(q.taxCents) : pending,
    coTotal: q ? money(q.totalCents) + (q.shippingCents === null || q.taxCents === null ? ' + any shipping & tax' : '') : '—',
    summaryOpen, summaryExpanded: summaryOpen ? 'true' : 'false', toggleSummary: () => setSummaryOpen((o) => !o),
    summaryToggleText: summaryOpen ? 'Hide order summary' : 'Show order summary',
  };
  return <CheckoutView v={v} />;
}
