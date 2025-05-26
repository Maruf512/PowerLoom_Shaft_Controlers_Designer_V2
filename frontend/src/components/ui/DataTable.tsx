import { DesignDataType } from "@/types/data";
import { cn } from "@/utils/cn";
import React from "react";

const DataTable = ({ tableData }: { tableData: DesignDataType[] }) => {
  const tableHeader: string[] = tableData[0] ? Object.keys(tableData[0]) : [];

  const formatedTableHeader = tableHeader.map((item) => {
    const key = item.replaceAll("_", " ").trim();
    return key;
  });

  return (
    <div className="overflow-x-auto ">
      <div className="md:w-full w-[40rem] bg-on-surface rounded-radius-sm ">
        <div className="flex justify-between capitalize gap-3 tracking-wide text-surface bg-primary px-4 py-2 rounded-t-radius-sm">
          {formatedTableHeader.map((item) => {
            return (
              <p
                className={cn("line-clamp-1 border-r border-secondary", {
                  "w-[4.5rem]": item === "id",
                  "flex-1": item !== "id",
                  "border-none":
                    formatedTableHeader.indexOf(item) ===
                    formatedTableHeader.length - 1,
                })}
              >
                {item}
              </p>
            );
          })}
        </div>
        <div className="lg:text-base text-sm px-4 rounded-b-radius-sm text-strong border-2 border-muted/10 border-t-0 h-[20rem]">
          {tableData.map((item) => {
            return (
              <div
                className={cn(
                  "flex justify-between gap-3 border-b border-muted/10 py-2",
                  {
                    "border-none":
                      tableData.indexOf(item) === tableData.length - 1,
                  }
                )}
              >
                {Object.values(item).map((value, i) => {
                  return (
                    <p
                      className={cn("line-clamp-1 border-r border-surface", {
                        "w-[4.5rem]": formatedTableHeader[i] === "id",
                        "flex-1": formatedTableHeader[i] !== "id",
                        "border-none": Object.values(item).length - 1 === i,
                      })}
                    >
                      {value}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
