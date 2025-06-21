export interface DesignDataType {
  id: number;
  name: string;
  total_color_palettes: number;
  machine_type: string;
  date: string;
}

export type TableType = "design" | "color" | "";

export interface DataTableColumnType<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => string;
  className?: string;
}

export type ColorFieldKeyType =
  | "color_box_1"
  | "color_box_2"
  | "color_box_3"
  | "color_box_4";

export type MachineTypeKeyType = "machine_type";

export type StartingPositionKeyType = "starting_position";

export type selectFieldsKeyType =
  | ColorFieldKeyType
  | MachineTypeKeyType
  | StartingPositionKeyType;

export interface SelectColorFieldType {
  label?: string;
  key: ColorFieldKeyType;
}

export type SelectMachineTypeFieldsType = {
  label: string;
  value: string;
};

export type SelectStartingPositionFieldsType = {
  label: string;
  value: "1" | "2" | "3" | "4";
};

export interface DesignGridType {
  color_box: number | null;
  total_pics: number | null;
}

export interface DesignType {
  name: string;
  total_color_palettes: number | null;
  color_box_1: string;
  color_box_2: string;
  color_box_3: string;
  color_box_4: string;
  starting_position: string;
  machine_type: string;
  design_grids: DesignGridType[];
}

export interface DesignErrorType {
  name: string;
  total_color_palettes: string;
  color_box_1: string;
  color_box_2: string;
  color_box_3: string;
  color_box_4: string;
  starting_position: string;
  machine_type: string;
  design_grids: Array<Record<keyof DesignGridType, string>>;
}
