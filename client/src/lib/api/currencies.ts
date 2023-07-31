import "server-only";
import { ICurrencyRate } from "../types/app.types";
import { apiUrls } from "./urls";

export const getCurrencyRates = async (): Promise<ICurrencyRate[]> => {
  const res = await fetch(apiUrls.currencies.rates(), {
    cache: "no-cache",
  });
  if (!res.ok) return [];
  return res.json();
};
