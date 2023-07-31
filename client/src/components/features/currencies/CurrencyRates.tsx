"use client";
import { ICurrencyRate } from "@/lib/types/app.types";
import { Button, Descriptions, Form, Input } from "antd";
import { FaEuroSign, FaBtc } from "react-icons/fa";
import { IoLogoUsd } from "react-icons/io";
import { BiEdit } from "react-icons/bi";
import useParamSetter from "@/lib/hooks/useParamSetter";
import SidePanel from "@/components/ui/SidePanel";
import { useTransition } from "react";
import { updateCurrencyAction } from "./actions/updateCurrencyAction";
import { useRouter } from "next/navigation";

type Props = {
  currencies: ICurrencyRate[];
};

const IconResolver: Record<string, React.ReactNode> = {
  USD: <IoLogoUsd />,
  EUR: <FaEuroSign />,
  BTC: <FaBtc />,
};

export default function CurrencyRates(props: Props) {
  const { getParam, setParam } = useParamSetter();
  const router = useRouter();

  let [loading, startTransition] = useTransition();

  const handleSubmit = (values: { id: string; ethPrice: string }) => {
    try {
      startTransition(async () => {
        try {
          await updateCurrencyAction(values.id, {
            ethPrice: values.ethPrice,
          });
        } catch (err) {}
      });
      setParam({ key: "editCurrencies", value: undefined });
      router.refresh();
    } catch (err) {}
  };

  return (
    <>
      <Descriptions
        title="ETH Price"
        column={3}
        extra={
          <button
            onClick={() => setParam({ key: "editCurrencies", value: "true" })}
          >
            <BiEdit transform="scale(1.5)" />
          </button>
        }
      >
        {props.currencies.map((currency, ix) => (
          <Descriptions.Item label={IconResolver[currency.currency]} key={ix}>
            {currency.ethPrice}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <SidePanel
        title="Edit Currency Rates"
        open={getParam("editCurrencies") === "true"}
        onClose={() => setParam({ key: "editCurrencies", value: undefined })}
      >
        {props.currencies.map((currency, ix) => (
          <Form
            name={`update-currency-${currency.id}`}
            key={ix}
            className="mb-4"
            onFinish={handleSubmit}
            initialValues={{ id: currency.id, ethPrice: currency.ethPrice }}
          >
            <Form.Item hidden name="id">
              <Input />
            </Form.Item>
            <Form.Item label={currency.currency} name="ethPrice">
              <Input type="number" />
            </Form.Item>
            <Button type="default" htmlType={"" as any} loading={loading}>
              Update
            </Button>
          </Form>
        ))}
      </SidePanel>
    </>
  );
}
