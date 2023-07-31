"use client";
import SidePanel from "@/components/ui/SidePanel";
import useParamSetter from "@/lib/hooks/useParamSetter";
import { AiOutlinePlusCircle } from "react-icons/ai";
import CreateWalletForm from "./CreateWalletForm";
import { cn } from "@/lib/utils/class.utils";

export default function CreateWalletButton() {
  const { setParam, getParam } = useParamSetter();

  return (
    <>
      <button
        className={cn(
          "m-auto w-full rounded-md mb-4",
          "bg-slate-100 p-2 border-2 border-slate-400",
          "hover:bg-slate-600 hover:text-white hover:border-slate-600"
        )}
        onClick={() => setParam({ key: "showCreateWalletForm", value: "true" })}
      >
        <AiOutlinePlusCircle className="mr-2 inline-block" />
        Add wallet
      </button>
      <SidePanel
        open={getParam("showCreateWalletForm") === "true"}
        onClose={() =>
          setParam({ key: "showCreateWalletForm", value: undefined })
        }
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
