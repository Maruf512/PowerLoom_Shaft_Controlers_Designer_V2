import React from "react";

export interface FilterPropsType {
  search: string;
  color: string;
  design: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  setDesign: React.Dispatch<React.SetStateAction<string>>;
}
