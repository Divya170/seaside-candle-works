import type { Site } from './types';

/** Server-side fetch of the site bootstrap (used by the root layout for SSR). */
export async function fetchSite(): Promise<Site | null> {
  const backend = process.env.BACKEND_URL || 'http://localhost:4000';
  try {
    const res = await fetch(`${backend}/api/site`, { cache: 'no-store' });
    if (!res.ok) return null;
    return (await res.json()) as Site;
  } catch {
    return null;
  }
}
