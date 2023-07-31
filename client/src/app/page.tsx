import Toolbar from "@/components/ui/Toolbar";
import WalletList from "@/components/features/wallet/WalletList";
import { getWallets, getWalletsBalances } from "@/lib/api/wallets";
import { TbWorldSearch } from "react-icons/tb";

export default async function Home() {
  const wallets = await getWallets();
  const balances = await getWalletsBalances(wallets.map((w) => w.address));

  return (
    <main className="min-h-screen grid grid-rows-[5vh_auto] bg-slate-200">
      <header className="flex items-center justify-center bg-white">
        <TbWorldSearch className="mr-2" />
        Wallet Inspector
      </header>
      <section className="flex flex-col items-start justify-start">
        <Toolbar />
        <WalletList wallets={wallets} />
      </section>
    </main>
  );
}
