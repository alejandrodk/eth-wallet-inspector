"use client";
import SidePanel from "@/components/ui/SidePanel";
import useParamSetter from "@/lib/hooks/useParamSetter";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CreateWalletForm from "./CreateWalletForm";
import { cn } from "@/lib/utils/class.utils";
import { useRouter } from "next/navigation";

export default function CreateWalletButton() {
  const { setParam, getParam } = useParamSetter();
  const router = useRouter();

  return (
    <>
      <button
        className={cn(
          "m-auto rounded-md",
          "bg-white p-2 text-sm font-light border-stone-300 border",
          "hover:bg-slate-600 hover:text-white"
        )}
        onClick={() => setParam({ key: "showCreateWalletForm", value: "true" })}
      >
        <AiOutlinePlusCircle className="mr-2 inline-block" />
        Add wallet
      </button>
      <SidePanel
        open={getParam("showCreateWalletForm") === "true"}
        onClose={() => {
          setParam({ key: "showCreateWalletForm", value: undefined });
          router.refresh();
        }}
      >
        <CreateWalletForm
          onSuccess={() =>
            setParam({ key: "showCreateWalletForm", value: undefined })
          }
        />
      </SidePanel>
    </>
  );
}
