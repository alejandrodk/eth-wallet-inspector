import { apiUrls } from "./urls";

export const getCurrencyRates = async (): Promise<
  {
    currency: "USD" | "EUR";
    rate: number;
  }[]
> => {
  const res = await fetch(apiUrls.currencies.rates());
  if (!res.ok) return [];
  return res.json();
};

export const getETHPrice = async (): Promise<{
  ethbtc: string;
  ethbtc_timestamp: string;
  ethusd: string;
  ethusd_timestamp: string;
}> => {
  const res = await fetch(apiUrls.currencies.ethPrice());
  if (!res.ok) return {} as any;
  return res.json();
};
