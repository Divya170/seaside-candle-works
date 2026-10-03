'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { api } from './api';
import type { CartLine, Quote, Site } from './types';

const CART_KEY = 'scw-cart'; // same key as the design
export const MAX_QTY = 99;

interface Store {
  site: Site | null;
  siteError: string | null;
  refreshSite: () => Promise<void>;
  w: number;
  reduced: boolean;
  scrolled: boolean;
  cart: CartLine[];
  quote: Quote | null;
  quoting: boolean;
  addLines: (id: string, qty: number) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  drawer: boolean;
  justAdded: boolean;
  openDrawer: (justAdded?: boolean) => void;
  closeDrawer: () => void;
  menu: boolean;
  setMenu: (v: boolean) => void;
  search: boolean;
  setSearch: (v: boolean) => void;
  go: (href: string) => void;
}

const Ctx = createContext<Store | null>(null);
export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside <StoreProvider>');
  return s;
}

export function StoreProvider({ initialSite, children }: { initialSite: Site | null; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [site, setSite] = useState<Site | null>(initialSite);
  const [siteError, setSiteError] = useState<string | null>(null);
  const [w, setW] = useState(1280);
  const [reduced, setReduced] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cart, setCart] = useState<CartLine[]>([]);
  const loaded = useRef(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoting, setQuoting] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  const refreshSite = useCallback(async () => {
    try {
      setSite(await api<Site>('/site'));
      setSiteError(null);
    } catch (e) {
      setSiteError((e as Error).message);
    }
  }, []);
  useEffect(() => {
    if (!initialSite) refreshSite();
  }, [initialSite, refreshSite]);

  useEffect(() => {
    const onResize = () => setW(window.innerWidth);
    const onScroll = () => setScrolled(window.scrollY > 24);
    onResize();
    onScroll();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, { passive: true });
    setReduced(!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
    try {
      const c = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      if (Array.isArray(c)) setCart(c.filter((l) => l && typeof l.id === 'string' && Number.isFinite(l.qty) && l.qty > 0).map((l) => ({ id: l.id, qty: Math.min(MAX_QTY, Math.floor(l.qty)) })));
    } catch {
      /* corrupt storage */
    }
    loaded.current = true;
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // persist the cart, and price it on the server whenever it changes
  useEffect(() => {
    if (!loaded.current) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      /* storage full */
    }
    if (!cart.length) {
      setQuote({ lines: [], problems: [], count: 0, subtotalCents: 0, shippingCents: null, taxCents: null, totalCents: 0 });
      return;
    }
    const ctl = new AbortController();
    setQuoting(true);
    api<Quote>('/cart/quote', { method: 'POST', body: { items: cart }, signal: ctl.signal })
      .then(setQuote)
      .catch(() => {})
      .finally(() => !ctl.signal.aborted && setQuoting(false));
    return () => ctl.abort();
  }, [cart, site]);

  // the design links pages with plain <a href>; route same-site links through Next.js
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href') || '';
      if (!href.startsWith('/') || href.startsWith('//') || href.startsWith('/api/')) return;
      e.preventDefault();
      router.push(href);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [router]);

  // each page change: close overlays, start at the top, play the design's page-enter animation
  useEffect(() => {
    setMenu(false);
    setSearch(false);
    setDrawer(false);
    window.scrollTo(0, 0);
    const m = document.getElementById('scw-main');
    if (m?.animate && !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
      m.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)' });
  }, [pathname]);

  // Escape closes overlays; scroll locks while any is open
  useEffect(() => {
    const open = drawer || menu || search;
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawer(false);
        setMenu(false);
        setSearch(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawer, menu, search]);

  const addLines = useCallback((id: string, qty: number) => {
    setCart((c) => {
      const ex = c.find((l) => l.id === id);
      return ex ? c.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l)) : [...c, { id, qty: Math.min(MAX_QTY, qty) }];
    });
  }, []);
  const setQty = useCallback((id: string, q: number) => {
    setCart((c) => (q < 1 ? c.filter((l) => l.id !== id) : c.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, q) } : l))));
    setJustAdded(false);
  }, []);
  const openDrawer = useCallback((ja?: boolean) => {
    setDrawer(true);
    setJustAdded(!!ja);
    setTimeout(() => document.getElementById('scw-drawer-close')?.focus(), 80);
  }, []);

  return (
    <Ctx.Provider
      value={{
        site, siteError, refreshSite, w, reduced, scrolled, cart, quote, quoting, addLines, setQty, clearCart: () => setCart([]),
        drawer, justAdded, openDrawer, closeDrawer: () => setDrawer(false), menu, setMenu, search, setSearch, go: (h) => router.push(h),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
