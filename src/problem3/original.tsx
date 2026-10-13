// no `blockchain` on this type but we read it below — should add missing field to WalletBalance
interface WalletBalance {
  currency: string;
  amount: number;
}

// never actually built anywhere, rows reads .formatted off WalletBalance instead
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// generic Props, convention is WalletPageProps
interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  // children is never used, so just destructure props and pass the rest to the div
  const { children, ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  // this gets redefined on every render, move it out of the component entirely.
  // also it takes any, and a switch this simple is just a Record<string, number>.
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
        return 20;
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // lhsPriority is undefined — probably meant balancePriority above, but a guess
        if (lhsPriority > -99) {
          // if so, this filter also looks backwards (keeps amount <= 0)
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
        // falls through with no return when equal
      });
    // prices isn't used in here, it just forces a re-sort on every price tick
  }, [balances, prices]);

  // unused? rows below maps sortedBalances and never touches this
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      // no arg = 0 decimals, so 0.5 becomes "1" — want toFixed(2) or similar
      formatted: balance.amount.toFixed(),
    };
  });

  // rebuilt every render — sorting is memoized but this map isn't
  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    // sortedBalances items have no `formatted`, only formattedBalances does —
    // so balance.formatted is always undefined here
    // also no guard on prices[currency] — missing price gives NaN
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        className={classes.row}
        // list gets re-sorted so index keys will shuffle state around, use currency
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...rest}>{rows}</div>;
};
