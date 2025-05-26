import { FilterPropsType } from "@/types/props";
import React from "react";
import Button from "./Button";
import { cn } from "@/utils/cn";

const Filter = ({
  search,
  setSearch,
  setColor,
  setDesign,
  color,
  design,
}: FilterPropsType) => {
  return (
    <div className="border-y-2 border-muted/10 flex flex-col lg:flex-row justify-between lg:items-center lg:px-10 px-3 py-4 bg-on-surface">
      <div className="bg-surface">
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="space-x-4">
        <Button
          className={cn("px-7", {
            "bg-basec": design,
          })}
          onClick={() => {
            setDesign("design");
            setColor("");
          }}
        >
          Design
        </Button>
        <Button
          className={cn("px-7", {
            "bg-basec": color,
          })}
          onClick={() => {
            setColor("color");
            setDesign("");
          }}
        >
          Color
        </Button>
      </div>
    </div>
  );
};

export default Filter;
