import { IWallet, IWalletBalance } from "../types/app.types";
import { buildUrl } from "../utils/http.utils";
import { apiUrls } from "./urls";

export const getWallets = async (): Promise<IWallet[]> => {
  const res = await fetch(apiUrls.wallets.getWallets(), {
    cache: "no-cache",
  });
  if (!res.ok) return [];
  return res.json();
};

export const getWalletsBalances = async (
  address: string[]
): Promise<IWalletBalance[]> => {
  const res = await fetch(
    buildUrl(apiUrls.wallets.balance(), {
      address: address.join(","),
    })
  );
  if (!res.ok) return [];
  return res.json();
};
