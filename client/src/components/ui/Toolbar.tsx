import { getCurrencyRates } from "@/lib/api/currencies";
import CurrentCurrencySelect from "../features/currencies/CurrentCurrencySelect";
import CreateWalletButton from "../features/wallet/CreateWalletButton";
import CurrencyRates from "../features/currencies/CurrencyRates";

export default async function Toolbar() {
  const currencies = await getCurrencyRates();

  return (
    <div className="bg-white rounded-md p-4 shadow-md w-1/2 mx-auto my-10 flex flex-row">
      <div className="w-[70%] flex flex-row">
        <div className="bg-slate-100 p-2 rounded-md mr-4">
          <CurrencyRates currencies={currencies} />
        </div>
      </div>
      <div className="w-[30%] m-auto flex flex-col justify-center items-stretch">
        <CreateWalletButton />
        <CurrentCurrencySelect currencies={currencies} />
      </div>
    </div>
  );
}
