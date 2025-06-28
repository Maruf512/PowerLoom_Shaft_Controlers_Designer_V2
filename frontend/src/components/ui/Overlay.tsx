import { cn } from "@/utils/cn";
import React, { useEffect, useRef } from "react";

const Overlay = ({
  children,
  className,
  setIsOpen,
}: {
  children: React.ReactNode;
  className?: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
};

export default Overlay;
