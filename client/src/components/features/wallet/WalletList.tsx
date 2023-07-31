import {
  getWalletTxs,
  getWallets,
  getWalletsBalances,
} from "@/lib/api/wallets";
import Wallet from "./Wallet";
import { arrayToMapByKey } from "@/lib/utils/array.utils";
import { getCurrencyRates } from "@/lib/api/currencies";
import WalletDetail from "@/components/views/WalletDetail";

export default async function WalletList(props: {
  currentCurrency?: string;
  walletId?: string;
  filter?: string;
}) {
  const [wallets, rates] = await Promise.all([
    getWallets({
      favorites: props.filter === "favorites" ? true : undefined,
    }),
    getCurrencyRates(),
  ]);
  const balances = await getWalletsBalances(wallets.map((w) => w.address));
  const balancesMap = arrayToMapByKey(balances, "address");
  const currentRate = rates.find((r) => r.currency === props.currentCurrency);
  const walletDetail = wallets.find((w) => w.id === props.walletId);

  return (
    <>
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
      {walletDetail && (
        <WalletDetail
          wallet={walletDetail}
          txs={await getWalletTxs(walletDetail.address)}
        />
      )}
    </>
  );
}
