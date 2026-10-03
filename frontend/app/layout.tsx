import type { Metadata, Viewport } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store';
import { fetchSite } from '@/lib/server';
import SiteShell from '@/components/SiteShell';

export const metadata: Metadata = {
  title: { default: 'Seaside Candle Works — Hand-poured candles, Rehoboth Beach', template: '%s · Seaside Candle Works' },
  description: 'Hand-poured candles from a small coastal workshop in Rehoboth Beach, Delaware. Shop seasonal scents and best sellers.',
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#F7F3EA' };

// catalogue and prices change from the admin, so always render with fresh data
export const dynamic = 'force-dynamic';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await fetchSite();
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@400;500;600;700&display=swap" />
      </head>
      <body>
        <StoreProvider initialSite={site}>
          <SiteShell>{children}</SiteShell>
        </StoreProvider>
      </body>
    </html>
  );
}
