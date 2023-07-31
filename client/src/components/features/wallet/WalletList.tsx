import { getWallets, getWalletsBalances } from "@/lib/api/wallets";
import Wallet from "./Wallet";
import { arrayToMapByKey } from "@/lib/utils/array.utils";

export default async function WalletList() {
  const wallets = await getWallets();
  const balances = await getWalletsBalances(wallets.map((w) => w.address));
  const balancesMap = arrayToMapByKey(balances, "address");

  return (
    <div className="w-full flex flex-col">
      {wallets?.map((wallet, ix) => (
        <Wallet
          wallet={wallet}
          balance={balancesMap.get(wallet.address)}
          key={ix}
        />
      ))}
    </div>
  );
}
