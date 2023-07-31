"use server";

import { apiUrls } from "@/lib/api/urls";
import { IWallet } from "@/lib/types/app.types";
import axios from "axios";

export async function createWalletAction(
  body: Partial<IWallet>
): Promise<IWallet> {
  /* eslint-disable-next-line */
  const { data, status } = await axios.post<IWallet>(
    apiUrls.wallets.createWallet(),
    body
  );

  if (status !== 201) {
    throw new Error("Failed to create wallet");
  }

  return data;
}
