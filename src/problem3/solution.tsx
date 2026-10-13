interface WalletBalance {
  blockchain: string;
  currency: string;
  amount: number;
}

interface WalletPageProps extends BoxProps {}

const PRIORITIES: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string): number => PRIORITIES[blockchain] ?? -99;

const WalletPage: React.FC<WalletPageProps> = (props: WalletPageProps) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const rows = useMemo(() => {
    const visible = balances.filter(
      (balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0,
    );
    visible.sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain));

    return visible.map((balance) => {
      const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
      return (
        <WalletRow
          key={balance.currency}
          className={classes.row}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed(2)}
        />
      );
    });
  }, [balances, prices]);

  return <div {...props}>{rows}</div>;
};

export default WalletPage;
