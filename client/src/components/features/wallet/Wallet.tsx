"use client";
import { IWallet } from "@/lib/types/app.types";
import { Descriptions } from "antd";

type Props = {
  wallet: IWallet;
};

export default function Wallet(props: Props) {
  return (
    <Descriptions
      layout="vertical"
      title={props.wallet.name ?? props.wallet.name}
      className="m-auto bg-white p-4 mb-4 rounded-md shadow-md w-1/2 hover:bg-slate-50"
    >
      <Descriptions.Item label="Address">
        {props.wallet.address}
      </Descriptions.Item>
    </Descriptions>
  );
}
