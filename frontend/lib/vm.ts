'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useStore } from './store';
import { api, isAbort, qs } from './api';
import type { Product, Site } from './types';

export const money = (cents: number) => '$' + (cents / 100).toFixed(2);

/** Which design page a path belongs to. */
export function pageOf(path: string) {
  const [a] = path.split('/').filter(Boolean);
  if (!a) return 'home';
  return a; // shop, product, collections, collection, about, faq, contact, cart, checkout, admin
}

export const accordion = (prefix: string, id: string | number, open: boolean, toggle: () => void) => ({
  btnId: `${prefix}-b-${id}`, panelId: `${prefix}-p-${id}`, expanded: open ? 'true' : 'false', toggle,
  rows: open ? '1fr' : '0fr', vis: open ? 'visible' : 'hidden', rot: open ? 'rotate(45deg)' : 'none',
});
export const chip = (active: boolean, disabled = false) => ({
  bg: active ? '#152828' : '#FCFBF7', color: active ? '#F7F3EA' : '#152828', border: active ? '#152828' : 'rgba(36,59,59,.24)', pressed: active ? 'true' : 'false', op: disabled ? 0.45 : 1,
});

/** Product card fields (the design's card()), with real prices and stock from the database. */
export function makeCard(p: Product, site: Site, quickAdd: (id: string) => void) {
  const sold = p.status === 'soldout';
  const priced = p.priceCents !== null;
  const canBuy = !sold && priced;
  return {
    id: p.id, href: '/product/' + p.id, name: p.name, scent: p.scent || site.placeholders.scent,
    price: priced ? money(p.priceCents!) : site.placeholders.price,
    img: p.img, pos: p.pos, alt: `${p.name} — ${p.altDesc}`, filter: sold ? 'saturate(.55)' : 'none',
    sold: !canBuy, statusLabel: sold ? 'Sold out' : 'In stock', dot: sold ? '#A89680' : '#356D6C',
    hasBadge: sold || !!p.badge, badge: sold ? 'Sold out' : p.badge,
    add: () => canBuy && quickAdd(p.id), addLabel: sold ? 'Sold out' : priced ? 'Add to cart' : 'Coming soon', addOp: canBuy ? 1 : 0.45,
  };
}

/** Values every page shares: navigation, overlays, cart, search, footer. */
export function useCommon() {
  const s = useStore();
  const pathname = usePathname() || '/';
  const site = s.site as Site;
  const page = pageOf(pathname);
  const faqCat = page === 'faq' ? pathname.split('/')[2] || 'all' : '';
  const isDesktop = s.w >= 1080;
  const isMobile = s.w < 720;
  const quickAdd = (id: string) => {
    s.addLines(id, 1);
    s.openDrawer(true);
  };
  const card = (p: Product) => makeCard(p, site, quickAdd);

  // header search: server-side, debounced
  const [sq, setSq] = useState('');
  const [sres, setSres] = useState<Product[]>([]);
  useEffect(() => {
    const q = sq.trim();
    if (!q) {
      setSres([]);
      return;
    }
    const ctl = new AbortController();
    const t = setTimeout(() => {
      api<{ items: Product[] }>('/products' + qs({ q }), { signal: ctl.signal }).then((r) => setSres(r.items)).catch((e) => !isAbort(e) && setSres([]));
    }, 200);
    return () => {
      clearTimeout(t);
      ctl.abort();
    };
  }, [sq]);
  const colName = (id: string) => site.collections.find((c) => c.id === id)?.name || '';

  const navDefs = [
    { label: 'Shop', href: '/shop', on: page === 'shop' || page === 'product' },
    { label: 'Collections', href: '/collections', on: page === 'collections' || page === 'collection' },
    { label: 'About', href: '/about', on: page === 'about' },
    { label: 'Candle Care', href: '/faq/care', on: page === 'faq' && faqCat === 'care' },
    { label: 'FAQ', href: '/faq', on: page === 'faq' && faqCat !== 'care' },
    { label: 'Contact', href: '/contact', on: page === 'contact' },
  ];

  // cart lines: names/images from the catalogue, prices from the server quote
  const q = s.quote;
  const lines = s.cart
    .map((l) => {
      const p = site.products.find((x) => x.id === l.id);
      if (!p) return null;
      const priced = q?.lines.find((x) => x.id === l.id);
      const problem = q?.problems.find((x) => x.id === l.id);
      return {
        id: p.id, name: p.name, scent: problem ? `Can’t be ordered — ${problem.reason}` : p.scent || site.placeholders.scent, img: p.img, pos: p.pos,
        href: '/product/' + p.id, qty: l.qty, inc: () => s.setQty(p.id, l.qty + 1), dec: () => s.setQty(p.id, l.qty - 1), decDisabled: l.qty <= 1,
        remove: () => s.setQty(p.id, 0), removeLabel: `Remove ${p.name} from cart`,
        unit: p.priceCents !== null ? money(p.priceCents) : site.placeholders.price,
        lineTotal: priced ? money(priced.lineCents) : problem ? '—' : p.priceCents !== null ? money(p.priceCents * l.qty) : '[Line total]',
      };
    })
    .filter(Boolean) as any[];
  const cartCount = s.cart.reduce((a, l) => a + l.qty, 0);
  const scrolled = s.scrolled;

  return {
    s, site, st: site.settings, page, faqCat, isDesktop, isCompactNav: !isDesktop, isMobile, isNotMobile: !isMobile,
    isWideControls: s.w >= 960, isNarrowControls: s.w < 960,
    isHome: page === 'home', isShop: page === 'shop', isProduct: page === 'product', isCollections: page === 'collections', isCollection: page === 'collection',
    isAbout: page === 'about', isFaq: page === 'faq', isContact: page === 'contact', isCart: page === 'cart', isCheckout: page === 'checkout',
    showChrome: page !== 'checkout', showContact: page === 'home' || page === 'contact', showGrid: page === 'shop' || page === 'collection',
    navBg: scrolled ? 'rgba(247,243,234,.93)' : '#F7F3EA', navBorder: scrolled ? 'rgba(36,59,59,.12)' : 'transparent', navPad: scrolled ? '12px' : '22px',
    navH: scrolled ? '67px' : '87px', stickyTop: scrolled ? '96px' : '116px',
    navLinks: navDefs.map((n) => ({ ...n, current: n.on ? 'page' : undefined, line: n.on ? '#152828' : 'transparent' })),
    menuLinks: [{ label: 'Home', href: '/', on: page === 'home' }, ...navDefs, { label: 'Cart', href: '/cart', on: page === 'cart' }].map((n) => ({ ...n, current: n.on ? 'page' : undefined })),
    menu: s.menu, menuExpanded: s.menu ? 'true' : 'false',
    skip: () => document.getElementById('scw-main')?.focus(),
    openSearch: () => {
      s.setSearch(true);
      setSq('');
      setTimeout(() => document.getElementById('scw-search')?.focus(), 30);
    },
    closeSearch: () => s.setSearch(false),
    stop: (e: React.SyntheticEvent) => e.stopPropagation(),
    openMenu: () => {
      s.setMenu(true);
      setTimeout(() => document.getElementById('scw-menu-close')?.focus(), 30);
    },
    closeMenu: () => s.setMenu(false),
    openDrawer: () => s.openDrawer(false),
    closeDrawer: s.closeDrawer,
    ovOp: s.drawer ? 1 : 0, ovPe: s.drawer ? 'auto' : 'none', drawerTf: s.drawer ? 'translateX(0)' : 'translateX(100%)', drawerVis: s.drawer ? 'visible' : 'hidden',
    justAdded: s.justAdded,
    card,
    quickAdd,
    lines,
    cartCount,
    hasCart: cartCount > 0,
    cartEmpty: cartCount === 0,
    subtotal: q ? money(q.subtotalCents) : '[Subtotal]',
    cartCountText: `${cartCount} ${cartCount === 1 ? 'item' : 'items'}`,
    showCartBar: isMobile && cartCount > 0,
    cardSize: isMobile ? 'sm' : 'md',
    search: s.search, sq, hasSq: !!sq, setSq: (e: React.ChangeEvent<HTMLInputElement>) => setSq(e.target.value), clearSq: () => setSq(''),
    searchResults: sres.slice(0, 6).map((p) => ({ name: p.name, href: '/product/' + p.id, img: p.img, pos: p.pos, meta: [p.collections.map(colName).join(' · '), p.priceCents !== null ? money(p.priceCents) : ''].filter(Boolean).join(' — ') || site.placeholders.scent })),
    searchEmpty: !!sq.trim() && sres.length === 0, searchIdle: !sq.trim(), hasSqResults: sres.length > 0,
    searchCountText: sq.trim() ? `${sres.length} ${sres.length === 1 ? 'result' : 'results'}` : 'Start typing to search the shop.',
    viewAllText: `View all ${sres.length} in the shop`,
    submitSearch: (e?: React.FormEvent) => {
      e?.preventDefault?.();
      s.setSearch(false);
      s.go('/shop' + qs({ q: sq.trim() }));
    },
    footerCols: [
      { title: 'Shop', links: [{ label: 'All candles', href: '/shop' }, ...site.collections.map((c) => ({ label: c.name, href: '/collection/' + c.id })), { label: 'Collections', href: '/collections' }] },
      { title: 'Help', links: [{ label: 'FAQ', href: '/faq' }, { label: 'Candle care', href: '/faq/care' }, { label: 'Shipping', href: '/faq/shipping' }, { label: 'Returns', href: '/faq/returns' }, { label: 'Contact', href: '/contact' }] },
      { title: 'Seaside', links: [{ label: 'About', href: '/about' }, { label: 'Cart', href: '/cart' }] },
    ],
  };
}
