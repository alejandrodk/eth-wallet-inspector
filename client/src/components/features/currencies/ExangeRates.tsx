import { getCurrencyRates, getETHPrice } from "@/lib/api/currencies";
import EthRates from "./EthRates";
import CurrencyRates from "./CurrencyRates";

export default async function ExangeRates() {
  const [ethPrice, currencies] = await Promise.all([
    getETHPrice(),
    getCurrencyRates(),
  ]);

  return (
    <>
      <div className="w-1/3 bg-slate-100 p-2 rounded-md mr-4">
        <EthRates ethBtc={ethPrice.ethbtc} ethUsd={ethPrice.ethusd} />
      </div>
      <div className="w-[30%] bg-slate-100 p-2 rounded-md">
        <CurrencyRates
          usdRate={currencies.usdRate}
          euroRate={currencies.euroRate}
        />
      </div>
    </>
  );
}
