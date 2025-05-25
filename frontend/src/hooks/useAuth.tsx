import React, { useState } from "react";

const useStateCustom = <T,>() => {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  return {
    data,
    loading,
    error,
    setData,
    setLoading,
    setError,
  };
};

export default useStateCustom;
