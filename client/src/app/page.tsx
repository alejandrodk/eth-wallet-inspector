import Toolbar from "@/components/views/Toolbar";
import WalletList from "@/components/features/wallet/WalletList";

import { TbWorldSearch } from "react-icons/tb";

export default async function Home(props: {
  params: {};
  searchParams: { currentCurrency: string; walletId: string };
}) {
  return (
    <main className="min-h-screen grid grid-rows-[5vh_auto] bg-slate-200">
      <header className="flex items-center justify-center bg-white">
        <TbWorldSearch className="mr-2" />
        Wallet Inspector
      </header>
      <section className="flex flex-col items-start justify-start">
        <Toolbar />
        <WalletList
          currentCurrency={props.searchParams.currentCurrency}
          walletId={props.searchParams.walletId}
        />
      </section>
    </main>
  );
}
