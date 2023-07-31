"use client";
import { IWallet, IWalletTx } from "@/lib/types/app.types";
import SidePanel from "../ui/SidePanel";
import useParamSetter from "@/lib/hooks/useParamSetter";
import { Collapse, Descriptions } from "antd";

export default function WalletDetail(props: {
  wallet: IWallet;
  txs: IWalletTx[];
}) {
  const { setParam } = useParamSetter();
  return (
    <SidePanel
      title={`${props.wallet.name} | Last transactions`}
      open
      onClose={() => setParam({ key: "walletId", value: undefined })}
    >
      <Collapse defaultActiveKey={["0"]} ghost>
        {props.txs.map((tx, ix) => (
          <Collapse.Panel header={tx.hash} key={ix}>
            <Descriptions column={1}>
              <Descriptions.Item label="From">{tx.from}</Descriptions.Item>
              <Descriptions.Item label="To">{tx.to}</Descriptions.Item>
              <Descriptions.Item label="Value">
                {tx.valueInEther} ETH
              </Descriptions.Item>
              <Descriptions.Item label="Gas">{tx.gas}</Descriptions.Item>
              <Descriptions.Item label="Gas Price">
                {tx.gasPriceInEther} ETH
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {new Date(parseInt(tx.timestamp) * 1000).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>
          </Collapse.Panel>
        ))}
      </Collapse>
    </SidePanel>
  );
}
