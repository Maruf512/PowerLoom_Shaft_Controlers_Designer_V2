import React from "react";
import { DataTableColumnType, TableType } from "./data";

export interface FilterPropsType {
  search: string;
  display: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setDisplay: React.Dispatch<React.SetStateAction<TableType>>;
}

export interface DataTablePropsType<T> {
  data: T[];
  columns: DataTableColumnType<T>[];
  className?: string;
  emptyMessage?: string;
}
