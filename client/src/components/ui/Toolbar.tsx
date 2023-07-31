import ExangeRates from "../features/currencies/ExangeRates";
import CreateWalletButton from "../features/wallet/CreateWalletButton";

export default function Toolbar() {
  return (
    <div className="bg-white rounded-md p-4 shadow-md w-1/2 mx-auto my-10 flex flex-row justify-between">
      <ExangeRates />
      <CreateWalletButton />
    </div>
  );
}
