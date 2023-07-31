"use client";
import { Descriptions } from "antd";
import { FaEuroSign } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";

type Props = {
  usdRate: number;
  euroRate: number;
};

export default function CurrencyRates(props: Props) {
  return (
    <Descriptions title="Currency Rates" column={2}>
      <Descriptions.Item label={<IoLogoUsd />}>
        {props.usdRate}
      </Descriptions.Item>
      <Descriptions.Item label={<FaEuroSign />}>
        {props.euroRate}
      </Descriptions.Item>
    </Descriptions>
  );
}
