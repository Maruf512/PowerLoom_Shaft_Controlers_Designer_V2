import { cn } from "@/utils/cn";
import React, { useEffect } from "react";

const Modal = ({
  children,
  setIsOpen,
  className,
}: {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[40] bg-on-surface/40 backdrop-blur-lg",
        className
      )}
      onClick={() => setIsOpen(false)}
    >
      <span className={cn("z-[50]")} onClick={(e) => e.stopPropagation()}>
        {children}
      </span>
    </div>
  );
};

export default Modal;
