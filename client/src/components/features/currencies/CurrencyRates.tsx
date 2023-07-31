"use client";
import { ICurrencyRate } from "@/lib/types/app.types";
import { Descriptions } from "antd";
import { FaEuroSign, FaBtc } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";

type Props = {
  currencies: ICurrencyRate[];
};

const IconResolver: Record<string, React.ReactNode> = {
  USD: <IoLogoUsd />,
  EUR: <FaEuroSign />,
  BTC: <FaBtc />,
};

export default function CurrencyRates(props: Props) {
  return (
    <Descriptions title="Currency Rates" column={3}>
      {props.currencies.map((currency, ix) => (
        <Descriptions.Item label={IconResolver[currency.currency]} key={ix}>
          {currency.ethPrice}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
}
