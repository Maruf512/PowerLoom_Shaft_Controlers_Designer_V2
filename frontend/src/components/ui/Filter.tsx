import { FilterPropsType } from "@/types/props";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { cn } from "@/utils/cn";
import { BiSearch } from "react-icons/bi";

const Filter = ({
  search,
  setSearch,
  setColor,
  setDesign,
  color,
  design,
}: FilterPropsType) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <div className="border-y-2 border-muted/10 flex flex-col lg:flex-row items-center gap-4 justify-between lg:items-center lg:px-10 px-3 py-4 bg-on-surface rounded-radius-sm">
      <div className="bg-surface pl-5 rounded-full flex justify-between items-center w-full lg:w-fit">
        <input
          className="outline-none text-basec"
          type="text"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          variant="outline"
          className="border-none hover:bg-primary hover:text-on-surface duration-200 rounded-r-full pr-5 "
          onClick={() => setSearch(searchValue)}
        >
          <BiSearch />
        </Button>
      </div>
      <div className="space-x-4 space-y-3 lg:space-y-0 w-full lg:w-fit">
        <Button
          variant={"outline"}
          className={cn(
            "px-7 w-full lg:w-fit hover:bg-primary hover:text-surface",
            {
              "bg-secondary text-on-surface": design,
            }
          )}
          onClick={() => {
            setDesign("design");
            setColor("");
          }}
        >
          Design
        </Button>
        <Button
          variant={"outline"}
          className={cn(
            "px-7 w-full lg:w-fit hover:bg-primary hover:text-surface",
            {
              "bg-secondary text-on-surface": color,
            }
          )}
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
