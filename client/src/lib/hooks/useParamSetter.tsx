"use client";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function useParamSetter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setParam({
    key,
    value,
  }: {
    key: string;
    value: string | undefined;
  }) {
    const params = new URLSearchParams(searchParams?.toString());
    value !== undefined ? params.set(key, value) : params.delete(key);
    router.replace(`${pathname}?${params}`, { scroll: false });
  }

  function setParams(params: { [key: string]: string | undefined }) {
    const newParams = new URLSearchParams(searchParams?.toString());
    Object.entries(params).forEach(([key, value]) => {
      value !== undefined ? newParams.set(key, value) : newParams.delete(key);
    });
    router.replace(`${pathname}?${newParams}`, { scroll: false });
  }

  function getParam(key: string) {
    const params = new URLSearchParams(searchParams?.toString());
    return params.get(key);
  }

  return { setParam, getParam, setParams };
}
