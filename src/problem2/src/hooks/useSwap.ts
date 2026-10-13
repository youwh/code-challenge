import { useState } from 'react';
import { fmtAmount, sanitizeAmount, validateAmount } from '../lib/format';
import { quote } from '../lib/quote';
import type { PricesState } from './usePrices';

export function useSwap({ tokens, status, reload }: PricesState) {
  const [fromSym, setFromSym] = useState('ETH');
  const [toSym, setToSym] = useState('USDC');
  const [amountRaw, setAmountRaw] = useState('1');
  const [openMenu, setOpenMenu] = useState<'from' | 'to' | null>(null);
  const [swapping, setSwapping] = useState(false);
  const [flash, setFlash] = useState('');

  const from = tokens.find((t) => t.symbol === fromSym);
  const to = tokens.find((t) => t.symbol === toSym);

  const { amount, valid, error } = validateAmount(amountRaw);
  const q = from && to && valid ? quote(amount, from.price, to.price) : null;
  const ready = status === 'ready' && !!from && !!q && !swapping;

  const changeAmount = (value: string) => {
    setAmountRaw(sanitizeAmount(value));
    setFlash('');
  };

  const flip = () => {
    setFromSym(toSym);
    setToSym(fromSym);
    setFlash('');
  };

  const toggleMenu = (side: 'from' | 'to') => {
    setOpenMenu((current) => (current === side ? null : side));
  };

  const pickToken = (side: 'from' | 'to', symbol: string) => {
    if (side === 'from') setFromSym(symbol);
    else setToSym(symbol);
    setOpenMenu(null);
    setFlash('');
  };

  const submit = () => {
    if (!ready || !from || !to || !q) return;
    setSwapping(true);
    setTimeout(() => {
      setSwapping(false);
      setFlash(`Swapped ${fmtAmount(amount)} ${from.symbol} for ${fmtAmount(q.output)} ${to.symbol}.`);
    }, 1200);
  };

  return {
    status,
    reload,
    tokens,
    from,
    to,
    amount,
    amountRaw,
    valid,
    rate: q?.rate ?? null,
    output: q?.output ?? null,
    error,
    flash,
    swapping,
    ready,
    openMenu,
    changeAmount,
    flip,
    toggleMenu,
    pickToken,
    submit,
  };
}
