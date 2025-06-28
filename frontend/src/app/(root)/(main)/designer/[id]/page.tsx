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
      const { data, error } = await apiClient<Design>(`designs/${id}`);
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
        <div className="font-semibold text-base text-center capitalize tracking-wide">
          Loading...
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
