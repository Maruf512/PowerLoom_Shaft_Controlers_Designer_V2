import { DataTablePropsType } from "@/types/props";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { JSX } from "react";

const DataTable = <T,>({
  data,
  columns,
  className,
  emptyMessage = "No Data Found",
}: DataTablePropsType<T>) => {
  return (
    <div className="overflow-x-auto">
      <div className="md:w-full w-[40rem] bg-on-surface rounded-radius-lgs">
        <div className="flex justify-between capitalize gap-3 tracking-wide text-surface bg-primary px-4 py-4 rounded-t-radius-sm">
          {columns.map((item, i) => {
            return (
              <p
                className={cn(
                  "line-clamp-1 border-r border-secondary",
                  {
                    "border-none": i === columns.length - 1,
                  },
                  item.className ? item.className : "flex-1"
                )}
              >
                {item.header}
              </p>
            );
          })}
        </div>
        <div className="lg:text-base text-sm  rounded-b-radius-lg text-strong border-2 border-muted/10 border-t-0 h-[20rem] overflow-y-auto">
          {data.length === 0 ? (
            <div className="text-center py-4 text-strong">{emptyMessage}</div>
          ) : (
            <>
              {data.map((item, i) => {
                return (
                  <Link
                    href={"/"}
                    key={i}
                    className={cn(
                      "flex justify-between gap-3 border-b border-muted/10 py-2 px-4 hover:bg-secondary duration-50 hover:text-surface cursor-pointer",
                      {
                        "border-none": i === data.length - 1,
                      },
                      i % 2 !== 0 ? "bg-surface" : "bg-on-surface"
                    )}
                  >
                    {columns.map((column, colIndex) => {
                      const cellContent = column.render
                        ? column.render(item)
                        : (item[column.key] as React.ReactNode);

                      return (
                        <p
                          key={column.key as string}
                          className={cn(
                            "line-clamp-1 border-r border-surface",
                            {
                              "border-none": colIndex === columns.length - 1,
                            },
                            column.className ? column.className : "flex-1"
                          )}
                        >
                          {cellContent}
                        </p>
                      );
                    })}
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
