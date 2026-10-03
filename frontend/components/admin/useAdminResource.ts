'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError, isAbort } from '@/lib/api';

/** Loads an admin list endpoint; reports 401 so the page can show the passcode screen. */
export function useAdminResource<T>(path: string, onUnauthorized: () => void) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const ctl = new AbortController();
    setLoading(true);
    setError(null);
    api<T>(path, { admin: true, signal: ctl.signal })
      .then(setData)
      .catch((e) => {
        if (isAbort(e)) return;
        if ((e as ApiError).status === 401) onUnauthorized();
        else setError(e.message);
      })
      .finally(() => !ctl.signal.aborted && setLoading(false));
    return () => ctl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, tick]);

  const reload = useCallback(() => setTick((n) => n + 1), []);
  return { data, setData, loading, error, reload };
}
