import { getETHPrice } from "@/lib/api/currencies";
import EthRates from "./EthRates";

export default async function ETHPrice() {
  const ethPrice = await getETHPrice();

  return (
    <div className="w-1/3 bg-slate-100 p-2 rounded-md">
      <EthRates ethBtc={ethPrice.ethbtc} ethUsd={ethPrice.ethusd} />
    </div>
  );
}
