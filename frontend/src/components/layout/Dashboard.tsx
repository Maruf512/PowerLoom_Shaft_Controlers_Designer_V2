"use client";

import React from "react";
import UserDetails from "../ui/UserDetails";
import Navigator from "../ui/Navigator";

const Dashboard = () => {
  return (
    <div className="lg:m-9 m-5">
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between">
        <Navigator />
        <UserDetails />
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Dashboard;
