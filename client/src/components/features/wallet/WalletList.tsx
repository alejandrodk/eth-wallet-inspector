import { IWallet } from "@/lib/types/app.types";
import Wallet from "./Wallet";

type Props = {
  wallets: IWallet[];
};

export default function WalletList(props: Props) {
  return (
    <div className="w-full flex flex-col">
      {props.wallets?.map((wallet, ix) => (
        <Wallet wallet={wallet} key={ix} />
      ))}
    </div>
  );
}
