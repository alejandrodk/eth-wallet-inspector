import { getCurrencyRates } from "@/lib/api/currencies";
import CurrentCurrencySelect from "../features/currencies/CurrentCurrencySelect";
import CreateWalletButton from "../features/wallet/CreateWalletButton";
import CurrencyRates from "../features/currencies/CurrencyRates";
import FilterWalletsSelect from "../features/wallet/FilterWalletsSelect";

export default async function Toolbar() {
  const currencies = await getCurrencyRates();

  return (
    <>
      <div className="bg-slate-100 w-1/2 p-4 rounded-md mx-auto mt-10">
        <CurrencyRates currencies={currencies} />
      </div>
      <div className="bg-slate-100 rounded-md p-4 shadow-md w-1/2 mx-auto my-5 flex flex-row justify-center items-center">
        <CreateWalletButton />
        <CurrentCurrencySelect currencies={currencies} />
        <FilterWalletsSelect />
      </div>
    </>
  );
}
