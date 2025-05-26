"use client";

import useFilter from "@/hooks/useFilter";
import Filter from "../ui/Filter";
import Navigator from "../ui/Navigator";
import UserDetails from "../ui/UserDetails";
import DataTable from "../ui/DataTable";

const data = [
  {
    id: 1,
    name: "Donkey",
    total_color_palettes: 100,
    machine_type: "Left-Handed",
    date: "29-12-2025",
  },
  {
    id: 1,
    name: "Donkey",
    total_color_palettes: 100,
    machine_type: "Left-Handed",
    date: "29-12-2025",
  },
];

const Dashboard = () => {
  const { color, setColor, design, setDesign, search, setSearch } = useFilter();

  return (
    <div className=" space-y-10">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
        <Navigator />
        <UserDetails />
      </div>
      <div>
        <Filter
          search={search}
          setSearch={setSearch}
          setColor={setColor}
          setDesign={setDesign}
          color={color}
          design={design}
        />
      </div>
      <div>
        <DataTable tableData={data} />
      </div>
    </div>
  );
};

export default Dashboard;
