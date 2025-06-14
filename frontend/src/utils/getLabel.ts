import {
  SelectMachineTypeFieldsType,
  SelectStartingPositionFieldsType,
} from "@/types/data";

export const getLabel = <
  T extends SelectMachineTypeFieldsType | SelectStartingPositionFieldsType
>(
  savedValue: string,
  constant: T[]
) => {
  const label = constant.find((item) => item.value === savedValue)?.label;

  return label;
};
