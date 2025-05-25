"use client";

import React from "react";
import UserDetails from "../ui/UserDetails";
import Navigator from "../ui/Navigator";
import Button from "../ui/Button";
import useFilter from "@/hooks/useFilter";
import Filter from "../ui/Filter";

const Dashboard = () => {
  const { color, setColor, design, setDesign, search, setSearch } = useFilter();

  console.log(color, design, search);

  return (
    <div className="lg:mt-9 mt-5 space-y-10">
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
      <div></div>
    </div>
  );
};

export default Dashboard;
