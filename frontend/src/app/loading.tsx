import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-28">
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
      <span className="ml-3 text-primary">Loading...</span>
    </div>
  );
};

export default Loading;
