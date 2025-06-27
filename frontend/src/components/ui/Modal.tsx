import { cn } from "@/utils/cn";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react";
import ReactDOM from "react-dom";

interface ModalContextType {
  modalRef: React.RefObject<HTMLDivElement | null>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const Modal = ({
  isOpen,
  setIsOpen,
  children,
  className,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
}) => {
  const modalDialogRef = useRef<HTMLDivElement>(null);

  const contextValue: ModalContextType = {
    modalRef: modalDialogRef,
    setIsOpen,
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalDialogRef.current &&
        !modalDialogRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, setIsOpen]);

  // if (!isOpen) {
  //   return null;
  // }

  return ReactDOM.createPortal(
    <div
      className={cn(
        "fixed inset-0 z-40 flex",
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-300",
          "bg-muted/50 backdrop-blur-sm",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      <ModalContext.Provider value={contextValue}>
        <div className={cn("relative w-full h-full", className)}>
          {children}
        </div>
      </ModalContext.Provider>
    </div>,
    document.body
  );
};

export const ModalContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const context = useContext(ModalContext);

  if (!context) {
    console.error("ModalContent must be used within a Modal component.");
    return null;
  }

  return (
    <div ref={context.modalRef} className={cn(className)}>
      {children}
    </div>
  );
};
