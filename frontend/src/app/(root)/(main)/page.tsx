"use client";

import DataErrorModal from "@/components/ui/DataErrorModal";
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
  const { display, search, setSearch } = useFilter();
  const { data, setData } = useFetchState<DesignDataType[]>();

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

  return (
    <div className="space-y-6">
      {/* <div className="flex flex-col gap-4 lg:flex-row justify-center lg:justify-between bg-surface rounded-radius-lg">
        <Navigator />
        <UserDetails />
      </div> */}
      <div>
        <Filter
          search={search}
          setSearch={setSearch}
          // setDisplay={setDisplay}
          // display={display}
        />
      </div>
      <div>
        <DataTable data={data || []} columns={designColumn} />
      </div>
    </div>
  );
};

export default Dashboard;
