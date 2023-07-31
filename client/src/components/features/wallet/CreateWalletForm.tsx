"use client";
import { useTransition } from "react";
import { Button, Form, Input, Switch } from "antd";
import { createWalletAction } from "./actions/createWalletAction";

type FormValues = {
  address: string;
  name: string;
  favorite: boolean;
};

export default function CreateWalletForm(props: { onSuccess?: () => void }) {
  const [form] = Form.useForm<FormValues>();
  let [loading, startTransition] = useTransition();

  const handleSubmit = (values: FormValues) => {
    try {
      startTransition(async () => {
        try {
          await createWalletAction(values);
        } catch (err) {}
      });
      props.onSuccess?.();
    } catch (err) {}
  };

  return (
    <Form
      name="wallet-form"
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="Address" name="address">
        <Input placeholder="Wallet address" />
      </Form.Item>
      <Form.Item name="favorite" label="Favorite" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType={"" as any} loading={loading}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
}
