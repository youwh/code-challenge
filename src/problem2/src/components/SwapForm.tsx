import { fmtRate } from '../lib/format';
import { usePrices } from '../hooks/usePrices';
import { useSwap } from '../hooks/useSwap';
import { AmountField } from './AmountField';

export function SwapForm() {
  const prices = usePrices();
  const {
    status,
    reload,
    tokens,
    from,
    to,
    amount,
    amountRaw,
    valid,
    rate,
    output,
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
  } = useSwap(prices);

  if (status === 'loading') {
    return <p className="mt-4 rounded-lg bg-white/5 px-3 py-3 text-center text-sm text-gray-400">Loading prices…</p>;
  }

  if (status === 'error') {
    return (
      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-3 text-sm text-red-300">
        <span>Couldn't load prices.</span>
        <button type="button" className="font-semibold underline" onClick={() => void reload()}>
          Retry
        </button>
      </div>
    );
  }

  if (!from || !to) return null;

  return (
    <>
      <AmountField
        id="send-amount"
        label="Amount to send"
        token={from}
        tokens={tokens}
        otherSymbol={to.symbol}
        value={amountRaw}
        usdValue={valid ? amount * from.price : null}
        error={error}
        menuOpen={openMenu === 'from'}
        onToggleMenu={() => toggleMenu('from')}
        onSelectToken={(s) => pickToken('from', s)}
        onChange={changeAmount}
      />

      <div className="relative z-10 -my-2 flex justify-center">
        <button
          type="button"
          className="rounded-lg border-4 border-[#0a0d14] bg-white/10 p-2 hover:bg-white/20"
          onClick={flip}
          aria-label="Switch currencies"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />
          </svg>
        </button>
      </div>

      <AmountField
        id="receive-amount"
        label="Amount to receive"
        token={to}
        tokens={tokens}
        otherSymbol={from.symbol}
        value={output !== null ? String(Number(output.toFixed(8))) : ''}
        usdValue={output !== null ? output * to.price : null}
        readOnly
        menuOpen={openMenu === 'to'}
        onToggleMenu={() => toggleMenu('to')}
        onSelectToken={(s) => pickToken('to', s)}
      />

      <p className="mt-3 text-center text-sm text-gray-400">
        {rate !== null ? `1 ${from.symbol} = ${fmtRate(rate)} ${to.symbol}` : ''}
      </p>

      {flash && <p className="mt-3 text-center text-sm text-emerald-400">{flash}</p>}

      <button
        type="button"
        className="mt-4 w-full rounded-xl bg-indigo-500 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-gray-500"
        onClick={submit}
        disabled={!ready}
      >
        {swapping ? 'Swapping…' : 'Confirm swap'}
      </button>
      <p className="mt-3 text-center text-xs text-gray-600">For demo purposes only.</p>
    </>
  );
}
