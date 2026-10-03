'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCommon, accordion, chip, money } from '@/lib/vm';
import { api, ApiError, isAbort, qs } from '@/lib/api';
import type { Product } from '@/lib/types';
import { useFields, focusField, FieldDef } from './useFields';
import HomeView from '../views/HomeView';
import ShopIntroView from '../views/ShopIntroView';
import CollectionIntroView from '../views/CollectionIntroView';
import GridView from '../views/GridView';
import SheetView from '../views/SheetView';
import ProductView from '../views/ProductView';
import LightboxView from '../views/LightboxView';
import CollectionsView from '../views/CollectionsView';
import AboutView from '../views/AboutView';
import FaqView from '../views/FaqView';
import ContactIntroView from '../views/ContactIntroView';
import ContactSectionView from '../views/ContactSectionView';
import CartView from '../views/CartView';

/* ---------------- Contact section (home + contact page) ---------------- */

const C_DEFS: FieldDef[] = [
  { key: 'name', label: 'Name', ac: 'name', half: true },
  { key: 'email', label: 'Email', type: 'email', ac: 'email', half: true },
  { key: 'subject', label: 'Subject', ac: 'off' },
  { key: 'message', label: 'Message', area: true, help: 'A few sentences is perfect.' },
];

function ContactSection() {
  const c = useCommon();
  const st = c.st;
  const f = useFields('c', { name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [ref, setRef] = useState('');
  const loading = status === 'loading';
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    f.setTried(true);
    setStatus('loading');
    try {
      const r = await api<{ ref: string }>('/messages', { method: 'POST', body: f.vals });
      setRef(r.ref);
      setStatus('success');
    } catch (err) {
      const ae = err as ApiError;
      if (ae.status === 400 && Object.keys(ae.errors || {}).length) {
        f.setErrs(ae.errors);
        setStatus('idle');
        const k = C_DEFS.find((d) => ae.errors[d.key]);
        if (k) focusField('c-' + k.key);
      } else setStatus('error');
    }
  };
  const v = {
    ...c,
    contactInfo: [
      { label: 'Email', value: st.email || '[Contact Email]' },
      { label: 'Phone', value: st.phone || '[Contact Phone]' },
      { label: 'Shop', value: st.address || '[Address — if supplied]' },
    ],
    contactFields: C_DEFS.map(f.field),
    submitContact: submit,
    cSuccess: status === 'success', cShowForm: status !== 'success', cError: status === 'error', cLoading: loading, cBusy: loading ? 'true' : 'false',
    cBtn: loading ? 'Sending…' : status === 'error' ? 'Try again' : 'Send message', cBtnOp: loading ? 0.7 : 1,
    cName: f.vals.name.trim().split(' ')[0], cSubject: f.vals.subject, cRef: ref,
    resetContact: () => { f.reset(); setStatus('idle'); setRef(''); },
  };
  return <ContactSectionView v={v} />;
}

/* ---------------- Home ---------------- */

export function HomePage() {
  const c = useCommon();
  const { site, s } = c;
  const [hero, setHero] = useState(0);
  const [hover, setHover] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [care, setCare] = useState(0);
  const [faqCat, setFaqCat] = useState(site.faqCategories[0]?.key || 'orders');
  const [homeFaq, setHomeFaq] = useState<string | null>((site.faqCategories[0]?.key || 'orders') + '-0');
  const tick = useRef(0);

  useEffect(() => {
    if (s.reduced) setPaused(true);
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, [s.reduced]);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!hover && !paused && !document.hidden) setHero((h) => (h + 1) % site.hero.length);
    }, 7000);
    return () => clearTimeout(t);
  }, [hero, hover, paused, site.hero.length, tick.current]);

  const cards = site.products.map(c.card);
  const colCount = (n: number) => `${n} ${n === 1 ? 'candle' : 'candles'}`;
  const hf = site.faqs.filter((f) => f.category === faqCat);
  const v = {
    ...c,
    heroSlides: site.hero.map((h, i) => ({ ...h, opacity: i === hero ? 1 : 0, hidden: i === hero ? undefined : 'true', loading: i === 0 ? 'eager' : 'lazy', transform: i === hero && ready && !s.reduced ? 'scale(1.07)' : 'scale(1)' })),
    heroDots: site.hero.map((_, i) => ({ num: i + 1, pressed: i === hero ? 'true' : 'false', bar: i === hero ? '#152828' : 'rgba(36,59,59,.25)', go: () => { setHero(i); tick.current++; } })),
    heroCounter: `0${hero + 1} / 0${site.hero.length}`,
    heroEnter: () => setHover(true), heroLeave: () => setHover(false),
    toggleHero: () => setPaused((p) => !p), pauseText: paused ? 'Play' : 'Pause', pauseLabel: paused ? 'Play slideshow' : 'Pause slideshow',
    ctaFlex: c.isMobile ? '1 1 100%' : '0 0 auto',
    featuredMain: cards[0],
    featuredSide: [cards[1], cards[2]].filter(Boolean).map((x, i) => ({ ...x, offset: i === 0 ? '0px' : 'clamp(0px,7vw,110px)' })),
    featuredMore: cards.slice(3),
    railPrev: () => document.getElementById('scw-rail')?.scrollBy({ left: -320, behavior: 'smooth' }),
    railNext: () => document.getElementById('scw-rail')?.scrollBy({ left: 320, behavior: 'smooth' }),
    homeCollections: site.collections.map((x, i) => ({ ...x, desc: x.description || `[${x.name} collection description — supplied by client]`, href: '/collection/' + x.id, index: '0' + (i + 1), count: colCount(x.count), flex: i === 0 ? '1.45 1 460px' : '1 1 320px', ratio: i === 0 ? '5 / 4' : '4 / 5', offset: i === 0 ? '0px' : 'clamp(0px,9vw,140px)' })),
    careItems: site.care.map((x, i) => ({ num: x.n, title: x.title, body: x.body, ...accordion('care', i, care === i, () => setCare(care === i ? -1 : i)) })),
    faqTabs: site.faqCategories.map((f) => {
      const on = faqCat === f.key;
      return { label: f.label, select: () => { setFaqCat(f.key); setHomeFaq(f.key + '-0'); }, pressed: on ? 'true' : 'false', bg: on ? '#152828' : 'transparent', color: on ? '#F7F3EA' : '#152828', border: on ? '#152828' : 'rgba(36,59,59,.24)' };
    }),
    homeFaqItems: hf.map((f, i) => {
      const id = `${faqCat}-${i}`;
      return { q: f.question, a: f.answer, ...accordion('hfaq', id, homeFaq === id, () => setHomeFaq(homeFaq === id ? null : id)) };
    }),
  };
  return (
    <>
      <HomeView v={v} />
      <ContactSection />
    </>
  );
}

/* ---------------- Shop & collection grid ---------------- */

export function GridPage({ collectionId }: { collectionId?: string }) {
  const c = useCommon();
  const { site } = c;
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [dq, setDq] = useState(q);
  const [cat, setCat] = useState('all');
  const [col, setCol] = useState('all');
  const [avail, setAvail] = useState('all');
  const [sort, setSort] = useState('featured');
  const [gridOne, setGridOne] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [items, setItems] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const colCur = site.collections.find((x) => x.id === collectionId);

  useEffect(() => setQ(params.get('q') || ''), [params]);
  useEffect(() => { const t = setTimeout(() => setDq(q.trim()), 250); return () => clearTimeout(t); }, [q]);
  useEffect(() => {
    const ctl = new AbortController();
    setLoading(true);
    setError(null);
    api<{ items: Product[] }>('/products' + qs({ q: dq, cat, col: collectionId ? '' : col, avail, sort, collection: collectionId }), { signal: ctl.signal })
      .then((r) => setItems(r.items))
      .catch((e) => !isAbort(e) && setError(e.message))
      .finally(() => !ctl.signal.aborted && setLoading(false));
    return () => ctl.abort();
  }, [dq, cat, col, avail, sort, collectionId, tick]);
  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSheet(false);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [sheet]);

  if (collectionId && !colCur)
    return <NotFoundBlock title="This collection isn’t available" body="Browse all candles, or see the collections we have now." />;

  const catLabel = (id: string) => site.categories.find((x) => x.id === id)?.label;
  const colLabel = (id: string) => site.collections.find((x) => x.id === id)?.name;
  const active: { label: string; remove: () => void }[] = [];
  if (dq) active.push({ label: `“${dq}”`, remove: () => setQ('') });
  if (cat !== 'all') active.push({ label: catLabel(cat) || cat, remove: () => setCat('all') });
  if (col !== 'all' && !collectionId) active.push({ label: colLabel(col) || col, remove: () => setCol('all') });
  if (avail !== 'all') active.push({ label: avail === 'available' ? 'In stock' : 'Sold out', remove: () => setAvail('all') });
  const filterCount = active.filter((x) => !x.label.startsWith('“')).length;
  const opts: Record<string, { value: string; label: string; disabled?: boolean }[]> = {
    cat: [{ value: 'all', label: 'All categories' }, ...site.categories.map((x) => ({ value: x.id, label: x.label }))],
    col: [{ value: 'all', label: 'All collections' }, ...site.collections.map((x) => ({ value: x.id, label: x.name }))],
    avail: [{ value: 'all', label: 'Any availability' }, { value: 'available', label: 'In stock' }, { value: 'soldout', label: 'Sold out' }],
    sort: [{ value: 'featured', label: 'Featured' }, { value: 'name', label: 'Name, A–Z' }, { value: 'price-asc', label: 'Price, low to high' }, { value: 'price-desc', label: 'Price, high to low' }],
  };
  const setters: Record<string, (v: string) => void> = { cat: setCat, col: setCol, avail: setAvail, sort: setSort };
  const vals: Record<string, string> = { cat, col, avail, sort };
  const groups = [{ key: 'cat', label: 'Category' }, { key: 'col', label: 'Collection' }, { key: 'avail', label: 'Availability' }, { key: 'sort', label: 'Sort' }].filter((g) => !(g.key === 'col' && collectionId));
  const list = items || [];
  const n = list.length;
  const first = items === null;
  const v = {
    ...c,
    colCur: colCur ? { ...colCur, desc: colCur.description || `[${colCur.name} collection description — supplied by client]` } : null,
    q, hasQ: !!q, setQ: (e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value), clearQ: () => setQ(''),
    selects: groups.map((g) => ({ id: 'scw-f-' + g.key, label: g.label, value: vals[g.key], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setters[g.key](e.target.value), options: opts[g.key].map((o) => ({ ...o, disabled: !!o.disabled })) })),
    sheetGroups: groups.map((g) => ({ label: g.label, hasNote: false, note: '', options: opts[g.key].map((o) => ({ label: o.label, disabled: false, pick: () => setters[g.key](o.value), ...chip(vals[g.key] === o.value) })) })),
    sheet, openSheet: () => { setSheet(true); focusField('scw-sheet-close'); }, closeSheet: () => setSheet(false),
    filterCountText: filterCount ? `${filterCount} active` : 'All candles', showResultsText: `Show ${n} ${n === 1 ? 'result' : 'results'}`,
    activeChips: active, hasActive: active.length > 0,
    clearAll: () => { setQ(''); setCat('all'); setCol('all'); setAvail('all'); setSort('featured'); },
    continueShopping: () => { setQ(''); setCat('all'); setCol('all'); setAvail('all'); c.s.go('/shop'); },
    resultText: first && loading ? 'Loading candles…' : error ? 'Couldn’t load candles' : `${n} ${n === 1 ? 'candle' : 'candles'}${dq ? ` for “${dq}”` : ''}`,
    loading: first && loading,
    showCards: !first && n > 0,
    showEmpty: !loading && !first && n === 0,
    emptyText: error ? `${error} Try again in a moment.` : dq ? `No candles match “${dq}” with the filters you’ve chosen. Try a different word, or reset your filters.` : 'No candles match the filters you’ve chosen. Try removing one, or reset them all.',
    skeletons: Array.from({ length: c.isMobile ? 4 : 8 }, (_, i) => ({ i })),
    gridCards: list.map(c.card),
    gridCols: c.isMobile ? (gridOne ? 'minmax(0,1fr)' : 'repeat(2,minmax(0,1fr))') : 'repeat(auto-fill,minmax(250px,1fr))',
    grid2: () => setGridOne(false), grid1: () => setGridOne(true),
    grid2Pressed: gridOne ? 'false' : 'true', grid1Pressed: gridOne ? 'true' : 'false', grid2Bg: gridOne ? 'transparent' : '#EAE2D2', grid1Bg: gridOne ? '#EAE2D2' : 'transparent',
    retry: () => setTick((t) => t + 1),
  };
  return (
    <>
      <ShopIntroView v={v} />
      {v.colCur && <CollectionIntroView v={v} />}
      <GridView v={v} />
      <SheetView v={v} />
    </>
  );
}

function NotFoundBlock({ title, body }: { title: string; body: string }) {
  return (
    <section role="alert" style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(64px,10vw,140px) clamp(20px,4vw,56px)' }}>
      <h1 style={{ margin: '0 0 16px', font: "500 clamp(40px,5vw,64px)/1.02 'Playfair Display',Georgia,serif", color: '#152828' }}>{title}</h1>
      <p style={{ margin: '0 0 28px', font: '400 17px/1.65 Inter,sans-serif', color: '#323F3D', maxWidth: '520px' }}>{body}</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <a href="/shop" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '52px', padding: '0 26px', background: '#152828', color: '#F7F3EA', borderRadius: '6px', font: '600 15px Inter,sans-serif', textDecoration: 'none' }}>Shop all candles</a>
        <a href="/collections" style={{ display: 'inline-flex', alignItems: 'center', minHeight: '52px', padding: '0 26px', border: '1px solid rgba(36,59,59,.4)', color: '#152828', borderRadius: '6px', font: '600 15px Inter,sans-serif', textDecoration: 'none' }}>View collections</a>
      </div>
    </section>
  );
}
export { NotFoundBlock };

/* ---------------- Product ---------------- */

export function ProductPage({ id }: { id: string }) {
  const c = useCommon();
  const { site, s } = c;
  const [data, setData] = useState<{ product: Product; related: Product[] } | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing' | 'error'>('loading');
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const [add, setAdd] = useState<'idle' | 'adding' | 'added'>('idle');
  const [sec, setSec] = useState<string | null>('description');
  const [lightbox, setLightbox] = useState(false);
  const [tick, setTick] = useState(0);
  const at = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const ctl = new AbortController();
    setState('loading');
    setQty(1); setImg(0); setAdd('idle'); setSec('description');
    api<{ product: Product; related: Product[] }>('/products/' + encodeURIComponent(id), { signal: ctl.signal })
      .then((r) => { setData(r); setState('ready'); document.title = r.product.name + ' · Seaside Candle Works'; })
      .catch((e) => { if (isAbort(e)) return; setState((e as ApiError).status === 404 ? 'missing' : 'error'); });
    return () => { ctl.abort(); clearTimeout(at.current); };
  }, [id, tick]);
  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') setImg((i) => (i + 1) % 3);
      if (e.key === 'ArrowLeft') setImg((i) => (i + 2) % 3);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox]);

  if (state === 'missing') return <NotFoundBlock title="This candle isn’t available" body="It may have been retired. Browse what’s in the shop now." />;
  if (state === 'error')
    return (
      <section role="alert" style={{ maxWidth: '1320px', margin: '0 auto', padding: 'clamp(64px,10vw,140px) clamp(20px,4vw,56px)' }}>
        <h1 style={{ margin: '0 0 16px', font: "500 clamp(36px,4vw,56px)/1.05 'Playfair Display',Georgia,serif" }}>The candle didn’t load</h1>
        <button type="button" onClick={() => setTick((t) => t + 1)} style={{ minHeight: '52px', padding: '0 26px', background: '#152828', color: '#F7F3EA', border: 0, borderRadius: '6px', font: '600 15px Inter,sans-serif', cursor: 'pointer' }}>Try again</button>
      </section>
    );
  if (state === 'loading' || !data)
    return <section role="status" aria-busy="true" style={{ maxWidth: '1320px', margin: '0 auto', padding: '64px clamp(20px,4vw,56px)', minHeight: '60vh', font: "500 28px 'Playfair Display',Georgia,serif", color: '#3A4643' }}>Loading candle…</section>;

  const cur = data.product;
  const base = c.card(cur);
  const PH = site.placeholders;
  const colLabel = (x: string) => site.collections.find((k) => k.id === x)?.name || '';
  const gal = [
    { src: cur.img, pos: cur.pos, scale: 'none', label: 'Product', alt: base.alt },
    { src: cur.img, pos: cur.pos, scale: 'scale(1.7)', label: 'Detail', alt: `${cur.name} — close-up detail` },
    { src: cur.lifeImg, pos: '50% 55%', scale: 'none', label: 'Lifestyle', alt: `Lifestyle setting — ${cur.lifeAlt || 'coastal interior'}` },
  ];
  const mainImg = gal[img] || gal[0];
  const sold = cur.status === 'soldout';
  const unpriced = cur.priceCents === null;
  const secDefs = [
    { id: 'description', title: 'Description', body: cur.description || PH.description },
    { id: 'scent', title: 'Scent', body: cur.scentNotes || PH.scentNotes },
    { id: 'size', title: 'Size', body: cur.sizeDetails || PH.sizeDetails },
    cur.ingredients ? { id: 'ingredients', title: 'Ingredients', body: cur.ingredients } : null,
    { id: 'care', title: 'Candle care', body: site.settings.careGuide || PH.care },
    { id: 'ship', title: 'Shipping & returns', body: site.settings.shippingPolicy || PH.shipping },
  ].filter(Boolean) as { id: string; title: string; body: string }[];
  const v = {
    ...c,
    pd: { ...base, size: cur.size || PH.size, desc: cur.shortDesc || PH.shortDesc, collText: cur.collections.length ? cur.collections.map(colLabel).join(' · ') : 'Seaside Candle Works' },
    gallery: gal.map((g, i) => ({
      ...g, num: i + 1, pressed: i === img ? 'true' : 'false', border: i === img ? '#152828' : 'transparent', op: i === img ? 1 : 0.7,
      dotW: i === img ? '22px' : '8px', dotBg: i === img ? '#152828' : 'rgba(36,59,59,.25)', select: () => setImg(i), zoom: () => { setImg(i); setLightbox(true); },
    })),
    mainImg,
    pdSections: secDefs.map((x) => ({ ...x, ...accordion('pd', x.id, sec === x.id, () => setSec(sec === x.id ? null : x.id)) })),
    relatedCards: data.related.map(c.card),
    gridColsFixed: c.isMobile ? 'repeat(2,minmax(0,1fr))' : 'repeat(auto-fill,minmax(250px,1fr))',
    openLightbox: () => { setLightbox(true); focusField('scw-lb-close'); }, closeLightbox: () => setLightbox(false), lightbox,
    galPrev: () => setImg((i) => (i + 2) % 3), galNext: () => setImg((i) => (i + 1) % 3), lbCounter: `${img + 1} / 3 · ${mainImg.label}`,
    galScroll: (e: React.UIEvent<HTMLElement>) => { const el = e.currentTarget; const i = Math.round(el.scrollLeft / Math.max(1, el.clientWidth)); if (i !== img) setImg(i); },
    qty, qtyMin: qty <= 1, qtyDec: () => setQty(Math.max(1, qty - 1)), qtyInc: () => setQty(Math.min(99, qty + 1)),
    pdAdd: () => {
      if (sold || unpriced || add === 'adding') return;
      setAdd('adding');
      at.current = setTimeout(() => {
        s.addLines(cur.id, qty);
        setAdd('added');
        s.openDrawer(true);
        at.current = setTimeout(() => setAdd('idle'), 2600);
      }, 350);
    },
    addLabel: sold ? 'Sold out' : unpriced ? 'Price coming soon' : add === 'adding' ? 'Adding…' : add === 'added' ? '✓ Added to cart' : `Add to cart — ${money(cur.priceCents! * qty)}`,
    addDisabled: sold || unpriced || add === 'adding', addBusy: add === 'adding' ? 'true' : 'false',
    addBg: sold || unpriced ? '#DCD5C8' : add === 'added' ? '#152828' : '#2B5352', addColor: sold || unpriced ? '#323F3D' : '#FCFBF7',
    addAnnounce: add === 'added' ? `${qty} × ${cur.name} added to your cart.` : '',
  };
  return (
    <>
      <ProductView v={v} />
      <LightboxView v={v} />
    </>
  );
}

/* ---------------- Collections, About, FAQ, Contact, Cart ---------------- */

export function CollectionsPage() {
  const c = useCommon();
  const v = {
    ...c,
    collectionTiles: c.site.collections.map((x, i) => ({ ...x, desc: x.description || `[${x.name} collection description — supplied by client]`, href: '/collection/' + x.id, index: '0' + (i + 1), count: `${x.count} ${x.count === 1 ? 'candle' : 'candles'}`, dir: i % 2 ? 'row-reverse' : 'row' })),
  };
  return <CollectionsView v={v} />;
}

export function AboutPage() {
  const c = useCommon();
  const v = {
    ...c,
    aboutBlocks: [
      { title: 'How our candles are made', body: '[Production details — include only what is confirmed: materials, process, where candles are made.]' },
      { title: 'The people behind the shop', body: '[Introduction to the owner and team — supplied by client.]' },
    ],
  };
  return <AboutView v={v} />;
}

export function FaqPage({ cat }: { cat?: string }) {
  const c = useCommon();
  const { site } = c;
  const [faqQ, setFaqQ] = useState('');
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const pageCat = cat && site.faqCategories.some((f) => f.key === cat) ? cat : 'all';
  const fq = faqQ.trim().toLowerCase();
  const groups = site.faqCategories
    .filter((f) => fq || pageCat === 'all' || f.key === pageCat)
    .map((f) => ({
      label: f.label, hid: 'faq-h-' + f.key,
      items: site.faqs
        .filter((x) => x.category === f.key)
        .filter((x) => !fq || x.question.toLowerCase().includes(fq) || f.label.toLowerCase().includes(fq) || (x.supplied && x.answer.toLowerCase().includes(fq)))
        .map((x) => ({ q: x.question, a: x.answer, ...accordion('faq', x.id, !!open[x.id], () => setOpen((o) => ({ ...o, [x.id]: !o[x.id] }))) })),
    }))
    .filter((g) => g.items.length);
  const v = {
    ...c,
    faqQ, setFaqQ: (e: React.ChangeEvent<HTMLInputElement>) => setFaqQ(e.target.value), clearFaqQ: () => setFaqQ(''),
    faqGroups: groups, faqEmpty: groups.length === 0,
    faqNav: [{ label: 'All questions', href: '/faq', cat: 'all', count: site.faqs.length }, ...site.faqCategories.map((f) => ({ label: f.label, href: '/faq/' + f.key, cat: f.key, count: site.faqs.filter((x) => x.category === f.key).length }))].map((n) => {
      const on = pageCat === n.cat && !fq;
      return { ...n, current: on ? 'page' : undefined, bg: on ? '#EAE2D2' : 'transparent', weight: on ? 600 : 500 };
    }),
    faqNavPos: c.isMobile ? 'static' : 'sticky', faqNavDir: c.isMobile ? 'row' : 'column',
  };
  return <FaqView v={v} />;
}

export function ContactPage() {
  const c = useCommon();
  return (
    <>
      <ContactIntroView v={c} />
      <ContactSection />
    </>
  );
}

export function CartPage() {
  return <CartView v={useCommon()} />;
}
