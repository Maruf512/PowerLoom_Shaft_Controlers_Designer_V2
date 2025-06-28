// components/ColorDelete.tsx
"use client";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const CustomContextMeny = ({
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
  }, [setIsOpen]);

  if (typeof window === "undefined") return null;

  return createPortal(<div ref={ref}>{children}</div>, document.body);
};

export default CustomContextMeny;
