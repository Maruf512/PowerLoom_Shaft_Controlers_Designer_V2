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

export interface DesignGridType {
  color_box: number | null;
  total_pics: number;
}

export interface DesignType {
  name: string;
  total_color_palettes: number;
  color_box_1: string;
  color_box_2: string;
  color_box_3: string;
  color_box_4: string;
  starting_position: string;
  machine_type: string;
  design_grids: DesignGridType[];
}
