import { fmtUsd } from '../lib/format';
import type { Token } from '../types';
import { TokenIcon } from './TokenIcon';

interface TokenMenuProps {
  tokens: Token[];
  selected: string;
  other: string;
  onSelect: (symbol: string) => void;
  onClose: () => void;
}

export function TokenMenu({ tokens, selected, other, onSelect, onClose }: TokenMenuProps) {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <ul className="absolute right-0 top-full z-20 mt-1.5 max-h-72 w-64 overflow-y-auto rounded-lg border border-white/10 bg-[#151925] py-1 text-sm shadow-xl">
        {tokens.map((t) => (
          <li key={t.symbol}>
            <button
              type="button"
              disabled={t.symbol === other}
              onClick={() => onSelect(t.symbol)}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40 ${
                t.symbol === selected ? 'bg-indigo-500/20' : ''
              }`}
            >
              <TokenIcon symbol={t.symbol} />
              <span className="font-medium">{t.symbol}</span>
              <span className="ml-auto text-xs text-gray-400">{fmtUsd(t.price)}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
