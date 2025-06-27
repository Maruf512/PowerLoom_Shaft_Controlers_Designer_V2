"use client";

import React, { createContext, useCallback, useContext, useState } from "react";

type ToastVarientType = "success" | "error" | "warning" | "info";

interface ToastContextType {
  addToast: (message: string, varient: ToastVarientType) => void;
}

interface ToastType {
  id: string;
  message: string;
  varient: ToastVarientType;
  isExiting: boolean;
  clicked: boolean;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const TOAST_DISPLAY_DURATION = 3000;
const TOAST_ANIMATION_DURATION = 300;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const addToast = useCallback((message: string, varient: ToastVarientType) => {
    const id = Date.now().toString();
    setToasts((prev) => [
      ...prev,
      { id, message, varient, isExiting: false, clicked: false },
    ]);

    setTimeout(() => {
      setToasts((prev) =>
        prev.map((toast) =>
          toast.id === id ? { ...toast, isExiting: true } : toast
        )
      );

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, TOAST_ANIMATION_DURATION);
    }, TOAST_DISPLAY_DURATION);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id ? { ...toast, clicked: true, isExiting: true } : toast
      )
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, TOAST_ANIMATION_DURATION);
  }, []);

  console.log(toasts);

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div>
        {children}
        <div className="toast-container fixed bottom-4 right-4 z-50 flex flex-col items-end pointer-events-none cursor-pointer ">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`
              toast-item mb-2 shadow-lg text-on-surface break-words pointer-events-auto space-y-2 lg:max-w-[40rem] max-w-[20rem] border-2 border-muted rounded-radius-lg hover:scale-105 duration-300 px-5 py-3
              ${
                toast.varient === "success"
                  ? "bg-success-toast"
                  : toast.varient === "error"
                  ? "bg-error-toast"
                  : toast.varient === "info"
                  ? "bg-info-toast text-strong"
                  : "bg-warning-toast"
              }
              ${toast.isExiting ? "toast-exit" : "toast-enter"}
              ${toast.clicked ? "scale-75" : ""}
            `}
              onMouseDown={() => removeToast(toast.id)}
            >
              <div className="capitalize text-sm font-semibold tracking-wide">
                {toast.varient}
              </div>
              <div className="border-b border-muted"></div>
              <div>{toast.message}</div>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context.addToast;
};
