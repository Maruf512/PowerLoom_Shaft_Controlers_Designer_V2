"use client";

import { data, designColumn } from "@/constants/dataTable";
import useFilter from "@/hooks/useFilter";
import DataTable from "../ui/DataTable";
import Filter from "../ui/Filter";
import Navigator from "../ui/Navigator";
import UserDetails from "../ui/UserDetails";

const Dashboard = () => {
  const { setDisplay, display, search, setSearch } = useFilter();

  return (
    <div className=" space-y-10">
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
