// components/ColorDelete.tsx
"use client";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { useEffect, useRef } from "react";
import { ColorType } from "@/types/data";

const ColorDelete = ({
  setIsOpen,
  children,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handelScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("scroll", handelScroll);

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handelScroll);
    };
  }, []);

  if (typeof window === "undefined") return null;

  return createPortal(<div ref={ref}>{children}</div>, document.body);
};

export default ColorDelete;
