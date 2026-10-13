import type { PriceRow, Token } from '../types';

export function toTokens(rows: PriceRow[]): Token[] {
  const map = new Map<string, number>();
  for (const row of rows) {
    if (row?.currency && Number.isFinite(row.price) && row.price > 0) {
      map.set(row.currency, row.price);
    }
  }
  return [...map.entries()]
    .map(([symbol, price]) => ({ symbol, price }))
    .sort((a, b) => a.symbol.localeCompare(b.symbol));
}
