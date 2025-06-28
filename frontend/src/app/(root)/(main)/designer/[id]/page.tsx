"use client";

import DesignDetails from "@/components/layout/DesignDetails";
import useFetchState from "@/hooks/useFetchState";
import apiClient from "@/lib/apiClient";
import { Design } from "@/types/data";
import { useEffect } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const {
    data: designer,
    setData: setDesigner,
    error: designerError,
    setError: setDesignerError,
    loading,
    setLoading,
  } = useFetchState<Design>();

  useEffect(() => {
    const fetchDesigner = async () => {
      setLoading(true);
      const { data, error } = await apiClient<Design>(`designs/${params.id}`);
      setLoading(false);
      if (error) {
        setDesignerError("Error fetching designer data");
        return;
      }

      if (data) setDesigner(data);
    };

    fetchDesigner();
  }, []);

  console.log(designer);

  return (
    <div>
      {loading ? (
        <div className="font-semibold text-basec text-center capitalize tracking-wide">
          Loading...
        </div>
      ) : (
        <div>
          {designerError ? (
            <p className="font-semibold text-basec text-center capitalize tracking-wide">
              {designerError}
            </p>
          ) : designer ? (
            <DesignDetails designer={designer} />
          ) : (
            <p className="font-semibold text-basec text-center capitalize tracking-wide">
              No design data found.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
