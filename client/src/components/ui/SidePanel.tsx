"use client";
import React from "react";
import { Drawer } from "antd";
import useScreenSize from "@/lib/hooks/useScreenSize";
import { cn } from "@/lib/utils/class.utils";
import { GrFormClose } from "react-icons/gr";

type Props = {
  open: boolean;
  onClose?: () => void;
  title?: string;
  titleIcon?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  bodyStyle?: React.CSSProperties;
  placement?: "top" | "right" | "bottom" | "left";
  children?: React.ReactNode;
  closable?: boolean;
};

export default function SidePanel(props: Props) {
  const { isLarge, isXL } = useScreenSize();
  const isLargeOrXL = isLarge || isXL;

  return (
    <Drawer
      title={
        props.title ? (
          <div className="flex items-center">
            {props.titleIcon && (
              <span className="inline-block mr-2">{props.titleIcon}</span>
            )}
            <h3 className="text-stone-800 font-medium inline-block">
              {props.title}
            </h3>
          </div>
        ) : props.header ? (
          props.header
        ) : undefined
      }
      open={props.open}
      onClose={props.onClose}
      closeIcon={<GrFormClose />}
      closable={props.closable}
      placement={props.placement ?? isLargeOrXL ? "right" : "bottom"}
      width={isLargeOrXL ? "40vw" : "70vw"}
      height={isLargeOrXL ? undefined : "80vh"}
      footer={props.footer}
      bodyStyle={{
        ...props.bodyStyle,
        paddingTop: "1rem",
      }}
      destroyOnClose={true}
      className={cn(isLargeOrXL ? "rounded-l-lg" : "rounded-t-lg")}
    >
      {props.children}
    </Drawer>
  );
}
