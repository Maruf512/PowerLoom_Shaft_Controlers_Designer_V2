import React from "react";
import { DataTableColumnType, selectFieldsKeyType, TableType } from "./data";

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

export interface SelectContextType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fieldContext?: selectFieldsKeyType;
  selectedValue: string | React.ReactNode;
  handelSelect: (
    value: string,
    key: selectFieldsKeyType,
    jsxValue?: React.ReactNode
  ) => void;
}
