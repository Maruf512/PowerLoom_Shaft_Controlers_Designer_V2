"use client";

import Dashboard from "@/components/layout/Dashboard";

const page = async () => {
  const id = localStorage.getItem("user_id");
  console.log(id);
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default page;
