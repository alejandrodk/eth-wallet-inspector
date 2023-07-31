"use client";
import { Descriptions, Tag } from "antd";
import { LiaEthereum } from "react-icons/lia";
import { FaListUl } from "react-icons/fa";
import { CgDanger } from "react-icons/cg";
import { BsCurrencyExchange } from "react-icons/bs";
import { IWallet, IWalletBalance } from "@/lib/types/app.types";
import WalletFavButton from "./WalletFavButton";
import useParamSetter from "@/lib/hooks/useParamSetter";

type Props = {
  wallet: IWallet;
  balance?: IWalletBalance;
  currencyBalance?: {
    currency: string;
    balance: number;
  };
};

export default function Wallet(props: Props) {
  const { setParam } = useParamSetter();

  return (
    <Descriptions
      extra={
        <div className="flex flex-row">
          <WalletFavButton wallet={props.wallet} />
          <FaListUl
            transform="scale(1.5)"
            className="inline-block ml-5 hover:cursor-pointer"
            onClick={() =>
              setParam({ key: "walletId", value: props.wallet.id })
            }
          />
        </div>
      }
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
      {props.currencyBalance && (
        <Descriptions.Item
          label={
            <span>
              <BsCurrencyExchange className="mr-2 inline-block" />
              {props.currencyBalance.currency} Balance
            </span>
          }
        >
          {new Intl.NumberFormat().format(props.currencyBalance.balance)}
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
