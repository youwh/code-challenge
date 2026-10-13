import { useState } from 'react';
import { ICON_BASE } from '../constants';

interface TokenIconProps {
  symbol: string;
  size?: number;
}

export function TokenIcon({ symbol, size = 24 }: TokenIconProps) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-indigo-400 text-xs font-bold text-gray-900"
        style={{ width: size, height: size }}
      >
        {symbol.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      className="shrink-0 rounded-full bg-white"
      src={`${ICON_BASE}/${encodeURIComponent(symbol)}.svg`}
      width={size}
      height={size}
      alt=""
      onError={() => setBroken(true)}
    />
  );
}
