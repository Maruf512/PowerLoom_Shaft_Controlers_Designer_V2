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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
};

export default Overlay;
