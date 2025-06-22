"use client";

import DataTable from "@/components/ui/DataTable";
import Filter from "@/components/ui/Filter";
import Navigator from "@/components/ui/Navigator";
import UserDetails from "@/components/ui/UserDetails";
import { designColumn } from "@/constants/dataTable";
import useFetchState from "@/hooks/useFetchState";
import useFilter from "@/hooks/useFilter";
import apiClient from "@/lib/apiClient";
import { DesignDataType, DesignType } from "@/types/data";
import { useEffect } from "react";

const Dashboard = () => {
  const { setDisplay, display, search, setSearch } = useFilter();
  const { data, setData, loading, setLoading, error, setError } =
    useFetchState<DesignDataType[]>();

  useEffect(() => {
    const fetchDesigns = async () => {
      const { data, error, status } = await apiClient<DesignType[]>("designs", {
        method: "GET",
      });
      console.log(data, error, status);
    };

    fetchDesigns();
  }, [display, search]);

  return (
    <div className="space-y-10">
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
