/** Small fetch wrapper for the NestJS API (proxied at /api by next.config.mjs). */

export class ApiError extends Error {
  status: number;
  errors: Record<string, string>;
  constructor(status: number, message: string, errors: Record<string, string> = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

const ADMIN_KEY = 'scw-admin-token';

export const adminToken = {
  get: () => {
    try {
      return sessionStorage.getItem(ADMIN_KEY) || '';
    } catch {
      return '';
    }
  },
  set: (t: string) => {
    try {
      sessionStorage.setItem(ADMIN_KEY, t);
    } catch {
      /* storage unavailable */
    }
  },
  clear: () => {
    try {
      sessionStorage.removeItem(ADMIN_KEY);
    } catch {
      /* storage unavailable */
    }
  },
};

type Options = { method?: string; body?: unknown; admin?: boolean; signal?: AbortSignal };

export async function api<T>(path: string, opts: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (opts.admin) headers['x-admin-token'] = adminToken.get();
  let res: Response;
  try {
    res = await fetch('/api' + path, {
      method: opts.method || 'GET',
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: opts.signal,
      cache: 'no-store',
    });
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e;
    throw new ApiError(0, 'Seaside Candle Works couldn’t be reached. Check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = Array.isArray(data?.message) ? data.message.join(' ') : data?.message;
    throw new ApiError(res.status, message || 'Something went wrong on our side. Please try again.', data?.errors || {});
  }
  return data as T;
}

export const isAbort = (e: unknown) => (e as Error)?.name === 'AbortError';

/** Builds a query string, dropping empty and "All" values. */
export function qs(params: Record<string, string | number | undefined | null>) {
  const s = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '' || v === 'All' || v === 'all') continue;
    s.set(k, String(v));
  }
  const out = s.toString();
  return out ? '?' + out : '';
}
