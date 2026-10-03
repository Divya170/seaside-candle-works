'use client';

import { useStore } from '@/lib/store';
import { useCommon } from '@/lib/vm';
import SkipLinkView from './views/SkipLinkView';
import HeaderView from './views/HeaderView';
import CheckoutHeaderView from './views/CheckoutHeaderView';
import FooterView from './views/FooterView';
import DrawerOverlayView from './views/DrawerOverlayView';
import CartDrawerView from './views/CartDrawerView';
import MenuView from './views/MenuView';
import SearchView from './views/SearchView';
import StatusScreen from './StatusScreen';

function Shell({ children }: { children: React.ReactNode }) {
  const c = useCommon();
  return (
    <>
      <SkipLinkView v={c} />
      <HeaderView v={c} />
      <CheckoutHeaderView v={c} />
      <main id="scw-main" tabIndex={-1} style={{ outline: 'none', minHeight: '60vh' }}>
        {children}
      </main>
      <FooterView v={c} />
      <DrawerOverlayView v={c} />
      <CartDrawerView v={c} />
      <MenuView v={c} />
      <SearchView v={c} />
    </>
  );
}

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const s = useStore();
  if (!s.site) {
    return s.siteError ? (
      <StatusScreen title="The shop is taking a moment." body={s.siteError} action="Try again" onAction={() => s.refreshSite()} />
    ) : (
      <StatusScreen title="Loading…" body="Gathering the candles." busy />
    );
  }
  return <Shell>{children}</Shell>;
}
