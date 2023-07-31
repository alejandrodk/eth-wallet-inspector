"use client";
import useParamSetter from "@/lib/hooks/useParamSetter";
import { ICurrencyRate } from "@/lib/types/app.types";
import { Select } from "antd";

export default function CurrentCurrencySelect(props: {
  currencies: ICurrencyRate[];
}) {
  const { getParam, setParam } = useParamSetter();
  return (
    <Select
      className="m-auto w-[20%]"
      placeholder="Show prices in"
      allowClear
      options={props.currencies.map((curr) => ({
        label: curr.currency,
        value: curr.currency,
      }))}
      value={getParam("currentCurrency")}
      onChange={(value) => setParam({ key: "currentCurrency", value })}
    />
  );
}
