"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useFilter = () => {
  const params = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [color, setColor] = useState("");
  const [design, setDesign] = useState("");

  useEffect(() => {
    const initialSearch = params.get("search") || "";
    const initialColor = params.get("color") || "";
    const initialDesign = params.get("design") || "";

    setSearch(initialSearch);
    setColor(initialColor);
    setDesign(initialDesign);
  }, []);

  useEffect(() => {
    const newParams = new URLSearchParams();

    if (search) newParams.set("search", search);
    if (color) newParams.set("color", color);
    if (design) newParams.set("design", design);

    router.replace(`?${newParams.toString()}`);
  }, [search, color, design]);

  return {
    search,
    color,
    design,
    setSearch,
    setColor,
    setDesign,
  };
};

export default useFilter;
