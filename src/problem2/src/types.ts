export interface Token {
  symbol: string;
  price: number;
}

export interface PriceRow {
  currency: string;
  price: number;
}

export type LoadStatus = 'loading' | 'ready' | 'error';
