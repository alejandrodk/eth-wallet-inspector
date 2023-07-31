import { apiUrls } from "./urls";

export const getCurrencyRates = async (): Promise<{
  usdRate: number;
  euroRate: number;
}> => {
  const res = await fetch(apiUrls.currencies.rates());
  if (!res.ok) return { usdRate: 0, euroRate: 0 };
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
