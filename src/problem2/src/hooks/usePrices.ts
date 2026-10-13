import { useCallback, useEffect, useState } from 'react';
import { PRICES_URL } from '../constants';
import { toTokens } from '../lib/prices';
import type { LoadStatus, PriceRow, Token } from '../types';

export function usePrices() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');

  const reload = useCallback(async () => {
    setStatus('loading');
    try {
      const res = await fetch(PRICES_URL);
      if (!res.ok) throw new Error(`Price feed responded with ${res.status}`);
      const rows = (await res.json()) as PriceRow[];
      const list = toTokens(Array.isArray(rows) ? rows : []);
      if (!list.length) throw new Error('Price feed returned no usable prices');
      setTokens(list);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  return { tokens, status, reload };
}

export type PricesState = ReturnType<typeof usePrices>;
