import Dashboard from "@/components/layout/Dashboard";
import Button from "@/components/ui/Button";
import React from "react";

const page = () => {
  return (
    <div>
      <Dashboard />
      <Button className="" variant={"destructive"}>
        Hello
      </Button>
    </div>
  );
};

export default page;
