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
      className="fixed inset-0 z-[40] bg-on-surface/40 backdrop-blur-lg flex items-center justify-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        className={cn(
          "z-[50] bg-on-surface border border-muted rounded-radius-lg  mx-8 h-[80vh] overflow-y-auto",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
