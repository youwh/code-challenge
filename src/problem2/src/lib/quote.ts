export interface Quote {
  rate: number;
  output: number;
}

export function quote(amount: number, fromPrice: number, toPrice: number): Quote {
  const rate = fromPrice / toPrice;
  return { rate, output: amount * rate };
}
