"use client";
import { Descriptions } from "antd";
import { FaBtc } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";

type Props = {
  ethBtc: string;
  ethUsd: string;
};

export default function EthRates(props: Props) {
  return (
    <Descriptions title="ETH Price" column={2}>
      <Descriptions.Item label={<FaBtc />}>{props.ethBtc}</Descriptions.Item>
      <Descriptions.Item label={<IoLogoUsd />}>
        {props.ethUsd}
      </Descriptions.Item>
    </Descriptions>
  );
}
