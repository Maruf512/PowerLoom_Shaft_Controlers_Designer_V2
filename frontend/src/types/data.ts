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
