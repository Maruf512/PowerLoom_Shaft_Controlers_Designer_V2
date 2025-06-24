"use client";

import DataTable from "@/components/ui/DataTable";
import Filter from "@/components/ui/Filter";
import Navigator from "@/components/ui/Navigator";
import { useToast } from "@/components/ui/ToastProvider";
import UserDetails from "@/components/ui/UserDetails";
import { designColumn } from "@/constants/dataTable";
import useFetchState from "@/hooks/useFetchState";
import useFilter from "@/hooks/useFilter";
import apiClient from "@/lib/apiClient";
import { DesignDataRecievedType, DesignDataType } from "@/types/data";
import { useEffect } from "react";

const Dashboard = () => {
  const { setDisplay, display, search, setSearch } = useFilter();
  const { data, setData, loading, setLoading, error, setError } =
    useFetchState<DesignDataType[]>();

  useEffect(() => {
    console.log("useeffect enitiatedx");
    const fetchDesigns = async () => {
      const { data, error } = await apiClient<DesignDataRecievedType[]>(
        "designs",
        {
          method: "GET",
        }
      );

      if (data && !error) {
        const mutatedData = data.map((design) => ({
          id: design.id,
          name: design.name,
          total_color_palettes: design.total_color_palettes,
          machine_type: design.machine_type,
          date: design.updated_at.split("T")[0],
        }));

        setData(mutatedData);
      }
    };

    fetchDesigns();
  }, [display, search]);

  const { addToast } = useToast();

  console.log(data);

  return (
    <div className="space-y-10">
      <button
        onClick={() => addToast("Operation successful!", "info")}
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors duration-200"
      >
        Show Success Toast
      </button>
      <div className="flex flex-col gap-4 lg:flex-row justify-center lg:justify-between bg-surface rounded-radius-lg">
        <Navigator />
        <UserDetails />
      </div>
      <div>
        <Filter
          search={search}
          setSearch={setSearch}
          setDisplay={setDisplay}
          display={display}
        />
      </div>
      <div>
        <DataTable data={data || []} columns={designColumn} />
      </div>
    </div>
  );
};

export default Dashboard;
