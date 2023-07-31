"use client";
import { useEffect, useState, useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IWallet } from "@/lib/types/app.types";
import { updateWalletAction } from "./actions/updateWalletAction";
import { useRouter } from "next/navigation";

export default function WalletFavButton(props: { wallet: IWallet }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  let [_, startTransition] = useTransition();

  useEffect(() => {
    setIsFavorite(Boolean(props.wallet.favorite));
  }, [props.wallet]);

  const handleFav = () => {
    try {
      startTransition(async () => {
        try {
          await updateWalletAction(props.wallet.id, {
            favorite: !isFavorite,
          });
          setIsFavorite(!isFavorite);
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
