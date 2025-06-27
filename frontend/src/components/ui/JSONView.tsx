import React from "react";
import { BiCopy } from "react-icons/bi";
import { useToast } from "./ToastProvider";

const JSONView = <T,>({ object, title }: { object: T; title?: string }) => {
  const toast = useToast();

  return (
    <div className="bg-on-surface rounded-lg h-full overflow-auto text-sm lg:text-base border border-gray-200">
      {title && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-gray-800 font-semibold">
          <h3 className="text-lg">{title}</h3>
        </div>
      )}
      <div className="relative">
        <div className="p-4 overflow-x-auto ">
          <pre className="text-basec font-mono whitespace-pre-wrap break-words">
            {JSON.stringify(object, null, 2)}
          </pre>
        </div>
        <div
          className="absolute top-2 right-2 px-4 py-2 cursor-pointer text-basec hover:text-primary duration-200"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(object, null, 2));
            toast("Copied to clipboard", "info");
          }}
        >
          <BiCopy size={16} />
        </div>
      </div>
    </div>
  );
};

export default JSONView;
