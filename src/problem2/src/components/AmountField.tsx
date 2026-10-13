import { fmtUsd } from '../lib/format';
import type { Token } from '../types';
import { TokenIcon } from './TokenIcon';
import { TokenMenu } from './TokenMenu';

interface AmountFieldProps {
  id: string;
  label: string;
  token: Token;
  tokens: Token[];
  otherSymbol: string;
  value: string;
  usdValue: number | null;
  error?: string;
  readOnly?: boolean;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onSelectToken: (symbol: string) => void;
  onChange?: (value: string) => void;
}

export function AmountField({
  id,
  label,
  token,
  tokens,
  otherSymbol,
  value,
  usdValue,
  error,
  readOnly,
  menuOpen,
  onToggleMenu,
  onSelectToken,
  onChange,
}: AmountFieldProps) {
  return (
    <>
      <label htmlFor={id} className="mb-1.5 mt-3 block text-sm text-gray-400">
        {label}
      </label>
      <div className={`flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 ${error ? 'ring-1 ring-red-500/60' : ''}`}>
        <input
          id={id}
          className="min-w-0 flex-1 bg-transparent text-2xl font-semibold outline-none placeholder:text-gray-600"
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          readOnly={readOnly}
          placeholder="0"
          inputMode="decimal"
        />
        <div className="relative shrink-0">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2.5 py-1.5 text-sm font-medium hover:bg-white/20"
            onClick={onToggleMenu}
          >
            <TokenIcon symbol={token.symbol} />
            {token.symbol}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {menuOpen && (
            <TokenMenu
              tokens={tokens}
              selected={token.symbol}
              other={otherSymbol}
              onSelect={onSelectToken}
              onClose={onToggleMenu}
            />
          )}
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-500">{usdValue !== null ? fmtUsd(usdValue) : ''}</p>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </>
  );
}
