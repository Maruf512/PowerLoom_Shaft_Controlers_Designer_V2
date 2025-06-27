import React from "react";

const JSONView = <T,>({ object, title }: { object: T; title?: string }) => {
  return (
    <div className="bg-on-surface rounded-lg h-full overflow-auto text-sm lg:text-base border border-gray-200">
      {title && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-gray-800 font-semibold">
          <h3 className="text-lg">{title}</h3>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-gray-700 font-mono whitespace-pre-wrap break-words">
          {JSON.stringify(object, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default JSONView;
