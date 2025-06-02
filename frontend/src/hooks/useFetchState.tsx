import { ApiErrorType } from "@/types/api";
import { useState } from "react";

const useFetchState = <T,>() => {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorType>();

  return {
    data,
    loading,
    error,
    setData,
    setLoading,
    setError,
  };
};

export default useFetchState;
