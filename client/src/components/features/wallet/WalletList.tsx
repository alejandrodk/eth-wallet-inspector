import { getWallets, getWalletsBalances } from "@/lib/api/wallets";
import Wallet from "./Wallet";
import { arrayToMapByKey } from "@/lib/utils/array.utils";
import { getCurrencyRates } from "@/lib/api/currencies";

export default async function WalletList(props: { currentCurrency?: string }) {
  const [wallets, rates] = await Promise.all([
    getWallets(),
    getCurrencyRates(),
  ]);
  const balances = await getWalletsBalances(wallets.map((w) => w.address));
  const balancesMap = arrayToMapByKey(balances, "address");
  const currentRate = rates.find((r) => r.currency === props.currentCurrency);

  return (
    <div className="w-full flex flex-col">
      {wallets?.map((wallet, ix) => {
        const balance = balancesMap.get(wallet.address);
        return (
          <Wallet
            key={ix}
            wallet={wallet}
            balance={balance}
            currencyBalance={
              currentRate && balance
                ? {
                    currency: currentRate.currency,
                    balance:
                      parseFloat(balance.balanceInEther) *
                      parseFloat(currentRate.ethPrice),
                  }
                : undefined
            }
          />
        );
      })}
    </div>
  );
}
