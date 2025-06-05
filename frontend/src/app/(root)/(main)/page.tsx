"use client";

import DataTable from "@/components/ui/DataTable";
import Filter from "@/components/ui/Filter";
import Navigator from "@/components/ui/Navigator";
import UserDetails from "@/components/ui/UserDetails";
import { data, designColumn } from "@/constants/dataTable";
import useFilter from "@/hooks/useFilter";

const Dashboard = () => {
  const { setDisplay, display, search, setSearch } = useFilter();
  // const { data, setData, loading, setLoading, error, setError } =
  //   useFetchState();

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
        <DataTable data={data} columns={designColumn} />
      </div>
    </div>
  );
};

export default Dashboard;
