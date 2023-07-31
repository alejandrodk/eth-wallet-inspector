"use server";
import { apiUrls } from "@/lib/api/urls";
import { ICurrencyRate } from "@/lib/types/app.types";
import axios from "axios";

export async function updateCurrencyAction(
  id: string,
  body: Partial<ICurrencyRate>
): Promise<ICurrencyRate> {
  /* eslint-disable-next-line */
  const { data, status } = await axios.put<ICurrencyRate>(
    apiUrls.currencies.updateRate(id),
    body
  );

  if (status !== 200) {
    throw new Error("Failed to update currency");
  }

  return data;
}
