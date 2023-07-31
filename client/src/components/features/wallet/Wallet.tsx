"use client";
import { Descriptions, Tag } from "antd";
import { LiaEthereum } from "react-icons/lia";
import { CgDanger } from "react-icons/cg";
import { IWallet, IWalletBalance } from "@/lib/types/app.types";

type Props = {
  wallet: IWallet;
  balance?: IWalletBalance;
};

export default function Wallet(props: Props) {
  return (
    <Descriptions
      layout="horizontal"
      title={props.wallet.name ?? props.wallet.name}
      className="m-auto bg-white p-4 mb-4 rounded-md shadow-md w-1/2 hover:bg-slate-50"
      column={3}
    >
      <Descriptions.Item label="Address" span={3}>
        {props.wallet.address}
      </Descriptions.Item>
      {props.balance && (
        <Descriptions.Item
          label={
            <span>
              <LiaEthereum className="mr-2 inline-block" />
              ETH Balance
            </span>
          }
        >
          {parseFloat(props.balance.balanceInEther).toFixed(4)}
        </Descriptions.Item>
      )}
      {props.wallet.old && (
        <Descriptions.Item label="Tags">
          <Tag color="red">
            <CgDanger className="mr-2 inline-block" />
            Old wallet
          </Tag>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
}
