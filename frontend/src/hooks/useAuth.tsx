import React, { useState } from "react";

const useAuth = () => {
  const [data, setData] = useState();
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

export default useAuth;
