"use client";

import DesignDetails from "@/components/layout/DesignDetails";
import useFetchState from "@/hooks/useFetchState";
import apiClient from "@/lib/apiClient";
import { Design } from "@/types/data";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { id } = useParams();

  const {
    data: designer,
    setData: setDesigner,
    error: designerError,
    setError: setDesignerError,
    loading,
    setLoading,
  } = useFetchState<Design>();

  useEffect(() => {
    if (!id) {
      setDesignerError("Invalid designer id");
      return;
    }

    const fetchDesigner = async () => {
      setLoading(true);
      const { data, error } = await apiClient<Design>(`designer/designs/${id}`);
      setLoading(false);

      if (error) {
        setDesignerError("Error fetching designer data");
        return;
      }

      if (data) setDesigner(data);
    };

    fetchDesigner();
  }, [id, setDesigner, setDesignerError, setLoading]);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent"></div>
          <span className="ml-3 text-primary">Loading...</span>
        </div>
      ) : designerError ? (
        <p className="font-semibold text-base text-center capitalize tracking-wide">
          {designerError}
        </p>
      ) : designer ? (
        <DesignDetails designer={designer} />
      ) : (
        <p className="font-semibold text-base text-center capitalize tracking-wide">
          No design data found.
        </p>
      )}
    </div>
  );
};

export default Page;
