export function sanitizeAmount(value: string): string {
  let s = value.replace(/[^\d.]/g, '');
  const dot = s.indexOf('.');
  if (dot !== -1) s = s.slice(0, dot + 1) + s.slice(dot + 1).replace(/\./g, '');
  return s;
}

export interface AmountCheck {
  amount: number;
  valid: boolean;
  error: string;
}

export function validateAmount(raw: string): AmountCheck {
  if (raw.trim() === '') return { amount: 0, valid: false, error: '' };

  const amount = Number(raw);
  if (Number.isNaN(amount)) return { amount, valid: false, error: 'Enter a valid number.' };
  if (amount <= 0) return { amount, valid: false, error: 'Amount must be greater than 0.' };

  return { amount, valid: true, error: '' };
}

export function fmtAmount(n: number): string {
  return n.toLocaleString('en-US', { maximumFractionDigits: 6 });
}

export function fmtRate(n: number): string {
  const max = n >= 1000 ? 2 : n >= 1 ? 4 : 6;
  return n.toLocaleString('en-US', { maximumFractionDigits: max });
}

export function fmtUsd(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 });
}
