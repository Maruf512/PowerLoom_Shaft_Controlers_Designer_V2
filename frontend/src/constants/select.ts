import {
  SelectColorFieldType,
  SelectMachineTypeFieldsType,
  SelectStartingPositionFieldsType,
} from "@/types/data";

export const colorBoxFields: SelectColorFieldType[] = [
  {
    label: "Box 1", // display text for color box select
    key: "color_box_1", // key for color box vlyes in the designer data
  },
  {
    label: "Box 2",
    key: "color_box_2",
  },
  {
    label: "Box 3",
    key: "color_box_3",
  },
  {
    label: "Box 4",
    key: "color_box_4",
  },
];

export const startingPositionField: SelectStartingPositionFieldsType[] = [
  {
    label: "Color Box 1",
    value: "1",
  },
  {
    label: "Color Box 2",
    value: "2",
  },
  {
    label: "Color Box 3",
    value: "3",
  },
  {
    label: "Color Box 4",
    value: "4",
  },
];

export const machineTypeFields: SelectMachineTypeFieldsType[] = [
  {
    label: "Left Handed",
    value: "left_handed",
  },
  {
    label: "Right Handed",
    value: "right_handed",
  },
];
