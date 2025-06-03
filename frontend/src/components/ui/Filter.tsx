import { FilterPropsType } from "@/types/props";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { cn } from "@/utils/cn";
import { BiSearch } from "react-icons/bi";

const Filter = ({
  search,
  setSearch,
  setDisplay,
  display,
}: FilterPropsType) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue(search);
  }, [search]);

  return (
    <div className="border rounded-radius-lg border-muted flex flex-col lg:flex-row items-center gap-4 justify-between lg:items-center lg:px-10 px-3 py-4 bg-on-surface ">
      <div className="bg-surface pl-5 h-[2.5rem] rounded-full flex justify-between items-center w-full lg:w-fit border border-muted border-r-0 ">
        <input
          className="outline-none text-basec h-full pr-4"
          type="text"
          value={searchValue}
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button
          className="border-none hover:bg-primary border duration-200 rounded-r-full "
          onClick={() => setSearch(searchValue)}
        >
          <BiSearch />
        </Button>
      </div>
      <div className="space-x-4 space-y-3 lg:space-y-0 w-full lg:w-fit">
        <Button
          variant={"outline"}
          className={cn("px-7 w-full lg:w-fit text-strong", {
            "bg-primary text-on-surface hover:bg-primary": display === "design",
          })}
          onClick={() => {
            setDisplay("design");
          }}
        >
          Design
        </Button>
        <Button
          variant={"outline"}
          className={cn("px-7 w-full lg:w-fit text-strong", {
            "bg-primary text-on-surface hover:bg-primary": display === "color",
          })}
          onClick={() => {
            setDisplay("color");
          }}
        >
          Color
        </Button>
      </div>
    </div>
  );
};

export default Filter;
