"use client";

import useParamSetter from "@/lib/hooks/useParamSetter";
import { Select } from "antd";

export default function FilterWalletsSelect() {
  const { getParam, setParam } = useParamSetter();
  return (
    <Select
      className="m-auto w-[20%]"
      placeholder="Filter"
      allowClear
      onClear={() => setParam({ key: "filter", value: undefined })}
      options={[
        {
          label: "Favorites",
          value: "favorites",
        },
      ]}
      value={getParam("filter")}
      onChange={(value) => setParam({ key: "filter", value })}
    />
  );
}
