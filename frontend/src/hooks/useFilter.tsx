"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// const validDisplays: TableType[] = ["design", "color"]

// const isValidDisplay = (display: string) => {
//   return display !== null && validDisplays.includes(display as TableType);
// };

const useFilter = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const initialSearch = params.get("search") || "";

    setSearch(initialSearch);
  }, [params]);

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (search) newParams.set("search", search);

    router.replace(`?${newParams.toString()}`);
  }, [search, router]);

  return {
    search,
    setSearch,
  };
};

export default useFilter;
