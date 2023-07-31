"use server";
import { apiUrls } from "@/lib/api/urls";
import { IWallet } from "@/lib/types/app.types";
import axios from "axios";

export async function updateWalletAction(
  id: string,
  body: Partial<IWallet>
): Promise<IWallet> {
  /* eslint-disable-next-line */
  const { data, status } = await axios.put<IWallet>(
    apiUrls.wallets.updateWallet(id),
    body
  );

  if (status !== 200) {
    throw new Error("Failed to update wallet");
  }

  return data;
}
