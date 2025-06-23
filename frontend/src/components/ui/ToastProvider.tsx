import React, { createContext, useState } from "react";

type ToastVarientType = "success" | "error" | "warning" | "info";

interface ToastContextType {
  addToast: (message: string, type: ToastVarientType) => void;
}

interface ToastType {
  id: string;
  message: string;
  type: ToastVarientType;
}

const ToastContext = createContext<ToastContextType | null>(null);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<ToastType[]>([]);

  return <div>ToastProvider</div>;
};

export default ToastProvider;
