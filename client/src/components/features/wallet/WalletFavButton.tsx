"use client";
import { useEffect, useState, useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IWallet } from "@/lib/types/app.types";
import { updateWalletAction } from "./actions/updateWalletAction";
import { useRouter } from "next/navigation";

export default function WalletFavButton(props: { wallet: IWallet }) {
  let [_, startTransition] = useTransition();
  const router = useRouter();
  const isFavorite = props.wallet.favorite;

  const handleFav = () => {
    try {
      startTransition(async () => {
        try {
          await updateWalletAction(props.wallet.id, {
            favorite: !isFavorite,
          });
        } catch (err) {}
      });
      router.refresh();
    } catch (err) {}
  };

  return (
    <button onClick={handleFav}>
      {isFavorite ? (
        <AiFillHeart color="red" transform="scale(1.5)" />
      ) : (
        <AiOutlineHeart color="red" transform="scale(1.5)" />
      )}
    </button>
  );
}
