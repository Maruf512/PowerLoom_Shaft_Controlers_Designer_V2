"use client";

import { TableType } from "@/types/data";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const validDisplays: TableType[] = ["design", "color"];

const isValidDisplay = (display: string) => {
  return display !== null && validDisplays.includes(display as TableType);
};

const useFilter = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState<TableType>("");

  useEffect(() => {
    const initialSearch = params.get("search") || "";
    const param = (params.get("display") || "design") as TableType;

    const initialDisplay = isValidDisplay(param) ? param : "design";

    setSearch(initialSearch);
    setDisplay(initialDisplay as TableType);
  }, [params]);

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (search) newParams.set("search", search);
    if (display) newParams.set("display", display);

    router.replace(`?${newParams.toString()}`);
  }, [search, display, router]);

  return {
    search,
    setSearch,
    display,
    setDisplay,
  };
};

export default useFilter;
